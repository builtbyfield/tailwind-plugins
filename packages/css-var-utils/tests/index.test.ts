import { expect, test } from "vitest";

import {
  assignCSSVar,
  createCSSVar,
  fallbackCSSVar,
  getCSSVarName,
} from "../src";

test("createCSSVar", () => {
  const fooVar = createCSSVar("foo");
  expect(fooVar).toBe("var(--foo)");
});

test("fallbackCSSVar", () => {
  const fooVar = createCSSVar("foo");
  const fallback = fallbackCSSVar(fooVar, "baz");
  expect(fallback).toBe("var(--foo, baz)");
});

test("fallbackCSSVar with CSS variable", () => {
  const fooVar = createCSSVar("foo");
  const bazVar = createCSSVar("baz");
  const fallback = fallbackCSSVar(fooVar, bazVar);
  expect(fallback).toBe("var(--foo, var(--baz))");
});

test("fallbackCSSVar with multiple fallbacks", () => {
  const fooVar = createCSSVar("foo");
  const bazVar = createCSSVar("baz");
  const fallback = fallbackCSSVar(fooVar, bazVar, "12");
  expect(fallback).toBe("var(--foo, var(--baz, 12))");
});

test("getCSSVarName", () => {
  const fooVar = createCSSVar("foo");
  const fooVarName = getCSSVarName(fooVar);
  expect(fooVarName).toBe("--foo");
});

test("assignCSSVar", () => {
  const fooVar = createCSSVar("foo");
  expect(assignCSSVar(fooVar, "baz")).toMatchObject({ "--foo": "baz" });
});
