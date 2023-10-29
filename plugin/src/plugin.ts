import { fallbackCSSVar } from "css-var-utils";
import twPlugin from "tailwindcss/plugin";
import type { CSSRuleObject as TailwindCSSRuleObject } from "tailwindcss/types/config";

import { containerStyles } from "./container-styles";
import { fractions } from "./fractions";
import { generateColumns } from "./generate-columns";
import { generateFractions } from "./generate-fractions";
import { generateGridLayout } from "./generate-grid-layout";
import { generateRootVariables } from "./generate-root-variables";
import { layoutOverlayStyles } from "./layout-overlay";
import type {
  ColumnCountsThemeOption,
  ContainerWidthsThemeOption,
  GridColumnBackgroundColorThemeOption,
  InnerGuttersThemeOption,
  OuterGuttersThemeOption,
} from "./types";
import {
  breakoutContainerOuterGutterVar,
  breakoutOuterGutterVar,
  containerGridColumnsVar,
  containerOuterGutterVar,
  containerWidthVar,
  gridColumnsVar,
  innerGutterVar,
  outerGutterVar,
  scrollbarVisibleWidthVar,
} from "./vars";

type Options = {
  containerWidths?: ContainerWidthsThemeOption;
  columnCounts?: ColumnCountsThemeOption;
  innerGutters?: InnerGuttersThemeOption;
  outerGutters?: InnerGuttersThemeOption;
  gridColumnBackgroundColor?: GridColumnBackgroundColorThemeOption;
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
      const gridColumnBackgroundColor = theme(
        "gridColumnBackgroundColor"
      ) as GridColumnBackgroundColorThemeOption;

      /**
       * Get the max column count from the largest of the theme's columnCounts
       */
      const maxColAmount = Math.max(
        ...Object.values(columnCounts).map((v) => parseInt(v, 10))
      );

      // Make classes for the variables that drive the layout
      const rootVariables = generateRootVariables({
        breakpoints,
        containerWidths,
        columnCounts,
        innerGutters,
        outerGutters,
        gridColumnBackgroundColor,
      });
      addBase(rootVariables as unknown as TailwindCSSRuleObject[]);

      // Make classes for the layout overlay (for debugging)
      addComponents(layoutOverlayStyles as unknown as TailwindCSSRuleObject[]);

      // Make classes for the .container and associated classes
      addComponents(containerStyles as unknown as TailwindCSSRuleObject[]);

      // Make classes for the N cols wide columns using flexbox method
      const columnStyles = generateColumns({ maxColAmount, e });
      addComponents(columnStyles as unknown as TailwindCSSRuleObject[]);

      // Make classes for fractions using flexbox method
      const fractionStyles = generateFractions({ fractions, e });
      addComponents(fractionStyles as unknown as TailwindCSSRuleObject[]);

      // Make classes for CSS grid layout methods
      const gridLayoutStyles = generateGridLayout({ maxColAmount });
      addComponents(gridLayoutStyles as unknown as TailwindCSSRuleObject[]);
    };
  },
  function (options) {
    const containerWidths: ContainerWidthsThemeOption =
      options.containerWidths ?? {
        DEFAULT: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "100%",
      };

    const columnCounts: ColumnCountsThemeOption = options.columnCounts ?? {
      DEFAULT: "4",
      sm: "4",
      md: "8",
      lg: "12",
      xl: "12",
      "2xl": "12",
    };

    const innerGutters: InnerGuttersThemeOption = options.innerGutters ?? {
      DEFAULT: "1rem",
      sm: "1rem",
      md: "1rem",
      lg: "1rem",
      xl: "1rem",
      "2xl": "1rem",
    };

    const outerGutters: OuterGuttersThemeOption = options.outerGutters ?? {
      DEFAULT: "1rem",
      sm: "1rem",
      md: "1rem",
      lg: "1rem",
      xl: "1rem",
      "2xl": "1rem",
    };

    const gridColumnBackgroundColor: GridColumnBackgroundColorThemeOption =
      options.gridColumnBackgroundColor ?? "rgba(127, 255, 255, 0.25)";

    /**
     * Provide default values
     */
    return {
      theme: {
        containerWidths,
        columnCounts,
        innerGutters,
        outerGutters,
        gridColumnBackgroundColor,
        extend: {
          spacing: {
            ["container-width"]: containerWidthVar,
            ["gutter"]: innerGutterVar,
            ["inner-gutter"]: innerGutterVar,
            ["outer-gutter"]: outerGutterVar,
            ["container-outer-gutter"]: containerOuterGutterVar,
            ["breakout-outer-gutter"]: breakoutOuterGutterVar,
            ["breakout-container-outer-gutter"]:
              breakoutContainerOuterGutterVar,
            ["scrollbar-visible-width"]: scrollbarVisibleWidthVar,
          },
        },
      },
    };
  }
);
