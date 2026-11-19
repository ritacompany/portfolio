import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  build: { assetsDir: "_app" },
  server: { host: "127.0.0.1", port: 5190 },
  preview: { host: "127.0.0.1", port: 5191 },
});
