import path from "path";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackStart(), nitro(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
    tsconfigPaths: true,
  },
});
