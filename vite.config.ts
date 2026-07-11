import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/,
// so the base path must match the repo name in production. Once you attach
// a custom domain (see README), change BASE below to "/".
const BASE = "/nfc-card/";

export default defineConfig(({ command }) => ({
  base: command === "build" ? BASE : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
