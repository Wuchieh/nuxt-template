/* eslint-disable max-classes-per-file */

import { MD5 } from 'crypto-es';

export interface withResolversPromise<T> {
    promise: Promise<T>;
    reject: (reason?: any) => void;
    resolve: (value: PromiseLike<T> | T) => void;
}

export const sleep = (ms: number) => new Promise((resolve) => void setTimeout(resolve, ms));

type Listener<T> = (data: T) => void;

export class EventCenter<E extends Record<string, any>> {
    private listeners: {
        [K in keyof E]?: Set<Listener<E[K]>>
    } = {};

    /** 註冊監聽 */
    on<K extends keyof E>(key: K, listener: Listener<E[K]>) {
        if (!this.listeners[key]) {
            this.listeners[key] = new Set();
        }
        this.listeners[key]!.add(listener);
    }

    /** 移除監聽 */
    off<K extends keyof E>(key: K, listener: Listener<E[K]>) {
        this.listeners[key]?.delete(listener);
    }

    /** 觸發事件 */
    emit<K extends keyof E>(key: K, data: E[K]) {
        this.listeners[key]?.forEach((listener) => listener(data));
    }

    /** 清空某個事件 */
    clear<K extends keyof E>(key: K) {
        this.listeners[key]?.clear();
    }

    /** 清空所有事件 */
    clearAll() {
        (Object.keys(this.listeners) as (keyof E)[]).forEach((k) =>
            this.listeners[k]?.clear(),
        );
    }
}

export class TaskQueue {
    #qps: number;
    #queue: Array<() => Promise<void> | void>;
    #activeCount: number;
    #running: boolean;
    #stopped: boolean;

    constructor(qps = 4) {
        this.#qps = qps;
        this.#queue = [];
        this.#activeCount = 0;
        this.#running = false;
        this.#stopped = false;
    }

    // 新增任務
    add(task: () => Promise<void> | void) {
        this.#queue.push(task);
    }

    // 設置併發數
    setQps(qps: number) {
        this.#qps = qps;
    }

    // 停止任務執行（不會中斷正在執行的任務，但不再啟動新任務）
    stop() {
        this.#stopped = true;
    }

    // 開始執行任務佇列
    async do() {
        if (this.#running) return;
        this.#running = true;
        this.#stopped = false;

        const next = async () => {
            if (this.#stopped || this.#queue.length === 0) return;

            // 若達上限，等有空位再繼續
            if (this.#activeCount >= this.#qps) return;

            const task = this.#queue.shift();
            if (!task) return;

            this.#activeCount++;
            try {
                await task();
            } catch (err) {
                console.error('Task error:', err);
            } finally {
                this.#activeCount--;
                if (!this.#stopped) {
                    await next(); // 嘗試啟動下一個任務
                }
            }
        };

        // 初始啟動 qps 個任務
        const starters = [];
        for (let i = 0; i < this.#qps; i++) {
            starters.push(next());
        }

        // 等待所有任務完成（或被停止）
        await Promise.all(starters);

        this.#running = false;
    }
}

export function debounceFunc<T extends unknown[]>(
    func: (...args: T) => void,
    duration: number = 500,
): (...args: T) => void {
    let timeout: NodeJS.Timeout;

    return (...args: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, duration);
    };
}

export function debouncePromise<T extends (...args: any[]) => Promise<any>>(apiCall: T) {
    const running = new Map<string, withResolversPromise<ReturnType<T>>>();

    return (...args: Parameters<T>): ReturnType<T> => {
        return new Promise((resolve, reject) => {
            const key = MD5(JSON.stringify(args)).toString();

            if (running.has(key)) {
                running.get(key)!.promise.then(resolve).catch(reject);
            } else {
                const promiseWrapper = useWithResolvers<ReturnType<T>>();

                running.set(key, promiseWrapper);

                apiCall(...args)
                    .then((result) => {
                        running.delete(key);
                        promiseWrapper.resolve(result as ReturnType<T>);
                        resolve(result);
                    })
                    .catch((error) => {
                        running.delete(key);
                        promiseWrapper.reject(error);
                        reject(error);
                    });
            }
        }) as ReturnType<T>;
    };
}

export function syncOnce(fn: () => void): () => void {
    let called = false;
    return () => {
        if (!called) {
            called = true;
            fn();
        }
    };
}

export function useWithResolvers<T>(): withResolversPromise<T> {
    if (Promise.withResolvers) {
        return Promise.withResolvers<T>();
    } else {
        let reject = null! as (reason?: any) => void;
        let resolve = null! as (value: PromiseLike<T> | T) => void;
        const promise = new Promise<T>((res, rej) => {
            reject = rej;
            resolve = res;
        });
        return {
            promise,
            reject,
            resolve,
        };
    }
}
