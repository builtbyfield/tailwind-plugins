import { calc } from "@vanilla-extract/css-utils";

import { generateClassNames } from "./generate-class-names";
import type { ClassNameDefinition, CSSRuleObject, Fraction } from "./types";
import { innerGutterVar } from "./vars";

/**
 * Loops the classes we want to generate, provides the base CSS calcs to
 * generateClasses for fractional classes
 */
export function generateByFraction({
  classes,
  fraction,
  e,
}: {
  classes: ClassNameDefinition[];
  fraction: Fraction;
  e: (className: string) => string;
}): CSSRuleObject[] {
  const fractionClasses: CSSRuleObject[] = [];

  const splitFraction = fraction.split("/").flatMap((n) => parseInt(n));

  const oneMinusNumeric =
    Math.floor((1 - splitFraction[0] / splitFraction[1]) * 1000) / 1000;

  const percent =
    Math.floor((splitFraction[0] / splitFraction[1]) * 100000) / 1000;

  classes.forEach((classNameDefinition) => {
    const columnWidthCalc = calc.subtract(
      `${percent}%`,
      calc.multiply(innerGutterVar, oneMinusNumeric)
    );
    const containerColumnWidthCalc = calc.subtract(
      `${percent}%`,
      innerGutterVar
    );

    const generatedClasses = generateClassNames({
      variant: String(fraction),
      classNameDefinition,
      columnWidthCalc,
      containerColumnWidthCalc,
      viewportColumnWidthCalc: "",
      e,
    });

    fractionClasses.push(generatedClasses);
  });

  return fractionClasses;
}
