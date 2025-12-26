import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  root: 'src/frontend',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist/frontend'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,

    // ⚠️ HTTPS IS REQUIRED FOR SPEECHIFY TEXT HIGHLIGHTING - DO NOT REMOVE! ⚠️
    // The Speechify Chrome extension requires HTTPS to enable text highlighting
    // and synchronized reading features. Without HTTPS, Speechify will play audio
    // but won't highlight the text being read.
    //
    // Self-signed certificates (localhost.crt, localhost.key) are used for local dev.
    // Browser will show security warning - this is expected and safe for localhost.
    https: {
      key: fs.readFileSync(resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(resolve(__dirname, 'localhost.crt')),
    },

    allowedHosts: ['studio', 'localhost'],
    proxy: {
      // Proxy everything to the API server (server-rendered HTML, no SPA)
      '^/(?!@|node_modules|src).*': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
