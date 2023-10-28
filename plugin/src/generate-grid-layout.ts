import { assignCSSVar, fallbackCSSVar } from "css-var-utils";

import type { CSSRuleObject } from "./types";
import {
  containerGridColumnsVar,
  gridColumnsVar,
  innerGutterVar,
} from "./vars";

const gridContainerSelector = ".grid-container";
const spanSelector = (n: number): string => `.grid-col-span-${n}`;
const startSelector = (n: number): string => `.grid-col-start-${n}`;
const endSelector = (n: number): string => `.grid-col-end-${n}`;

/**
 * This is the main function to generate the grid layout.
 * It takes the maximum number of columns as input and generates
 * the corresponding CSS rules for the grid layout.
 *
 * @param {number} maxColAmount - The maximum number of columns in the grid.
 * @returns {CSSRuleObject[]} An array of CSS rule objects for the grid layout.
 */
export function generateGridLayout({
  maxColAmount,
}: {
  maxColAmount: number;
}): CSSRuleObject[] {
  const classNames: CSSRuleObject[] = [
    {
      [gridContainerSelector]: {
        display: "grid",
        gridTemplateColumns: `repeat(${fallbackCSSVar(
          containerGridColumnsVar,
          gridColumnsVar
        )}, 1fr)`,
        gridGap: innerGutterVar,
      },
    },
  ];

  for (let n = 1; n <= maxColAmount + 1; n++) {
    classNames.push({
      [spanSelector(n)]: {
        ...assignCSSVar(containerGridColumnsVar, String(n)),
        gridColumn: `span ${n} / span ${n}`,
      },
    });
  }

  for (let n = 1; n <= maxColAmount + 1; n++) {
    classNames.push({
      [startSelector(n)]: {
        gridColumnStart: String(n),
      },
      [endSelector(n)]: {
        gridColumnEnd: String(n),
      },
    });
  }

  return classNames;
}
