import * as reactPlugin from 'vite-plugin-react';
import type { UserConfig } from 'vite';
const rustPlugin = require('vite-plugin-rust');
import path from 'path';

const RUST_CRATE = {
  rust_crate: './rust-crate',
};

const config: UserConfig = {
  jsx: 'react',
  minify: 'esbuild',
  // write: true,
  plugins: [
    reactPlugin,
    // https://github.com/gliheng/vite-plugin-rust
    // TODO: `vite build` - *.wasm files loss
    // Temporary solutions: scripts/wasm-copy.js
    rustPlugin({
      crates: RUST_CRATE,
    }),
  ],
  // see: https://github.com/vitejs/vite/blob/master/src/node/config.ts
  // the key must start and end with a slash
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
    '/hooks/': path.resolve(__dirname, 'src/hooks'),
  },
};

export default config;