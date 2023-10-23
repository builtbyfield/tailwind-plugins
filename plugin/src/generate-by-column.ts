import { calc } from "@vanilla-extract/css-utils";

import { classNames } from "./class-names";
import { fallbackCSSVar } from "./css-var-utils";
import { generateClassNames } from "./generate-class-names";
import type { CSSRuleObject, CSSVarFunction } from "./types";
import {
  containerGridColumnsVar,
  containerWidthVar,
  gridColumnsVar,
  innerGutterVar,
  outerGutterVar,
  scrollbarVisibleWidthVar,
} from "./vars";

/**
 * This function generates CSS rules for each column in the grid. It takes an
 * object as an argument with properties 'cols' and 'e'. 'cols' is the number of
 * columns in the grid and 'e' is a function that takes a className as an
 * argument and returns a string.
 *
 * @param {Object} params - The parameters for generating the CSS rules.
 * @param {number} params.cols - The number of columns in the grid.
 * @param {function} params.e - A function that takes a className as an argument and returns a string.
 * @returns {CSSRuleObject[]} An array of CSSRuleObjects, each representing a CSS rule for a column in the grid.
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
    const columnWidthCalc = calculateColumnWidth(
      cols,
      innerGutterVar,
      containerGridColumnsVar,
      gridColumnsVar
    );
    const containerColumnWidthCalc = calculateColumnWidth(
      cols,
      innerGutterVar,
      containerGridColumnsVar,
      gridColumnsVar
    );
    const viewportColumnWidthCalc = calculateViewportColumnWidth(
      cols,
      containerWidthVar,
      scrollbarVisibleWidthVar,
      innerGutterVar,
      outerGutterVar,
      gridColumnsVar
    );

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

/**
 * This function calculates the width of a column based on the number of
 * columns, the gutter variable, the container variable, and the grid variable.
 *
 * @param {number} cols - The number of columns.
 * @param {CSSVarFunction} gutterVar - The gutter variable.
 * @param {CSSVarFunction} containerVar - The container variable.
 * @param {CSSVarFunction} gridVar - The grid variable.
 * @returns {string} The calculated column width.
 */
function calculateColumnWidth(
  cols: number,
  gutterVar: CSSVarFunction,
  containerVar: CSSVarFunction,
  gridVar: CSSVarFunction
): string {
  return calc.subtract(
    calc.multiply(
      calc.divide(cols, fallbackCSSVar(containerVar, gridVar)),
      "100%"
    ),
    calc.subtract(
      gutterVar,
      calc.multiply(
        calc.divide(cols, fallbackCSSVar(containerVar, gridVar)),
        gutterVar
      )
    )
  );
}

/**
 * This function calculates the width of a column based on the number of
 * columns, the container variable, the scrollbar variable, the gutter variable,
 * the outer gutter variable, and the grid variable.
 *
 * @param {number} cols - The number of columns.
 * @param {CSSVarFunction} containerVar - The container variable.
 * @param {CSSVarFunction} scrollbarVar - The scrollbar variable.
 * @param {CSSVarFunction} gutterVar - The gutter variable.
 * @param {CSSVarFunction} outerGutterVar - The outer gutter variable.
 * @param {CSSVarFunction} gridVar - The grid variable.
 * @returns {string} The calculated viewport column width.
 */
function calculateViewportColumnWidth(
  cols: number,
  containerVar: CSSVarFunction,
  scrollbarVar: CSSVarFunction,
  gutterVar: CSSVarFunction,
  outerGutterVar: CSSVarFunction,
  gridVar: CSSVarFunction
): string {
  let viewportColumnWidthCalc = calc.divide(
    calc.subtract(
      fallbackCSSVar(
        containerVar,
        calc.subtract("100vw", fallbackCSSVar(scrollbarVar, "0px"))
      ),
      calc.add(
        calc.multiply(calc.subtract(gridVar, "1"), gutterVar),
        calc.multiply("2", outerGutterVar)
      )
    ),
    gridVar
  );

  if (cols > 1) {
    viewportColumnWidthCalc = calc.multiply(viewportColumnWidthCalc, cols);
    viewportColumnWidthCalc = calc.add(
      viewportColumnWidthCalc,
      calc.multiply(calc.subtract(cols, 1), gutterVar)
    );
  }

  return viewportColumnWidthCalc;
}
