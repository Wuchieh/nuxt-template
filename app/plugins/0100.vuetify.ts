export default defineNuxtPlugin((nuxtApp) => {
    // check https://vuetify-nuxt-module.netlify.app/guide/nuxt-runtime-hooks.html
    nuxtApp.hook('vuetify:before-create', (options) => {
        if (import.meta.client) {
            // eslint-disable-next-line no-console
            console.log('vuetify:before-create', options);
        }
    });
});
