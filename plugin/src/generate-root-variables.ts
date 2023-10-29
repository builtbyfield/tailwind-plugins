import { assignCSSVar } from "css-var-utils";
import type { KeyValuePair } from "tailwindcss/types/config";

import type {
  CSSRuleObject,
  GridColumnBackgroundColorThemeOption,
} from "./types";
import {
  containerWidthVar,
  gridColumnBackgroundVar,
  gridColumnsVar,
  innerGutterVar,
  outerGutterVar,
} from "./vars";

const rootSelector = ":root";

type OptionValue = string | KeyValuePair;

/**
 * Generates root variables for the layout.
 *
 * @param {object} params - The parameters for generating the root variables.
 * @param {OptionValue} params.breakpoints - The breakpoints for the layout.
 * @param {OptionValue} params.containerWidths - The container widths for the layout.
 * @param {OptionValue} params.columnCounts - The column counts for the layout.
 * @param {OptionValue} params.innerGutters - The inner gutters for the layout.
 * @param {OptionValue} params.outerGutters - The outer gutters for the layout.
 * @returns The generated root variables.
 */
export function generateRootVariables({
  breakpoints,
  containerWidths,
  columnCounts,
  innerGutters,
  outerGutters,
  gridColumnBackgroundColor,
}: {
  breakpoints: OptionValue;
  containerWidths: OptionValue;
  columnCounts: OptionValue;
  innerGutters: OptionValue;
  outerGutters: OptionValue;
  gridColumnBackgroundColor: GridColumnBackgroundColorThemeOption;
}): CSSRuleObject[] {
  const firstBreakpoint = breakpoints ? Object.keys(breakpoints)[0] : null;

  return Object.keys(breakpoints).map((bp) => {
    const styles = {
      [rootSelector]: {
        ...assignCSSVar(
          containerWidthVar,
          parseInt(containerWidths[bp], 10) ? containerWidths[bp] : "unset"
        ),
        ...assignCSSVar(innerGutterVar, innerGutters[bp]),
        ...assignCSSVar(outerGutterVar, outerGutters[bp]),
        ...assignCSSVar(gridColumnsVar, columnCounts[bp]),
      },
    };

    if (bp === firstBreakpoint) {
      styles[rootSelector] = {
        ...styles[rootSelector],
        ...assignCSSVar(gridColumnBackgroundVar, gridColumnBackgroundColor),
      };
      return styles;
    } else {
      return {
        [`@screen ${bp}`]: {
          ...styles,
        },
      };
    }
  });
}
