import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.js", "**/*.mjs"],
    rules: {
      // Adjustments for JavaScript files
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
