import { cloneDeep } from 'es-toolkit';
import type { Directive } from 'vue';

function debounceRef<T = any>(value: T, duration: number = 500) {
    return customRef<T>((track, trigger) => {
        let timeout: any;
        return {
            get() {
                track();
                return value;
            },
            set(newValue) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, duration);
            },
        };
    });
}

const createdLocalStorage = new Map<string, Ref>();

function useLocalStorageRef<T extends string>(
    key: string,
    fallback?: T,
): Ref<T> {
    if (createdLocalStorage.has(key)) {
        return createdLocalStorage.get(key) as Ref<T>;
    }

    const result = customRef<T>((track, trigger) => ({
        get() {
            track();
            const value = localStorage.getItem(key);
            return (value ?? fallback) as T;
        },
        set(value) {
            if (value) {
                localStorage.setItem(key, value);
            } else {
                localStorage.removeItem(key);
            }
            trigger();
        },
    }));

    createdLocalStorage.set(key, result);
    return result;
}

/**
 * 創建一個長按事件處理器
 * @function useLongTouch
 * @param {(e: MouseEvent) => void} callback - 當長按事件觸發時執行的回調函數
 * @param {number} [touchDuration] - 觸發長按事件所需的持續時間（毫秒），默認為 300ms
 * @returns {object} 返回包含事件處理方法的對象
 * @property {Function} onPointerdown - 指針按下事件處理器，用於開始計時
 * @property {Function} onPointerup - 指針抬起事件處理器，用於取消計時
 * @example
 * const longTouch = useLongTouch((e) => {
 *   console.log('長按事件觸發', e);
 * }, 500);
 *
 * // 在元素上使用
 * <div v-bind="longTouch">
 *   長按我
 * </div>
 */
function useLongTouch(callback: (e: MouseEvent) => void, touchDuration: number = 300) {
    let timeout: NodeJS.Timeout | number;
    return {
        onPointerdown(e: MouseEvent) {
            timeout = setTimeout(() => callback(e), touchDuration);
        },
        onPointerout() {
            clearTimeout(timeout);
        },
        onPointerup() {
            clearTimeout(timeout);
        },
    };
}

/**
 * @example
 * const [num,resetNum] = useResetRef(0)
 * console.log(num.value) // 0
 * num.value += 10
 * console.log(num.value) // 10
 * resetNum()
 * console.log(num.value) // 0
 */
function useResetRef<T = any>(value: T) {
    const valueRef = ref(cloneDeep(value));
    const resetRef = () => {
        valueRef.value = cloneDeep(value);
    };
    return [
        valueRef,
        resetRef,
    ] as const;
}

function vLongTouch(touchDuration: number = 300): Directive {
    const vLongTouchMap = new WeakMap();

    return {
        mounted(el: HTMLElement, { value }: { value: (e: MouseEvent, ...args: any[]) => void }) {
            const base = useLongTouch(value, touchDuration);
            vLongTouchMap.set(el, base);
            el.addEventListener('pointerdown', base.onPointerdown);
            el.addEventListener('pointerout', base.onPointerout);
            el.addEventListener('pointerup', base.onPointerup);
        },
        unmounted(el: HTMLElement) {
            const base = vLongTouchMap.get(el);
            el.removeEventListener('pointerdown', base.onPointerdown);
            el.removeEventListener('pointerout', base.onPointerout);
            el.removeEventListener('pointerup', base.onPointerup);
            vLongTouchMap.delete(el);
        },
    };
}

export {
    debounceRef,
    useLocalStorageRef,
    useLongTouch,
    useResetRef,
    vLongTouch,
};
