import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "slate-gray": "#1a1c1f",
        "matte-black": "#0C0C0F",
        "predicate-gold": "#DAAD89",
        "predicate-green": "#A7F3D0",
      },
    },
  },
  plugins: [],
};
export default config;
