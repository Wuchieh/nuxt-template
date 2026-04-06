export * from './vue';

function createObjectURL(file?: Blob | MediaSource) {
    return file ? URL.createObjectURL(file) : void 0;
}

function sleep(ms: number) {
    return new Promise((resolve) => void setTimeout(resolve, ms));
}

export {
    createObjectURL,
    sleep,
};
