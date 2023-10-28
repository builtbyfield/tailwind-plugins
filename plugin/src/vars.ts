import { createCSSVar } from "css-var-utils";

/**
 * Let's define some CSS variables for our plugin!
 *
 * These are the variables that we'll use in our CSS to make our plugin configurable.
 * We define them here and in this way, using these functions, so that we can easily
 * manage them and as a bonus, we get some type safety.
 */
export const containerWidthVar = createCSSVar("container-width");
export const innerGutterVar = createCSSVar("inner-gutter");
export const outerGutterVar = createCSSVar("outer-gutter");
export const gridColumnsVar = createCSSVar("grid-columns");
export const gridColumnBackgroundVar = createCSSVar("grid-column-bg");
export const containerGridColumnsVar = createCSSVar("container-grid-columns");
export const containerOuterGutterVar = createCSSVar("container-outer-gutter");
export const breakoutOuterGutterVar = createCSSVar("breakout-outer-gutter");
export const breakoutContainerOuterGutterVar = createCSSVar(
  "breakout-container-outer-gutter"
);
export const scrollbarVisibleWidthVar = createCSSVar("scrollbar-visible-width");
