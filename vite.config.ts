import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // Nisbiy yo'llar: sayt ildizda ham, ichki papkada ham ishlaydi.
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // Ro'yxatdan o'tkazishni o'zimiz boshqaramiz (claude.ai ichida o'tkazmaymiz).
      injectRegister: null,
      includeAssets: ["icon.svg", "fonts/*.woff2"],
      manifest: {
        name: "Moskva Cho'ntak Tarjimon",
        short_name: "Tarjimon",
        description: "O'zbekchadan ruschaga: ruscha javob va tagida o'zbekcha ma'nosi.",
        lang: "uz",
        start_url: "./",
        scope: "./",
        display: "standalone",
        orientation: "portrait",
        background_color: "#090E1A",
        theme_color: "#090E1A",
        icons: [
          { src: "icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
          { src: "icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
        ],
      },
      workbox: {
        // Shriftlar ham keshga tushadi — internetsiz ko'rinish buzilmaydi.
        globPatterns: ["**/*.{js,css,html,svg,woff2,webmanifest}"],
        navigateFallback: "index.html",
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: {
    target: "es2020",
    cssTarget: "chrome90",
  },
});
