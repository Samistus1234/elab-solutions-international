import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [".next/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
      "react": reactPlugin,
      "react-hooks": hooksPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Start with the recommended rules for each plugin
      ...nextPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      
      // Add Prettier compatibility
      ...prettierConfig.rules,

      // Customize or override rules below
      "react/react-in-jsx-scope": "off", // Not needed with Next.js 17+
      "react/prop-types": "off", // Not needed for TypeScript projects
      "@next/next/no-html-link-for-pages": ["error", "app/"], // Example: Enforce for app router
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
];