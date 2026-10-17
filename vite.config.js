import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: "frontend",
  server: {
    proxy: {
      "/dapi": {
        target: "https://www.swiggy.com",
        changeOrigin: true,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          Referer: "https://www.swiggy.com/",
        },
      },
      "/mapi": {
        target: "https://www.swiggy.com",
        changeOrigin: true,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
          Accept: "application/json, text/plain, */*",
          Referer: "https://www.swiggy.com/",
        },
      },
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});

