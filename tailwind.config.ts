import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#090b12",
        panel: "rgba(23, 29, 45, 0.55)",
        neon: "#5be7ff",
        accent: "#8b5cf6"
      },
      boxShadow: {
        glass: "0 10px 30px rgba(6,11,29,0.35), inset 0 1px 0 rgba(255,255,255,0.05)"
      },
      backgroundImage: {
        "hud-grid":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
