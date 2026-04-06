import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';

export default defineVuetifyConfiguration({
    // your Vuetify options here
    theme: {
        // default 'system' requires `ssr: false` to avoid hydration warnings
        defaultTheme: 'dark',

        themes: {
            dark: {},
            light: {},
        },
    },
});
