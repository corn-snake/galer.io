import { defineConfig } from 'npm:vite'
import vue from 'npm:@vitejs/plugin-vue'
import { VitePWA } from 'npm:vite-plugin-pwa';
import file from "./manifest.json" with { type: "json" };

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
    manifest: file,
    workbox: {
      sourcemap: true,
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    }
  })],
})
