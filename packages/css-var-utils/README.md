# CSS Variable Utilities

A collection of utilities for working with CSS variables in TypeScript.

## Functions

### `createCSSVar`

Creates a CSS variable string from a CSS variable name. This is useful for
creating CSS variable strings that can be used in TypeScript code.

#### `createCSSVar` Parameters

| Type     | Description               |
| -------- | ------------------------- |
| `string` | The name of the variable. |

#### `createCSSVar` Example

```ts
import { createCSSVar } from "css-var-utils";

const colsCountVar = createCSSVar("cols-count");
// -> 'var(--cols-count)'
```

### `fallbackCSSVar`

Takes a CSS variable as the first argument and any subsequent arguments are
used as fallback values. This is useful for creating CSS variable strings that
can be used in TypeScript code.

#### `fallbackCSSVar` Parameters

| Type                         | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `[string, ...Array<string>]` | The values to use for the variable and it's fallback values. |

#### `fallbackCSSVar` Example

```ts
import { createCSSVar, fallbackCSSVar } from "css-var-utils";

const colsCountVar = createCSSVar("cols-count");
// -> 'var(--cols-count)'

const colsCountWithFallbackVar = fallbackCSSVar(colsCountVar, "12");
// -> 'var(--cols-count, 12)'
```

### `getCSSVarName`

Returns the variable name from a CSS variable function.

#### `getCSSVarName` Parameters

| Type     | Description                |
| -------- | -------------------------- |
| `string` | The CSS variable function. |

#### `getCSSVarName` Example

```ts
import { createCSSVar, getCSSVarName } from "css-var-utils";

const colsCountVar = createCSSVar("cols-count");
// -> 'var(--cols-count)'

const colsCountName = getCSSVarName(colsCountVar);
// -> --cols-count
```

### `assignCSSVar`

Assigns a value to a CSS variable. Makes applying a CSS variable value to an
element easier.

It turns numbers into strings using `String()` to avoid most
systems from adding pixel units to the value. So `12` becomes `"12"` instead.
This makes applying values and getting an expected result more straightforward
and is our preference.

#### `assignCSSVar` Parameters

| Type               | Description                |
| ------------------ | -------------------------- |
| `string`           | The CSS variable function. |
| `string \| number` | The value to assign.       |

#### `assignCSSVar` Example

```ts
import { createCSSVar, assignCSSVar } from "css-var-utils";

const colsCountVar = createCSSVar("cols-count");
// -> 'var(--cols-count)'

const assignedVar = assignCSSVar(colsCountVar, 12);
// -> --cols-count: 12;
```

## Types

### `CSSVarFunction`

Type for a CSS variable / custom property function.

`var(--${string})` | `var(--${string}, ${string})`
