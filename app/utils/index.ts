export * from './vue';

export function cloneDeep<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}

export function createObjectURL(file?: Blob | MediaSource) {
    return file ? URL.createObjectURL(file) : void 0;
}

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
