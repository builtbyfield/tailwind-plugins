import { calc } from "@vanilla-extract/css-utils";

import { classNames } from "./class-names";
import { fallbackCSSVar } from "./css-var-utils";
import { generateClassNames } from "./generate-class-names";
import type { CSSRuleObject } from "./types";
import {
  containerGridColumnsVar,
  containerWidthVar,
  gridColumnsVar,
  innerGutterVar,
  outerGutterVar,
  scrollbarVisibleWidthVar,
} from "./vars";

/**
 * Loops the classes we want to generate, provides the base CSS calcs to
 * generateClasses for N cols wide classes
 */
export function generateByColumn({
  cols,
  e,
}: {
  cols: number;
  e: (className: string) => string;
}): CSSRuleObject[] {
  const columnClassNames: CSSRuleObject[] = [];

  classNames.forEach((obj) => {
    const columnWidthCalc = calc.subtract(
      calc.multiply(
        calc.divide(
          cols,
          fallbackCSSVar(containerGridColumnsVar, gridColumnsVar)
        ),
        "100%"
      ),
      calc.subtract(
        innerGutterVar,
        calc.multiply(
          calc.divide(
            cols,
            fallbackCSSVar(containerGridColumnsVar, gridColumnsVar)
          ),
          innerGutterVar
        )
      )
    );
    const containerColumnWidthCalc = calc.subtract(
      calc.multiply(
        calc.divide(
          cols,
          fallbackCSSVar(containerGridColumnsVar, gridColumnsVar)
        ),
        calc.subtract("100%", innerGutterVar)
      ),
      calc.subtract(
        innerGutterVar,
        calc.multiply(
          calc.divide(
            cols,
            fallbackCSSVar(containerGridColumnsVar, gridColumnsVar)
          ),
          innerGutterVar
        )
      )
    );

    let viewportColumnWidthCalc = calc.divide(
      calc.subtract(
        fallbackCSSVar(
          containerWidthVar,
          calc.subtract(
            "100vw",
            fallbackCSSVar(scrollbarVisibleWidthVar, "0px")
          )
        ),
        calc.add(
          calc.multiply(calc.subtract(gridColumnsVar, "1"), innerGutterVar),
          calc.multiply("2", outerGutterVar)
        )
      ),
      gridColumnsVar
    );

    if (cols > 1) {
      viewportColumnWidthCalc = calc.multiply(viewportColumnWidthCalc, cols);
      viewportColumnWidthCalc = calc.add(
        viewportColumnWidthCalc,
        calc.multiply(calc.subtract(cols, 1), innerGutterVar)
      );
    }

    const generatedClasses = generateClassNames({
      variant: String(cols),
      classNameDefinition: obj,
      columnWidthCalc,
      containerColumnWidthCalc,
      viewportColumnWidthCalc,
      e,
    });

    columnClassNames.push(generatedClasses);
  });

  return columnClassNames;
}
