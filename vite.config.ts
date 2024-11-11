import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "fonts/ABeeZee/ABeeZee-Regular.ttf",
        "fonts/ABeeZee/ABeeZee-Italic.ttf",
        "fonts/sofia-pro/Sofia Pro Light Italic Az.otf",
        "fonts/sofia-pro/Sofia Pro Light Az.otf",
        "fonts/sofia-pro/Sofia Pro Bold Az.otf",
        "fonts/Suisse-Intl/fonts/Suisse_Intl_Regular.ttf",
        "fonts/Vt232/VT323-Regular.ttf",
        "fonts/microgemma/Microgramma D Extended Bold.ot",
      ],
      manifest: {
        name: "Degen Chat",
        short_name: "DegenChat",
        description: "Chat app favouring autism",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,ttf,otf,woff,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^\/fonts\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "font-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
