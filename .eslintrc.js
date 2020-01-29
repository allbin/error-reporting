module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["tsconfig.json"]
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/camelcase": ["error", { properties: "never" }],
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": "error"
  }
};
