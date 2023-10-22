import { calc } from "@vanilla-extract/css-utils";

import { assignCSSVar, fallbackCSSVar } from "./css-var-utils";
import type { CSSRuleObject } from "./types";
import {
  breakoutContainerOuterGutterVar,
  breakoutOuterGutterVar,
  containerOuterGutterVar,
  containerWidthVar,
  outerGutterVar,
  scrollbarVisibleWidthVar,
} from "./vars";

export const containerStyles: CSSRuleObject = {
  ".container": {
    width: calc.subtract(
      fallbackCSSVar(containerWidthVar, "100%"),
      calc.multiply(
        2,
        fallbackCSSVar(
          breakoutContainerOuterGutterVar,
          fallbackCSSVar(
            containerOuterGutterVar,
            fallbackCSSVar(outerGutterVar, "0")
          )
        )
      )
    ),
    marginRight: "auto",
    marginLeft: "auto",
  },
  ".container > *": {
    ...assignCSSVar(containerOuterGutterVar, "0"),
    ...assignCSSVar(breakoutContainerOuterGutterVar, "0"),
  },
  ".container-reset": {
    width: "unset",
    marginRight: "unset",
    marginLeft: "unset",
  },
  ".container-reset > *": {
    ...assignCSSVar(
      containerOuterGutterVar,
      fallbackCSSVar(outerGutterVar, "0")
    ),
    ...assignCSSVar(breakoutContainerOuterGutterVar, "inherit"),
  },
  ".breakout": {
    ...assignCSSVar(
      breakoutOuterGutterVar,
      `max(${outerGutterVar}, ${calc.divide(
        calc.subtract("100%", fallbackCSSVar(containerWidthVar, "100%")),
        2
      )})`
    ),
    ...assignCSSVar(breakoutContainerOuterGutterVar, outerGutterVar),
    position: "relative",
    left: "50%",
    width: calc.subtract(
      "100vw",
      fallbackCSSVar(scrollbarVisibleWidthVar, "0px")
    ),
    marginLeft: calc.divide(
      calc.subtract("100vw", fallbackCSSVar(scrollbarVisibleWidthVar, "0px")),
      -2
    ),
  },
  [".breakout.px-outer-gutter, .breakout > .px-outer-gutter"]: {
    paddingLeft: breakoutOuterGutterVar,
    paddingRight: breakoutOuterGutterVar,
  },
  [".breakout.pr-outer-gutter, .breakout > .pr-outer-gutter"]: {
    paddingRight: breakoutOuterGutterVar,
  },
  [".breakout.pl-outer-gutter, .breakout > .pl-outer-gutter"]: {
    paddingLeft: breakoutOuterGutterVar,
  },
  ".breakout > .w-outer-gutter": {
    width: breakoutOuterGutterVar,
  },
  ".breakout-reset": {
    ...assignCSSVar(breakoutOuterGutterVar, outerGutterVar),
    ...assignCSSVar(breakoutContainerOuterGutterVar, "0"),
    position: "unset",
    left: "unset",
    width: "unset",
    marginLeft: "unset",
  },
};
