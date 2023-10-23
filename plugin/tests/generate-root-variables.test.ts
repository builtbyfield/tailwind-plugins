import { expect, test } from "vitest";

import { generateRootVariables } from "../src/generate-root-variables";

test("generateRootVariables", () => {
  const params = {
    breakpoints: {
      DEFAULT: "0",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    containerWidths: {
      DEFAULT: "100%",
      sm: "100%",
      md: "100%",
      lg: "1024px",
      xl: "1280px",
    },
    columnCounts: {
      DEFAULT: "4",
      sm: "4",
      md: "6",
      lg: "8",
      xl: "12",
    },
    innerGutters: {
      DEFAULT: "16px",
      sm: "16px",
      md: "24px",
      lg: "32px",
      xl: "48px",
    },
    outerGutters: {
      DEFAULT: "16px",
      sm: "16px",
      md: "24px",
      lg: "32px",
      xl: "48px",
    },
  };

  const result = generateRootVariables(params);

  expect(result).toMatchObject([
    {
      ":root": {
        "--container-width": "100%",
        "--inner-gutter": "16px",
        "--outer-gutter": "16px",
        "--grid-columns": "4",
      },
    },
    {
      "@screen sm": {
        ":root": {
          "--container-width": "100%",
          "--inner-gutter": "16px",
          "--outer-gutter": "16px",
          "--grid-columns": "4",
        },
      },
    },
    {
      "@screen md": {
        ":root": {
          "--container-width": "100%",
          "--inner-gutter": "24px",
          "--outer-gutter": "24px",
          "--grid-columns": "6",
        },
      },
    },
    {
      "@screen lg": {
        ":root": {
          "--container-width": "1024px",
          "--inner-gutter": "32px",
          "--outer-gutter": "32px",
          "--grid-columns": "8",
        },
      },
    },
    {
      "@screen xl": {
        ":root": {
          "--container-width": "1280px",
          "--inner-gutter": "48px",
          "--outer-gutter": "48px",
          "--grid-columns": "12",
        },
      },
    },
  ]);
});
