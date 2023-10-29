import tailwindTypography from "@tailwindcss/typography";
import layout from "plugin";
import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: null,
          },
        },
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    tailwindTypography(),
    tailwindScrollbar({ nocompatible: true }),
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
        DEFAULT: "30px",
        sm: "30px",
        md: "30px",
        lg: "30px",
        xl: "30px",
        "2xl": "30px",
      },
      outerGutters: {
        DEFAULT: "30px",
        sm: "30px",
        md: "30px",
        lg: "30px",
        xl: "30px",
        "2xl": "30px",
      },
      gridColumnBackgroundColor: "rgba(0, 0, 255, 0.075)",
    }),
  ],
};
