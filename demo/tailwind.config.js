import tailwindTypography from "@tailwindcss/typography";
import layout from "plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // Default Tailwind breakpoints
      // @see https://tailwindcss.com/docs/screens
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    tailwindTypography(),
    layout({
      containerWidths: {
        // We use DEFAULT to set the default value for all breakpoints
        DEFAULT: "100%",
        sm: "100%",
        md: "100%",
        lg: "1056px",
        xl: "1088px",
        "2xl": "1088px",
      },
      columnCounts: {
        DEFAULT: 4,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 12,
        "2xl": 12,
      },
      innerGutters: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2rem",
      },
      outerGutters: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "4rem",
      },
    }),
  ],
};
