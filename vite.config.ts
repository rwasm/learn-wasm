import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';
import ViteRsw from 'vite-plugin-rsw';

export default defineConfig({
  plugins: [
    react(),
    ViteRsw(),
  ],
})
