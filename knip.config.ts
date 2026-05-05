import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignoreBinaries: ["tsc"],
  workspaces: {
    ".": {
      project: ["test/**/*.{ts,tsx}"],
      ignoreDependencies: ["react", "next-intl", "next"],
    },
    "apps/web": {
      ignoreDependencies: ["postcss"],
    },
  },
};

export default config;
