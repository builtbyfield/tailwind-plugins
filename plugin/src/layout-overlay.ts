import { calc } from "@vanilla-extract/css-utils";

import { fallbackCSSVar } from "./css-var-utils";
import type { CSSRuleObject } from "./types";
import {
  containerWidthVar,
  gridColumnBackgroundVar,
  gridColumnsVar,
  innerGutterVar,
  outerGutterVar,
} from "./vars";

const baseSelector = ".layout-overlay";

const overlayWidth = calc.subtract(
  fallbackCSSVar(containerWidthVar, "100%"),
  calc.multiply(2, fallbackCSSVar(outerGutterVar, "0"))
);

const gridColumn = calc.divide(
  calc.subtract(
    "100%",
    calc.multiply(calc.subtract(gridColumnsVar, "1"), innerGutterVar)
  ),
  gridColumnsVar
);

const gridColumnWithInnerGutter = calc.add(gridColumn, innerGutterVar);

export const layoutOverlayStyles: CSSRuleObject = {
  [baseSelector]: {
    position: "fixed",
    zIndex: "9999999999",
    left: "0",
    bottom: "0",
    fontSize: "0",
  },
  [`${baseSelector}-toggle`]: {
    position: "relative",
    zIndex: "2",
    width: "30px",
    height: "30px",
    border: "0",
    background: "black",
    color: "transparent",
    font: "0/0 a",
    appearance: "none",
    cursor: "pointer",
  },
  [`${baseSelector}-toggle::before, ${baseSelector}-toggle::after`]: {
    content: "''",
    position: "absolute",
    left: "8px",
    top: "10px",
    width: "5px",
    height: "10px",
    borderLeft: "1px solid white",
    borderRight: "1px solid white",
  },
  [`${baseSelector}-toggle::after`]: {
    left: "16px",
  },
  [`${baseSelector}-grid`]: {
    position: "fixed",
    zIndex: "1",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    width: overlayWidth,
    height: "100%",
    margin: "0 auto",
    background: `repeating-linear-gradient(
        90deg,
        ${gridColumnBackgroundVar},
        ${gridColumnBackgroundVar} ${gridColumn},
        rgba(0,0,0,0) ${gridColumn},
        rgba(0,0,0,0) ${gridColumnWithInnerGutter}
      )`,
    pointerEvents: "none",
  },
};
