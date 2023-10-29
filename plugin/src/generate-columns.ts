import { calc } from "@vanilla-extract/css-utils";
import { type CSSVarFunction, fallbackCSSVar } from "css-var-utils";

import { classNames } from "./class-names";
import { fixNesting } from "./fix-nesting";
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
 * Calculates the width of a column in a grid layout.
 *
 * The function takes an object with four properties: `cols`, `innerGutterVar`, `containerGridColumnsVar`, and `gridColumnsVar`.
 * - `cols` is the number of columns in the grid.
 * - `innerGutterVar` is the width of the gutter between columns.
 * - `containerGridColumnsVar` is the total width of the container.
 * - `gridColumnsVar` is the number of grid columns.
 *
 * The function calculates the width of a single column as a percentage of the total container width,
 * adjusted for the number of columns and the width of the gutters. The result is returned as a string
 * representing a CSS value (e.g., '20%').
 *
 * @param params The parameters for the calculation.
 * @param params.cols The number of columns in the grid.
 * @param params.innerGutterVar The width of the gutter between columns.
 * @param params.containerGridColumnsVar The total width of the container.
 * @param params.gridColumnsVar The number of grid columns.
 * @returns The calculated width of a single column, as a CSS value.
 */
function calculateColumnWidth({
  cols,
  innerGutterVar,
  containerGridColumnsVar,
  gridColumnsVar,
}: {
  cols: number;
  innerGutterVar: CSSVarFunction;
  containerGridColumnsVar: CSSVarFunction;
  gridColumnsVar: CSSVarFunction;
}): string {
  const totalGridColumns = fallbackCSSVar(
    containerGridColumnsVar,
    gridColumnsVar
  );

  return calc.subtract(
    calc.multiply(calc.divide(cols, totalGridColumns), "100%"),
    calc.subtract(
      innerGutterVar,
      calc.multiply(calc.divide(cols, totalGridColumns), innerGutterVar)
    )
  );
}

/**
 * Calculates the width of a container column in a grid layout.
 *
 * The function takes an object with four properties: `cols`, `innerGutterVar`, `containerGridColumnsVar`, and `gridColumnsVar`.
 * - `cols` is the number of columns in the grid.
 * - `innerGutterVar` is the width of the gutter between columns.
 * - `containerGridColumnsVar` is the total width of the container.
 * - `gridColumnsVar` is the number of grid columns.
 *
 * The function calculates the width of a single column as a percentage of the total container width,
 * adjusted for the number of columns and the width of the gutters. The result is returned as a string
 * representing a CSS value (e.g., '20%').
 *
 * @param params The parameters for the calculation.
 * @param params.cols The number of columns in the grid.
 * @param params.innerGutterVar The width of the gutter between columns.
 * @param params.containerGridColumnsVar The total width of the container.
 * @param params.gridColumnsVar The number of grid columns.
 * @returns The calculated width of a single column, as a CSS value.
 */
function calculateContainerColumnWidth({
  cols,
  innerGutterVar,
  containerGridColumnsVar,
  gridColumnsVar,
}: {
  cols: number;
  innerGutterVar: CSSVarFunction;
  containerGridColumnsVar: CSSVarFunction;
  gridColumnsVar: CSSVarFunction;
}): string {
  const totalGridColumns = fallbackCSSVar(
    containerGridColumnsVar,
    gridColumnsVar
  );

  return calc.subtract(
    calc.multiply(
      calc.divide(cols, totalGridColumns),
      calc.subtract("100%", innerGutterVar)
    ),
    calc.subtract(
      innerGutterVar,
      calc.multiply(calc.divide(cols, totalGridColumns), innerGutterVar)
    )
  );
}

/**
 * Calculates the width of a viewport column in a grid layout.
 *
 * The function takes an object with six properties: `cols`, `containerWidthVar`, `scrollbarVisibleWidthVar`, `innerGutterVar`, `outerGutterVar`, and `gridColumnsVar`.
 * - `cols` is the number of columns in the grid.
 * - `containerWidthVar` is the total width of the container.
 * - `scrollbarVisibleWidthVar` is the width of the scrollbar.
 * - `innerGutterVar` is the width of the gutter between columns.
 * - `outerGutterVar` is the width of the outer gutter.
 * - `gridColumnsVar` is the number of grid columns.
 *
 * The function calculates the width of a single column as a percentage of the total container width,
 * adjusted for the number of columns, the width of the gutters, and the width of the scrollbar.
 * The result is returned as a string representing a CSS value (e.g., '20%').
 *
 * @param params The parameters for the calculation.
 * @param params.cols The number of columns in the grid.
 * @param params.containerWidthVar The total width of the container.
 * @param params.scrollbarVisibleWidthVar The width of the scrollbar.
 * @param params.innerGutterVar The width of the gutter between columns.
 * @param params.outerGutterVar The width of the outer gutter.
 * @param params.gridColumnsVar The number of grid columns.
 * @returns The calculated width of a single viewport column, as a CSS value.
 */
