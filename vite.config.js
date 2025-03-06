import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    injectRegister: 'auto',
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
    pwaAssets: {
      disabled: false,
      config: true,
    },
    includeAssets: ["ADDHEREFAVICON", "ADDHEREFONTS"],
    manifest: {
      "short_name": "Galerio",
      "name": "Galer.io",
      "icons": [
        {
          "src": "/ADDHERE",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/ADDHERE",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "start_url": ".",
      "display": "standalone",
      "theme_color": "#000000",
      "background_color": "#ffffff"
    },
    workbox: {
      sourcemap: true,
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    }
  })],
})
