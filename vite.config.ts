import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import ViteRsw from 'vite-plugin-rsw';
import path from 'path';

// global is not defined
// Node stream polyfill not working: https://github.com/vitejs/vite/issues/1915

export default defineConfig({
  plugins: [
    reactRefresh(),
    ViteRsw({
      mode: 'release',
      crates: [
        '@rsw/chasm',
      ]
    }),
  ],
})
