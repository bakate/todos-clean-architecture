import antfu from "@antfu/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";

export default antfu({
  type: "app",
  react: true,
  typescript: true,

  lessOpinionated: true,
  isInEditor: false,

  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
  formatters: true,

  ignores: [
    "migrations/**/*",
    "next-env.d.ts",
  ],
}, {
  plugins: {
    "@next/next": nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
  },
}, {
  files: [
    "/**/*.ts?(x)",
  ],
}, {
  files: [
    "/tests/**/*.(test|spec).ts?(x)",
    "**/*.(spec|e2e).ts",
  ],
}, {
  rules: {
    "style/brace-style": ["error", "1tbs"], // Use the default brace style
    "react/prefer-destructuring-assignment": "off", // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
    "test/padding-around-all": "error", // Add padding in test files
    "test/prefer-lowercase-title": "off", // Allow using uppercase titles in test titles

    "ts/no-redeclare": "off", // Allow redeclaring variables
    "ts/consistent-type-definitions": ["error", "type"], // Use `type` instead of `interface`
    "no-console": ["warn"], // Allow console
    "antfu/no-top-level-await": ["off"], // Allow top-level await
    "node/prefer-global/process": ["off"], // Allow using `process.env`
    "node/no-process-env": ["off"], // Disallow `process.env`
    "perfectionist/sort-imports": [
      "error",
      {
        tsconfigRootDir: ".", // Use the root directory of the tsconfig
      },
    ],

    "unicorn/filename-case": [
      "off",
      {
        case: "kebabCase", // Use kebab-case for filenames like 'my-file.ts'
        ignore: ["README.md"],
      },
    ],
  },
});
