import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "docs-bg": {
          light: "#ffffff",
          dark: "#050505",
        },
        "docs-sidebar": {
          light: "#fafaf9",
          dark: "#050505",
        },
        "docs-card": {
          light: "#ffffff",
          dark: "#0a0a0a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
