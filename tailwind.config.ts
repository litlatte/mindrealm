import type { Config } from "tailwindcss";
// imports the colors from tailwind
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: colors.green[400],
        "accent-secondary": colors.green[600],
        "on-accent": colors.white,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    animation: {
      "file-book-appear":
        "file-book-appear 0.5s ease-out var(--animation-delay) forwards",
      "files-icon-appear": "files-icon-appear 0.5s ease-out var(--animation-delay) forwards",
    },
    keyframes: {
      "file-book-appear": {
        "0%": {
          opacity: "0",
          transform:
            "translateY(100%) translateX(-100%) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(40%) scaleY(40%)",
        },
        "100%": {
          opacity: "0.2",
          transform:
            "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
          //-translate-x-1/3 translate-y-1/3
        },
      },
      "files-icon-appear": {
        "0%": {
          opacity: "0",
          transform:
            "translate(calc(var(--tw-translate-x) / 2), calc(var(--tw-translate-y) / 2)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(0%) scaleY(0%)",
        },
        "100%": {
          opacity: "0.8",
          transform:
            "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
          //-translate-x-1/3 translate-y-1/3
        },
      },
    },
  },
  plugins: [],
};
export default config;
