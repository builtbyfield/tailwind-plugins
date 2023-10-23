import type { ClassNameDefinition } from "./types";

/**
 * The classes we want to generate, along with some information to help fill out
 * the CSS calc
 */
export const classNames: ClassNameDefinition[] = [
  {
    name: "w",
    suffix: "-cols",
    attribute: "width",
    addMarginLeft: true,
  },
  {
    name: "mr",
    suffix: "-cols",
    attribute: "margin-right",
    addGutter: true,
  },
  {
    name: "ml",
    suffix: "-cols",
    attribute: "margin-left",
    addGutter: true,
  },
  {
    name: "mx",
    suffix: "-cols",
    attribute: ["margin-right", "margin-left"],
    addGutter: true,
  },
  {
    name: "-mr",
    suffix: "-cols",
    attribute: "margin-right",
    inverse: true,
    addGutter: true,
  },
  {
    name: "-ml",
    suffix: "-cols",
    attribute: "margin-left",
    inverse: true,
    addGutter: true,
  },
  {
    name: "-mx",
    suffix: "-cols",
    attribute: ["margin-right", "margin-left"],
    inverse: true,
    addGutter: true,
  },
  {
    name: "mr",
    suffix: "-cols-no-gutter",
    attribute: "margin-right",
  },
  {
    name: "ml",
    suffix: "-cols-no-gutter",
    attribute: "margin-left",
    accountForContainerMarginLeft: true,
  },
  {
    name: "mx",
    suffix: "-cols-no-gutter",
    attribute: ["margin-right", "margin-left"],
  },
  {
    name: "-mr",
    suffix: "-cols-no-gutter",
    attribute: "margin-right",
    inverse: true,
  },
  {
    name: "-ml",
    suffix: "-cols-no-gutter",
    attribute: "margin-left",
    inverse: true,
  },
  {
    name: "-mx",
    suffix: "-cols-no-gutter",
    attribute: ["margin-right", "margin-left"],
    inverse: true,
  },
  {
    name: "pr",
    suffix: "-cols",
    attribute: "padding-right",
    addGutter: true,
  },
  {
    name: "pl",
    suffix: "-cols",
    attribute: "padding-left",
    addGutter: true,
  },
  {
    name: "px",
    suffix: "-cols",
    attribute: ["padding-right", "padding-left"],
    addGutter: true,
  },
  {
    name: "pr",
    suffix: "-cols-no-gutter",
    attribute: "padding-right",
  },
  {
    name: "pl",
    suffix: "-cols-no-gutter",
    attribute: "padding-left",
  },
  {
    name: "px",
    suffix: "-cols-no-gutter",
    attribute: ["padding-right", "padding-left"],
  },
  {
    name: "left",
    suffix: "-cols",
    attribute: "left",
    addGutter: true,
  },
  {
    name: "right",
    suffix: "-cols",
    attribute: "right",
    addGutter: true,
  },
  {
    name: "inset-x",
    suffix: "-cols",
    attribute: ["right", "left"],
    addGutter: true,
  },
  {
    name: "left",
    suffix: "-cols-no-gutter",
    attribute: "left",
  },
  {
    name: "right",
    suffix: "-cols-no-gutter",
    attribute: "right",
  },
  {
    name: "inset-x",
    suffix: "-cols-no-gutter",
    attribute: ["right", "left"],
  },
  {
    name: "-left",
    suffix: "-cols",
    attribute: "left",
    addGutter: true,
    inverse: true,
  },
  {
    name: "-right",
    suffix: "-cols",
    attribute: "right",
    addGutter: true,
    inverse: true,
  },
  {
    name: "-inset-x",
    suffix: "-cols",
    attribute: ["right", "left"],
    addGutter: true,
    inverse: true,
  },
  {
    name: "-left",
    suffix: "-cols-no-gutter",
    attribute: "left",
    inverse: true,
  },
  {
    name: "-right",
    suffix: "-cols-no-gutter",
    attribute: "right",
    inverse: true,
  },
  {
    name: "-inset-x",
    suffix: "-cols-no-gutter",
    attribute: ["right", "left"],
    inverse: true,
  },
];
