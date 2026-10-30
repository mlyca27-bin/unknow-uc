import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'

export default defineConfig({
  base: "/unknow-uc/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve("."),
    },
  },
  server: {
    port: 3000,
  },
})
