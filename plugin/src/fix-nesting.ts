import { assignCSSVar } from "css-var-utils";

import type { CSSRuleObject } from "./types";
import { containerGridColumnsVar } from "./vars";

/**
 * This function is used to fix the nesting of `N` cols wide columns. It creates
 * an override to the `--grid-columns` CSS variable to allow nesting of `N` cols
 * wide columns.
 *
 * @param cols - The number of columns to be nested.
 * @returns A `CSSRuleObject` that contains the base and viewport selectors with
 *          the assigned CSS variable.
 *
 * @example
 * ```ts
 * const cssRuleObject = fixNesting({ cols: 3 });
 * ```
 */
export function fixNesting({ cols }: { cols: number }): CSSRuleObject {
  const baseSelector = `.w-${cols}-cols > *`;
  const vwSelector = `.w-${cols}-cols-vw > *`;
  const cssVarAssignment = assignCSSVar(containerGridColumnsVar, String(cols));

  return {
    [baseSelector]: { ...cssVarAssignment },
    [vwSelector]: { ...cssVarAssignment },
  };
}
