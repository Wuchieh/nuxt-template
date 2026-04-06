/* eslint-disable no-alert */

function DebugAlert(message?: any) {
    if (!import.meta.dev) return;
    alert(message);
}

function DebugServer(...args: any[]) {
    if (!import.meta.dev) return;
    $fetch(
        '/api/debug',
        {
            body: args,
            method: 'POST',
        },
    );
}

export {
    DebugAlert,
    DebugServer,
};
