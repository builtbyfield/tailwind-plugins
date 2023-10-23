import twPlugin from "tailwindcss/plugin";

import { classNames } from "./class-names";
import { colsContainerStyles } from "./cols-container-styles";
import { containerStyles } from "./container-styles";
import { fixNesting } from "./fix-nesting";
import { fractions } from "./fractions";
import { generateByColumn } from "./generate-by-column";
import { generateByFraction } from "./generate-by-fraction";
import { generateRootVariables } from "./generate-root-variables";
import { layoutOverlayStyles } from "./layout-overlay";
import type { TailwindCSSRuleObject } from "./types";

type Options = {
  containerWidths: Record<string, string>;
  columnCounts: Record<string, string>;
  innerGutters: Record<string, string>;
  outerGutters: Record<string, string>;
};

export const plugin = twPlugin.withOptions<Options>(
  function () {
    return function ({ addBase, addComponents, theme, e }) {
      const breakpoints = (theme("screens") || {}) as Record<string, string>;
      const containerWidths = (theme("containerWidths") || {}) as Record<
        string,
        string
      >;
      const columnCounts = (theme("columnCounts", {}) || {}) as Record<
        string,
        string
      >;
      const innerGutters = (theme("innerGutters") || {}) as Record<
        string,
        string
      >;
      const outerGutters = (theme("outerGutters") || {}) as Record<
        string,
        string
      >;

      /**
       * Get the max column count from the largest of the theme's columnCounts
       */
      const maxColAmount = Math.max(
        ...Object.values(columnCounts).map((v) => parseInt(v, 10))
      );

      const rootVariables = generateRootVariables({
        breakpoints,
        containerWidths,
        columnCounts,
        innerGutters,
        outerGutters,
      });

      addBase(rootVariables as unknown as TailwindCSSRuleObject[]);
      addComponents(layoutOverlayStyles as unknown as TailwindCSSRuleObject[]);
      addComponents(containerStyles as unknown as TailwindCSSRuleObject[]);

      // Base styles
      const styles = colsContainerStyles;

      // Make classes for the N cols wide columns
      for (let i = 1; i <= maxColAmount; i++) {
        const colStyles = generateByColumn({ cols: i, e });
        const fixNestingStyles = fixNesting({ cols: i });
        styles.push(...colStyles, fixNestingStyles);
      }

      // Make classes for fractions
      fractions.forEach((fraction) => {
        const fractionStyles = generateByFraction({
          classes: classNames,
          fraction,
          e,
        });
        styles.push(...fractionStyles);
      });

      addComponents(styles as unknown as TailwindCSSRuleObject[]);
    };
  },
  function (options) {
    /**
     * Provide default values
     */
    return {
      theme: {
        containerWidths:
          options && options.containerWidths
            ? options.containerWidths
            : {
                DEFAULT: "100%",
                sm: "100%",
                md: "100%",
                lg: "100%",
                xl: "100%",
                "2xl": "100%",
              },
        columnCounts:
          options && options.columnCounts
            ? options.columnCounts
            : {
                DEFAULT: "4",
                sm: "4",
                md: "8",
                lg: "12",
                xl: "12",
                "2xl": "12",
              },
        innerGutters:
          options && options.innerGutters
            ? options.innerGutters
            : {
                DEFAULT: "1rem",
                sm: "1rem",
                md: "1rem",
                lg: "1rem",
                xl: "1rem",
                "2xl": "1rem",
              },
        outerGutters:
          options && options.outerGutters
            ? options.outerGutters
            : {
                DEFAULT: "1rem",
                sm: "1rem",
                md: "1rem",
                lg: "1rem",
                xl: "1rem",
                "2xl": "1rem",
              },
      },
    };
  }
);
