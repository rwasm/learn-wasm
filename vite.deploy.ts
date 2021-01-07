import * as reactPlugin from 'vite-plugin-react';
import type { UserConfig } from 'vite';
import path from 'path';

const config: UserConfig = {
  jsx: 'react',
  minify: 'esbuild',
  plugins: [
    reactPlugin,
  ],
  // see: https://github.com/vitejs/vite/blob/master/src/node/config.ts
  // the key must start and end with a slash
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
    '/hooks/': path.resolve(__dirname, 'src/hooks'),
    'rust_crate': path.resolve(__dirname, 'rust-crate/pkg/rust_crate.js'),
  },
};

export default config;