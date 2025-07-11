import { defineConfig } from 'vite'
import solid from "vite-plugin-solid"

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [solid(), cloudflare()],
  server: {
    port: 5173,
    hmr: {
      port: 5170,
      clientPort: 5170,
    }
  }
})