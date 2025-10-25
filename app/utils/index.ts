export * from './vue';

export function debounceRef<T = any>(value: T, duration: number = 500) {
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
