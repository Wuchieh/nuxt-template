import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
// import transformerCompileClass from '@unocss/transformer-compile-class'; // class 群組化
import transformerDirectives from '@unocss/transformer-directives';
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetWind3,
} from 'unocss';

export default defineConfig({
    content: { filesystem: ['**/*.{html,js,ts,jsx,tsx,vue}'] },
    presets: [
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
    transformers: [
        transformerDirectives(),
        // transformerCompileClass(),
    ],
});
