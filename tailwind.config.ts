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
        petrol: {
          DEFAULT: "#0C1F1C",
          deep: "#071412",
          mist: "#14302B",
          line: "#1E433C",
        },
        gold: {
          DEFAULT: "#C6A15B",
          bright: "#E0C27A",
          dim: "#8F7340",
        },
        bone: {
          DEFAULT: "#F3EEE4",
          dim: "#D8D0C2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.28em",
      },
      backgroundImage: {
        "veil-video":
          "linear-gradient(180deg, rgba(12,31,28,0.62) 0%, rgba(12,31,28,0.22) 36%, rgba(12,31,28,0.28) 62%, rgba(12,31,28,0.78) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
