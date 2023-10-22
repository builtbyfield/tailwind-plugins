import { assignCSSVar } from "./css-var-utils";
import type { CSSRuleObject } from "./types";
import {
  containerWidthVar,
  gridColumnBackgroundVar,
  gridColumnsVar,
  innerGutterVar,
  outerGutterVar,
} from "./vars";

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

  // Root variables
  const rootVariables: CSSRuleObject[] = [];

  Object.keys(breakpoints).forEach((bp) => {
    const styles: Record<string, Record<string, string>> = {
      ":root": {
        ...assignCSSVar(
          containerWidthVar,
          parseInt(containerWidths[bp], 10) ? containerWidths[bp] : "unset"
        ),
        ...assignCSSVar(innerGutterVar, innerGutters[bp]),
        ...assignCSSVar(innerGutterVar, innerGutters[bp]),
        ...assignCSSVar(outerGutterVar, outerGutters[bp]),
        ...assignCSSVar(gridColumnsVar, columnCounts[bp]),
      },
    };

    if (bp === firstBreakpoint) {
      styles[":root"] = {
        ...styles[":root"],
        ...assignCSSVar(gridColumnBackgroundVar, "rgba(127, 255, 255, 0.25)"),
      };
      rootVariables.push({
        ...styles,
      });
    } else {
      rootVariables.push({
        [`@screen ${bp}`]: {
          ...styles,
        },
      });
    }
  });

  return rootVariables;
}