function calculateViewportColumnWidth({
  cols,
  containerWidthVar,
  scrollbarVisibleWidthVar,
  innerGutterVar,
  outerGutterVar,
  gridColumnsVar,
}: {
  cols: number;
  containerWidthVar: CSSVarFunction;
  scrollbarVisibleWidthVar: CSSVarFunction;
  innerGutterVar: CSSVarFunction;
  outerGutterVar: CSSVarFunction;
  gridColumnsVar: CSSVarFunction;
}): string {
  const scrollbarWidth = fallbackCSSVar(scrollbarVisibleWidthVar, "0px");

  let viewportColumnWidthCalc = calc.divide(
    calc.subtract(
      fallbackCSSVar(containerWidthVar, calc.subtract("100vw", scrollbarWidth)),
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

  return viewportColumnWidthCalc;
}

/**
 * Generates CSS rules for each column in a grid layout.
 *
 * The function takes an object with two properties: `cols` and `e`.
 * - `cols` is the number of columns in the grid.
 * - `e` is a function that takes a className as an argument and returns a string.
 *
 * The function generates CSS rules for each column, taking into account the number of columns and the className function.
 * The result is an array of CSSRuleObjects, each representing a CSS rule for a column in the grid.
 *
 * @param params The parameters for generating the CSS rules.
 * @param params.cols The number of columns in the grid.
 * @param params.e A function that takes a className as an argument and returns a string.
 * @returns An array of CSSRuleObjects, each representing a CSS rule for a column in the grid.
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
    const columnWidthCalc = calculateColumnWidth({
      cols,
      innerGutterVar,
      containerGridColumnsVar,
      gridColumnsVar,
    });

    const containerColumnWidthCalc = calculateContainerColumnWidth({
      cols,
      innerGutterVar,
      containerGridColumnsVar,
      gridColumnsVar,
    });

    const viewportColumnWidthCalc = calculateViewportColumnWidth({
      cols: cols,
      containerWidthVar,
      scrollbarVisibleWidthVar,
      innerGutterVar,
      outerGutterVar,
      gridColumnsVar,
    });

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
 * Generates CSS rules for a given number of columns in a grid layout.
 *
 * The function takes an object with two properties: `maxColAmount` and `e`.
 * - `maxColAmount` is the maximum number of columns for which to generate CSS rules.
 * - `e` is a function that takes a className as an argument and returns a string.
 *
 * The function generates CSS rules for each column up to the maximum number of columns, taking into account the className function.
 * The result is an array of CSSRuleObjects, each representing a CSS rule for a column in the grid.
 *
 * @param params The parameters for generating the CSS rules.
 * @param params.maxColAmount The maximum number of columns for which to generate CSS rules.
 * @param params.e A function that takes a className as an argument and returns a string.
 * @returns An array of CSSRuleObjects, each representing a CSS rule for a column.
 */
export function generateColumns({
  maxColAmount,
  e,
}: {
  maxColAmount: number;
  e: (className: string) => string;
}): CSSRuleObject[] {
  const colsContainerSelector = ".cols-container";

  const columnClassNames: CSSRuleObject[] = [
    {
      // Styles for '.cols-container'
      [colsContainerSelector]: {
        display: "flex",
        flexFlow: "row wrap",
        marginLeft: calc.multiply(innerGutterVar, -1),
      },
      // Styles for children with '-cols' in their class
      [`${colsContainerSelector} > [class*="-cols"]`]: {
        marginLeft: innerGutterVar,
      },
      // Styles for children with '.ml-0' class
      [`${colsContainerSelector} > .ml-0`]: {
        marginLeft: "0px",
      },
    },
  ];

  for (let i = 1; i <= maxColAmount; i++) {
    const colStyles = generateByColumn({ cols: i, e });
    const fixNestingStyles = fixNesting({ cols: i });
    columnClassNames.push(...colStyles, fixNestingStyles);
  }

  return columnClassNames;
}
