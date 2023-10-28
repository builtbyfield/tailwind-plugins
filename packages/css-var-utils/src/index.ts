import cssesc from "cssesc";

/**
 * Type for a CSS variable / custom property function.
 */
export type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string})`;

/**
 * Creates a CSS variable function.
 * @param name The name of the variable.
 * @returns A CSS variable function.
 *
 * @example
 * createCSSVar("my-var"); // "var(--my-var)"
 */
export function createCSSVar(name: string): CSSVarFunction {
  const cssVarName = cssesc(name);

  return `var(--${cssVarName})` as const;
}

/**
 * Creates a fallback CSS variable function.
 * @param values The values to use for the fallback.
 * @returns A CSS variable function.
 *
 * @example
 * fallbackCSSVar("var(--my-var)", "red", "blue"); // "var(--my-var, red, blue)"
 */
export function fallbackCSSVar(
  ...values: [string, ...Array<string>]
): CSSVarFunction {
  let finalValue = "";

  values.reverse().forEach((value) => {
    if (finalValue === "") {
      finalValue = String(value);
    } else {
      if (typeof value !== "string" || !/^var\(--.*\)$/.test(value)) {
        throw new Error(`Invalid variable name: ${value}`);
      }

      finalValue = value.replace(/\)$/, `, ${finalValue})`);
    }
  });

  return finalValue as CSSVarFunction;
}

/**
 * Returns the variable name from a CSS variable function.
 * @param variable The CSS variable function.
 * @returns The variable name.
 *
 * @example
 * getCSSVarName("var(--my-var)"); // "--my-var"
 */
export function getCSSVarName(variable: string) {
  const matches = variable.match(/^var\((.*)\)$/);

  if (matches) {
    return matches[1];
  }

  return variable;
}

/**
 * Assigns a value to a CSS variable.
 * @param variable The CSS variable function.
 * @param value The value to assign.
 * @returns An object with the CSS variable function as the key and the value as the value.
 *
 * @example
 * assignCSSVar(createVar("my-var"), "red");
 */
export function assignCSSVar(
  variable: CSSVarFunction,
  value: string | number
): Record<string, string> {
  const varName = getCSSVarName(variable);
  /**
   * Setting the value to a string is important for storing number values as
   * strings, otherwise numbers can be converted to pixel values.
   */
  const varValue = String(value);

  return {
    [varName]: varValue,
  };
}
