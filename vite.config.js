import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'To-Do App',
        short_name: 'Todo',
        start_url: '/',
        display: 'standalone',
        background_color: '#1976d2',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg}'], // 缓存所有静态资源
      },
    }),
  ],
});