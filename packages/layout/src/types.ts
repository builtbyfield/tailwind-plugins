import type * as CSS from "csstype";

interface RecursiveKeyValuePair<K extends keyof never = string, V = string> {
  [key: string]: V | RecursiveKeyValuePair<K, V>;
}

/**
 * This represents a Tailwind CSS rule object. It matches the `CSSRuleObject` type
 * in the Tailwind CSS source code.
 */
export type TailwindCSSRuleObject = RecursiveKeyValuePair<
  string,
  null | string | string[]
>;

/**
 * This represents a CSS rule object. It is more robust than
 * `TailwindCSSRuleObject` because it checks for valid CSS properties.
 */
export type CSSRuleObject = RecursiveKeyValuePair<string, CSS.Properties>;

/**
 * Type for a CSS variable / custom property function.
 */
export type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string})`;

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
