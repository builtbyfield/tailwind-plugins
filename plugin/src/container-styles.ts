import { calc } from "@vanilla-extract/css-utils";
import { assignCSSVar, fallbackCSSVar } from "css-var-utils";

import type { CSSRuleObject } from "./types";
import {
  breakoutContainerOuterGutterVar,
  breakoutOuterGutterVar,
  containerOuterGutterVar,
  containerWidthVar,
  outerGutterVar,
  scrollbarVisibleWidthVar,
} from "./vars";

const containerSelector = ".container";
const breakoutSelector = ".breakout";

export const containerStyles: CSSRuleObject = {
  // Styles for '.container' class
  [containerSelector]: {
    // Calculate the width
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
  // Styles for direct children of '.container'
  [`${containerSelector} > *`]: {
    ...assignCSSVar(containerOuterGutterVar, "0"),
    ...assignCSSVar(breakoutContainerOuterGutterVar, "0"),
  },
  // Reset container styles
  [".container-reset"]: {
    width: "unset",
    marginRight: "unset",
    marginLeft: "unset",
  },
  // Reset styles for direct children of '.container-reset'
  [`${containerSelector}-reset > *`]: {
    ...assignCSSVar(
      containerOuterGutterVar,
      fallbackCSSVar(outerGutterVar, "0")
    ),
    ...assignCSSVar(breakoutContainerOuterGutterVar, "inherit"),
  },
  // Styles for '.breakout' class
  [breakoutSelector]: {
    // Set and calculate gutter variables
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
  [`${breakoutSelector}.px-outer-gutter, ${breakoutSelector} > .px-outer-gutter`]:
    {
      paddingLeft: breakoutOuterGutterVar,
      paddingRight: breakoutOuterGutterVar,
    },
  [`${breakoutSelector}.pr-outer-gutter, ${breakoutSelector} > .pr-outer-gutter`]:
    {
      paddingRight: breakoutOuterGutterVar,
    },
  [`${breakoutSelector}.pl-outer-gutter, ${breakoutSelector} > .pl-outer-gutter`]:
    {
      paddingLeft: breakoutOuterGutterVar,
    },
  [`${breakoutSelector} > .w-outer-gutter`]: {
    width: breakoutOuterGutterVar,
  },
  // Reset styles for '.breakout'
  [`${breakoutSelector}-reset`]: {
    ...assignCSSVar(breakoutOuterGutterVar, outerGutterVar),
    ...assignCSSVar(breakoutContainerOuterGutterVar, "0"),
    position: "unset",
    left: "unset",
    width: "unset",
    marginLeft: "unset",
  },
};
