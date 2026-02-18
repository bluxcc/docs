import { type Config, defineConfig } from 'waku/config';
import mdx from 'fumadocs-mdx/vite';
import * as MdxConfig from './source.config.js';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { UserConfig } from 'vite';

export default defineConfig({
  vite: {
     server: {
      host: "127.0.0.1",
      port: 3000,
    },
    optimizeDeps: {
     exclude: ['fumadocs-ui', 'fumadocs-core'],
      include: [
        'debug',
        'extend',
        'style-to-js',
        'fumadocs-ui > debug',
        'fumadocs-core > debug',
        'fumadocs-ui > extend',
        'fumadocs-core > extend',
        'fumadocs-ui > style-to-js',
        'fumadocs-core > style-to-js',
      ],
    },

    plugins: [tailwindcss(), mdx(MdxConfig), tsconfigPaths()],
  } satisfies UserConfig as Config['vite'],
});