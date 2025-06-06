const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const { crx } = require('@crxjs/vite-plugin');
const manifest = require('./manifest.config.js');
const { resolve } = require('path');

module.exports = defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        options: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: 3000
  },
  define: {
    'process.env.APP_TITLE': JSON.stringify('Generate Tickets')
  }
});
