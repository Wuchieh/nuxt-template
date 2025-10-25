// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-10-25',

    devtools: { enabled: false },

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
        'nitro-cloudflare-dev',
        '@nuxtjs/i18n',
        '@unocss/nuxt',
        '@pinia/nuxt',
    ],

    nitro: {
        cloudflare: {
            deployConfig: true,
            nodeCompat: true,
        },

        preset: 'cloudflare-pages',
    },

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
});
