import { calc } from "@vanilla-extract/css-utils";

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
  const columnWidthAttrs = {};
  const containerColumnWidthAttrs = {};
  const viewportColumnWidthAttrs = {};

  if (classNameDefinition.addGutter) {
    columnWidthCalc = calc.add(columnWidthCalc, innerGutterVar);
    containerColumnWidthCalc = calc.add(
      containerColumnWidthCalc,
      calc.multiply("2", innerGutterVar)
    );
  }

  if (classNameDefinition.accountForContainerMarginLeft) {
    /**
     * For when you have a margin-left inside of a cols-container need to
     * account for the cols-container negative margin left
     */
    containerColumnWidthCalc = calc.add(
      containerColumnWidthCalc,
      innerGutterVar
    );
  }

  if (classNameDefinition.inverse) {
    columnWidthCalc = calc.multiply(columnWidthCalc, -1);
    containerColumnWidthCalc = calc.multiply(containerColumnWidthCalc, -1);
    viewportColumnWidthCalc = calc.multiply(viewportColumnWidthCalc, -1);
  }

  if (Array.isArray(classNameDefinition.attribute)) {
    classNameDefinition.attribute.forEach((attr) => {
      columnWidthAttrs[attr] = columnWidthCalc;
      containerColumnWidthAttrs[attr] = containerColumnWidthCalc;
      viewportColumnWidthAttrs[attr] = viewportColumnWidthCalc;
    });
  } else {
    columnWidthAttrs[classNameDefinition.attribute] = columnWidthCalc;
    containerColumnWidthAttrs[classNameDefinition.attribute] =
      containerColumnWidthCalc;
    viewportColumnWidthAttrs[classNameDefinition.attribute] =
      viewportColumnWidthCalc;
  }

  return {
    [`${
      "." +
      e(
        classNameDefinition.name +
          "-" +
          variant +
          (classNameDefinition.suffix || "")
      )
    }`]: columnWidthAttrs,
    [`${".cols-container"} > ${
      "." +
      e(
        classNameDefinition.name +
          "-" +
          variant +
          (classNameDefinition.suffix || "")
      )
    }`]: containerColumnWidthAttrs,
    [`${
      "." +
      e(
        classNameDefinition.name +
          "-" +
          variant +
          (classNameDefinition.suffix || "")
      )
    }-vw`]: viewportColumnWidthAttrs,
  };
}
