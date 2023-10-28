import type * as CSS from "csstype";
import type {
  KeyValuePair,
  RecursiveKeyValuePair,
} from "tailwindcss/types/config";

/**
 * This represents a CSS rule object. It is more robust than Tailwind's
 * `CSSRuleObject` because it checks for valid CSS properties.
 */
export type CSSRuleObject = RecursiveKeyValuePair<string, CSS.Properties>;

export type Fraction = `${number}/${number}`;

export type ClassNameDefinition = {
  name: string;
  suffix: string;
  attribute: string | string[];
  inverse?: boolean;
  addMarginLeft?: boolean;
  addGutter?: boolean;
  accountForContainerMarginLeft?: boolean;
};

export type ContainerWidthsThemeOption = string | KeyValuePair;
export type ColumnCountsThemeOption = string | KeyValuePair;
export type InnerGuttersThemeOption = string | KeyValuePair;
export type OuterGuttersThemeOption = string | KeyValuePair;
