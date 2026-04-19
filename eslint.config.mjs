import { antfu } from '@antfu/eslint-config';
import { createBaseConfigs } from '@kikiutils/eslint-config/base';
import { createStyleFilesConfigs } from '@kikiutils/eslint-config/style';
import { createVueConfig } from '@kikiutils/eslint-config/vue';

export default antfu(
    {
        formatters: { css: true },
        ignores: ['app/composables/swag/**/*'],
        typescript: true,
        vue: true,
        vuetify: { ts: true },
    },
    createBaseConfigs(),
    createStyleFilesConfigs(),
    createVueConfig(),
);
