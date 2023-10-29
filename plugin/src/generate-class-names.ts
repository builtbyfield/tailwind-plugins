import { calc } from "css-calc-utils";

import type { ClassNameDefinition, CSSRuleObject } from "./types";
import { innerGutterVar } from "./vars";

export function generateClassNames({
  variant,
  classNameDefinition,
  columnWidthCalc,
  containerColumnWidthCalc,
  viewportColumnWidthCalc,
  e,
}: {
  variant: string;
  classNameDefinition: ClassNameDefinition;
  columnWidthCalc: string;
  containerColumnWidthCalc: string;
  viewportColumnWidthCalc: string;
  e: (className: string) => string;
}): CSSRuleObject {
  const {
    addGutter,
    accountForContainerMarginLeft,
    inverse,
    attribute,
    name,
    suffix,
  } = classNameDefinition;

  const columnWidthAttrs = {};
  const containerColumnWidthAttrs = {};
  const viewportColumnWidthAttrs = {};

  if (addGutter) {
    columnWidthCalc = calc.add(columnWidthCalc, innerGutterVar);
    containerColumnWidthCalc = calc.add(
      containerColumnWidthCalc,
      calc.multiply("2", innerGutterVar)
    );
  }

  if (accountForContainerMarginLeft) {
    /**
     * For when you have a margin-left inside of a cols-container need to
     * account for the cols-container negative margin left
     */
    containerColumnWidthCalc = calc.add(
      containerColumnWidthCalc,
      innerGutterVar
    );
  }

  if (inverse) {
    columnWidthCalc = calc.multiply(columnWidthCalc, -1);
    containerColumnWidthCalc = calc.multiply(containerColumnWidthCalc, -1);
    viewportColumnWidthCalc = calc.multiply(viewportColumnWidthCalc, -1);
  }

  if (Array.isArray(attribute)) {
    attribute.forEach((attr) => {
      columnWidthAttrs[attr] = columnWidthCalc;
      containerColumnWidthAttrs[attr] = containerColumnWidthCalc;
      viewportColumnWidthAttrs[attr] = viewportColumnWidthCalc;
    });
  } else {
    columnWidthAttrs[attribute] = columnWidthCalc;
    containerColumnWidthAttrs[attribute] = containerColumnWidthCalc;
    viewportColumnWidthAttrs[attribute] = viewportColumnWidthCalc;
  }

  const className = generateClassName(e, { name, variant, suffix });

  return {
    [`.${className}`]: columnWidthAttrs,
    [`.cols-container > .${className}`]: containerColumnWidthAttrs,
    [`.${className}-vw`]: viewportColumnWidthAttrs,
  };
}

function generateClassName(
  e: (className: string) => string,
  {
    name,
    variant,
    suffix = "",
  }: {
    name: string;
    variant: string;
    suffix?: string;
  }
) {
  return e(`${name}-${variant}${suffix}`);
}
