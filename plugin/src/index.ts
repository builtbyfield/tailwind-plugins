import { plugin } from "./plugin";
import {
  getScrollBarWidth,
  scrollbarVisibleWidth,
  setScrollBarVisible,
} from "./scrollbar-visible-width";
import type { CSSRuleObject } from "./types";
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

export type { CSSRuleObject };
export {
  breakoutContainerOuterGutterVar,
  breakoutOuterGutterVar,
  containerGridColumnsVar,
  containerOuterGutterVar,
  containerWidthVar,
  getScrollBarWidth,
  gridColumnBackgroundVar,
  gridColumnsVar,
  innerGutterVar,
  outerGutterVar,
  plugin,
  scrollbarVisibleWidth,
  scrollbarVisibleWidthVar,
  setScrollBarVisible,
};

export default plugin;
