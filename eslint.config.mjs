import standard from "eslint-config-standard";
import globals from "globals";
import typescript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";

export default [
    // ...standard,

    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: "./tsconfig.json",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        plugins: {
            "@typescript-eslint": typescript,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            import: importPlugin,
            n: nPlugin,
            promise: promisePlugin,
        },

        settings: {
            react: {
                version: "detect",
            },
            "import/resolver": {
                typescript: {},
            },
        },

        rules: {
            // Override standard config rules
            quotes: ["error", "double"],
            semi: ["error", "always"],
            "linebreak-style": ["error", "unix"],
            curly: 2,
            eqeqeq: 2,
            "jsx-quotes": ["error", "prefer-double"],
            "no-var": 2,
            "no-console": 2,

            // React Hooks rules
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            // TypeScript specific rules
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
        },

        files: ["**/*.ts", "**/*.tsx"],
        ignores: ["node_modules/**", "dist/**", "build/**"],
    },
];
