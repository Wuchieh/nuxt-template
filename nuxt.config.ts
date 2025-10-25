// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: { transpile: ['vuetify'] },

    compatibilityDate: '2025-10-25',

    devtools: { enabled: false },

    // when enabling ssr option you need to disable inlineStyles and maybe devLogs
    features: {
        devLogs: false,
        inlineStyles: false,
    },

    i18n: {
        defaultLocale: 'zh-TW',
        locales: [
            {
                code: 'zh-TW',
                file: 'tw.ts',
                language: 'zh-TW',
                name: '繁體中文',
            },
            {
                code: 'en-US',
                file: 'en.ts',
                language: 'en-US',
                name: 'English',
            },
        ],
        strategy: 'prefix_except_default',
        vueI18n: './i18n.config.ts',
    },

    modules: [
        '@nuxt/fonts',
        'vuetify-nuxt-module',
        '@nuxtjs/i18n',
        '@unocss/nuxt',
        '@pinia/nuxt',
    ],

    pinia: { storesDirs: ['./app/stores/**'] },

    postcss: {
        plugins: {
            'cssnano': {},
            'postcss-nested': {},
            'postcss-pxtorem': {
                exclude: /node_modules/i,
                minPixelValue: 1,
                propList: ['*'],
                // 更正插件名稱
                rootValue: 16,
            },
        },
    },

    unocss: { nuxtLayers: true },

    vite: { ssr: { noExternal: ['vuetify'] } },

    vuetify: {
        moduleOptions: {
            // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
            ssrClientHints: {
                prefersColorScheme: false,
                prefersColorSchemeOptions: { useBrowserThemeOnly: false },
                reloadOnFirstRequest: false,

                viewportSize: true,
            },

            // /* If customizing sass global variables ($utilities, $reset, $color-pack, $body-font-family, etc) */
            // disableVuetifyStyles: true,
            styles: { configFile: 'assets/vuetify/settings.scss' },
        },
    },
});
