import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        accent: colors.green[400],
        "accent-secondary": colors.green[600],
        "on-accent": colors.white,
        /* shadcn */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        "file-book-appear":
          "file-book-appear 0.5s ease-out var(--animation-delay) forwards",
        "files-icon-appear":
          "files-icon-appear 0.5s ease-out var(--animation-delay) forwards",
        star: "star 0.5s ease-out var(--animation-delay) infinite alternate",
        gradient: "gradient 2s ease-in-out infinite",
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
        star: {
          "0%": {
            opacity: "0",
            transform:
              "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(0%) scaleY(0%)",
          },
          "100%": {
            opacity: "1",
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        gradient: {
          "0%, 100%": {
            backgroundPosition: "0% 0%",
          },
          "50%": {
            backgroundPosition: "100% 100%",
          },
        },
      },
      plugins: [require("tailwindcss-animate")],
    },
  },
} satisfies Config;

export default config;
