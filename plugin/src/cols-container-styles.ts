import { calc } from "@vanilla-extract/css-utils";

import type { CSSRuleObject } from "./types";
import { innerGutterVar } from "./vars";

const baseSelector = ".cols-container";

export const colsContainerStyles: CSSRuleObject[] = [
  {
    // Styles for '.cols-container'
    [baseSelector]: {
      display: "flex",
      flexFlow: "row wrap",
      marginLeft: calc.multiply(innerGutterVar, -1),
    },
    // Styles for children with '-cols' in their class
    [`${baseSelector} > [class*="-cols"]`]: {
      marginLeft: innerGutterVar,
    },
    // Styles for children with '.ml-0' class
    [`${baseSelector} > .ml-0`]: {
      marginLeft: "0px",
    },
  },
];
