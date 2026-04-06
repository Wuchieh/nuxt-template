import { MD5 } from 'crypto-es';

import type { withResolversPromise } from '#shared/utils/index';

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
