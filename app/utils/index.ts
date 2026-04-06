export * from './vue';

function createObjectURL(file?: Blob | MediaSource) {
    return file ? URL.createObjectURL(file) : void 0;
}

export { createObjectURL };
