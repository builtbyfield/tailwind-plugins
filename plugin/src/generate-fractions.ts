import { calc } from "@vanilla-extract/css-utils";
import { fallbackCSSVar } from "css-var-utils";

import { classNames } from "./class-names";
import { generateClassNames } from "./generate-class-names";
import type { CSSRuleObject, Fraction } from "./types";
import { innerGutterVar } from "./vars";

/**
 * Loops the `classNames` we want to generate, provides the base CSS calcs to
 * `generateClassNames` for fractional classes.
 *
 * @param {Object} params - The parameters for generating the CSS rules.
 * @param {Fraction} params.fraction - The fraction we want to generate CSS rules for.
 * @param {function} params.e - A function that takes a className as an argument and returns a string.
 * @returns {CSSRuleObject[]} An array of CSSRuleObjects, each representing a CSS rule for a fraction.
 */
export function generateByFraction({
  fraction,
  e,
}: {
  fraction: Fraction;
  e: (className: string) => string;
}): CSSRuleObject[] {
  const fractionClassNames: CSSRuleObject[] = [];

  const splitFraction = fraction.split("/").flatMap((n) => parseInt(n));

  const oneMinusNumeric =
    Math.floor((1 - splitFraction[0] / splitFraction[1]) * 1000) / 1000;

  const percent =
    Math.floor((splitFraction[0] / splitFraction[1]) * 100000) / 1000;

  classNames.forEach((classNameDefinition) => {
    const columnWidthCalc = calc.subtract(
      `${percent}%`,
      calc.multiply(fallbackCSSVar(innerGutterVar, "0px"), oneMinusNumeric)
    );
    const containerColumnWidthCalc = calc.subtract(
      `${percent}%`,
      fallbackCSSVar(innerGutterVar, "0px")
    );

    const generatedClassNames = generateClassNames({
      variant: String(fraction),
      classNameDefinition,
      columnWidthCalc,
      containerColumnWidthCalc,
      viewportColumnWidthCalc: "",
      e,
    });

    fractionClassNames.push(generatedClassNames);
  });

  return fractionClassNames;
}

/**
 * This function generates CSS rules for a given set of fractions.
 * It loops over the fractions and calls `generateByFraction` for each fraction.
 * The generated CSS rules are then returned as an array of CSSRuleObjects.
 *
 * @param {Object} params - The parameters for generating the CSS rules.
 * @param {Fraction[]} params.fractions - The fractions for which to generate CSS rules.
 * @param {function} params.e - A function that takes a className as an argument and returns a string.
 * @returns {CSSRuleObject[]} An array of CSSRuleObjects, each representing a CSS rule for a fraction.
 */
export function generateFractions({
  fractions,
  e,
}: {
  fractions: Fraction[];
  e: (className: string) => string;
}): CSSRuleObject[] {
  const fractionClassNames: CSSRuleObject[] = [];

  fractions.forEach((fraction) => {
    const fractionStyles = generateByFraction({ fraction, e });
    fractionClassNames.push(...fractionStyles);
  });

  return fractionClassNames;
}
