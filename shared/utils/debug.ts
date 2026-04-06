/* eslint-disable no-console */
function Debug(...args: any[]) {
    if (!import.meta.dev) return;
    console.log(...args);
}

export { Debug };
