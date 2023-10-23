import { assignCSSVar } from "./css-var-utils";
import type { CSSRuleObject } from "./types";
import {
  containerWidthVar,
  gridColumnBackgroundVar,
  gridColumnsVar,
  innerGutterVar,
  outerGutterVar,
} from "./vars";

const rootSelector = ":root";

/**
 * Generates root variables for the layout.
 *
 * @param {object} params - The parameters for generating the root variables.
 * @param {Record<string, string>} params.breakpoints - The breakpoints for the layout.
 * @param {Record<string, string>} params.containerWidths - The container widths for the layout.
 * @param {Record<string, string>} params.columnCounts - The column counts for the layout.
 * @param {Record<string, string>} params.innerGutters - The inner gutters for the layout.
 * @param {Record<string, string>} params.outerGutters - The outer gutters for the layout.
 * @returns {CSSRuleObject[]} The generated root variables.
 */
export function generateRootVariables({
  breakpoints,
  containerWidths,
  columnCounts,
  innerGutters,
  outerGutters,
}: {
  breakpoints: Record<string, string>;
  containerWidths: Record<string, string>;
  columnCounts: Record<string, string>;
  innerGutters: Record<string, string>;
  outerGutters: Record<string, string>;
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
        ...assignCSSVar(gridColumnBackgroundVar, "rgba(127, 255, 255, 0.25)"),
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
