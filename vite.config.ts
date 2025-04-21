import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reportsDirectory: './src/tests/coverage',
    },
    exclude: [
      '**/{e2e,playwright}/**', // Todas estas carpetas
      '**/*.{test,spec}.{js,ts}', // Patrón de nombres
      '**/playwright.config.{js,ts}',
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
}));
