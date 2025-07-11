import { defineConfig } from 'vite'
import solid from "vite-plugin-solid"

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [solid(), cloudflare()],
})