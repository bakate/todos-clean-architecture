/// <reference types="vitest" />

import { resolve } from "path";
import env from "vite-plugin-env-compatible";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [env()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    globals: true,
    coverage: {
      provider: "istanbul",
      reportsDirectory: "./tests/coverage",
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
});
