import { calc } from "@vanilla-extract/css-utils";

import type { CSSRuleObject } from "./types";
import { innerGutterVar } from "./vars";

export const colsContainerStyles: CSSRuleObject[] = [
  {
    [".cols-container"]: {
      display: "flex",
      flexFlow: "row wrap",
      marginLeft: calc.multiply(innerGutterVar, -1),
    },
    [`${".cols-container"} > ${'[class*="-cols"]'}`]: {
      marginLeft: innerGutterVar,
    },
    [`${".cols-container"} > ${".ml-0"}`]: {
      marginLeft: "0px",
    },
  },
];
