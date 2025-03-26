import { heroui } from "@heroui/react";
import { join } from "path";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(
      __dirname,
      "{src,app,components,screens,providers}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        poppins: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui(
      {
        prefix: "heroui", // prefix for themes variables
        addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
        defaultTheme: "dark", // default theme from the themes object
        defaultExtendTheme: "dark", // default theme to extend on custom themes
        layout: {}, // common layout tokens (applied to all themes)
        themes: {
          light: {
            layout: {}, // light theme layout tokens
            colors: {}, // light theme colors
          },
          dark: {
            layout: {}, // dark theme layout tokens
            colors: {}, // dark theme colors
          },
          // ... custom themes
        },
      }
    ),
  ]
}

