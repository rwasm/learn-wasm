import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteRsw } from 'vite-plugin-rsw';

export default defineConfig({
  plugins: [
    ViteRsw(),
    react(),
  ],
})
