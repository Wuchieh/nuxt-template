import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import transformerDirectives from '@unocss/transformer-directives';
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetWind3,
} from 'unocss';
// import transformerCompileClass from '@unocss/transformer-compile-class'; // class 群組化
import { presetVuetify } from 'unocss-preset-vuetify';

export default defineConfig({
    content: { filesystem: ['**/*.{html,js,ts,jsx,tsx,vue}'] },
    outputToCssLayers: { cssLayerName: (layer) => layer === 'properties' ? null : `uno-${layer}` },
    presets: [
        presetVuetify({
            elevation: 'md2',
            font: {
                body: 'Roboto, sans-serif',
                heading: 'Roboto, sans-serif',
                mono: '"Roboto Mono", sans-serif',
            },
            typography: 'md2',
        }),
        presetWind3(),
        presetAttributify(),
        presetIcons({
            cdn: 'https://esm.sh/',
            collections: {
                icon: FileSystemIconLoader(
                    './app/assets/icon',
                ),
            },
        }),
    ],
    safelist: [
        'font-heading',
        'font-body',
        'font-mono',
        ...Array.from({ length: 25 }, (_, i) => `elevation-${i}`),
        ...[
            '',
            '-0',
            '-sm',
            '-lg',
            '-xl',
            '-pill',
            '-circle',
            '-shaped',
        ].map((suffix) => `rounded${suffix}`),
    ],
    transformers: [
        transformerDirectives(),
        // transformerCompileClass(),
    ],
});
