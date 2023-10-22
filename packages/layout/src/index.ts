import {
  assignCSSVar,
  createCSSVar,
  fallbackCSSVar,
  getCSSVarName,
} from "./css-var-utils";
import { plugin } from "./plugin";
import type { CSSRuleObject, CSSVarFunction } from "./types";
import {
  breakoutContainerOuterGutterVar,
  breakoutOuterGutterVar,
  containerGridColumnsVar,
  containerOuterGutterVar,
  containerWidthVar,
  gridColumnBackgroundVar,
  gridColumnsVar,
  innerGutterVar,
  outerGutterVar,
  scrollbarVisibleWidthVar,
} from "./vars";

export type { CSSRuleObject, CSSVarFunction };
export {
  assignCSSVar,
  breakoutContainerOuterGutterVar,
  breakoutOuterGutterVar,
  containerGridColumnsVar,
  containerOuterGutterVar,
  containerWidthVar,
  createCSSVar,
  fallbackCSSVar,
  getCSSVarName,
  gridColumnBackgroundVar,
  gridColumnsVar,
  innerGutterVar,
  outerGutterVar,
  plugin,
  scrollbarVisibleWidthVar,
};

export default plugin;
