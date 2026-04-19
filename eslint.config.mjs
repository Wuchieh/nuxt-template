import { antfu } from '@antfu/eslint-config';
import { createBaseConfigs } from '@kikiutils/eslint-config/base';
import { createStyleFilesConfigs } from '@kikiutils/eslint-config/style';
import { createVueConfig } from '@kikiutils/eslint-config/vue';

// export default createConfig('node', { ignores: ['app/composables/swag/**/*'] });

export default antfu(
    {
        formatters: { css: true },
        typescript: true,
        vue: true,
        ignores: ['app/composables/swag/**/*']
    },
    createBaseConfigs(),
    createStyleFilesConfigs(),
    createVueConfig(),
);