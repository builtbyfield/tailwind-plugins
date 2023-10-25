import { defineConfig } from "tsup";

const env = process.env.NODE_ENV;
const isProd = env === "production";

export default defineConfig({
  splitting: true,
  clean: true, // clean up the dist folder
  dts: true, // generate dts files
  format: ["cjs", "esm"], // generate cjs and esm files
  minify: isProd,
  bundle: isProd,
  skipNodeModulesBundle: true,
  watch: env === "development",
  target: "es2020",
  outDir: "dist",
  entry: ["src/index.ts"], //include all files under src
});
