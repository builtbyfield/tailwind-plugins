import { assignCSSVar } from "./css-var-utils";
import type { CSSRuleObject } from "./types";
import { containerGridColumnsVar } from "./vars";

/**
 * Nesting N cols wide columns needs an override to the --grid-columns to allow
 * nesting of N cols wide columns
 */
export function fixNesting({ cols }: { cols: number }): CSSRuleObject {
  return {
    [`${".w"}-${cols}-cols > *`]: {
      ...assignCSSVar(containerGridColumnsVar, String(cols)),
    },
    [`${".w"}-${cols}-cols-vw > *`]: {
      ...assignCSSVar(containerGridColumnsVar, String(cols)),
    },
  };
}
