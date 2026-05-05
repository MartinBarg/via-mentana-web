import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["apps/web/**/*.{ts,tsx}"],
      exclude: ["apps/web/**/*.test.{ts,tsx}", "apps/web/app/**", "apps/web/next.config.ts"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "apps/web"),
      "server-only": path.resolve(__dirname, "test/__mocks__/server-only.ts"),
      "next/navigation": path.resolve(__dirname, "test/__mocks__/next-navigation.ts"),
      "next/image": path.resolve(__dirname, "test/__mocks__/next-image.tsx"),
    },
  },
});
