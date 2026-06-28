import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import transformerDirectives from '@unocss/transformer-directives';
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetWind4,
} from 'unocss';
// import transformerCompileClass from '@unocss/transformer-compile-class'; // class 群組化
import { presetVuetify } from 'unocss-preset-vuetify';

const breakpoint = Object.fromEntries([
    {
        alias: 'sm',
        point: 600,
    },
    {
        alias: 'md',
        point: 840,
    },
    {
        alias: 'lg',
        point: 1145,
    },
    {
        alias: 'xl',
        point: 1545,
    },
    {
        alias: 'xxl',
        point: 2138,
    },
].map(({ alias, point }) => [
    alias,
    `${point}px`,
]));

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
        presetWind4(),
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
    rules: [
        [
            /^fs-(\d+px)$/,
            ([, value]) => ({ 'font-size': value }),
        ],
        [
            /^fs-((?:\d+(?:\.\d+)?|\.\d+)rem)$/,
            ([, value]) => ({ 'font-size': value }),
        ],
        [
            /^square-((?:\d+(?:\.\d+)?|\.\d+)(rem|px))$/,
            ([, value]) => ({
                height: value,
                width: value,
            }),
        ],
        [
            /^size-((?:\d+(?:\.\d+)?|\.\d+)(rem|px))$/,
            ([, value]) => ({
                'height': value,
                'min-height': value,
                'min-width': value,
                'width': value,
            }),
        ],
        [
            /^clamped-text-(\d)$/,
            ([_, value]) => ({
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': value,
                'display': '-webkit-box',
                'overflow': 'hidden',
                'text-overflow': 'ellipsis',
            }),
        ],
    ],
    theme: { breakpoint },
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
