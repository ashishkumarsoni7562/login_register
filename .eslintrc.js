module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint","sort-keys-fix"],
  extends: ["eslint:recommended","plugin:@typescript-eslint/recommended"],
  rules: {
    indent: [
      "error",
      4,
      {
        SwitchCase: 1,
      },
    ],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    // semi: ["error", "always"],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true,
      },
    ],
    "max-nested-callbacks": [
      "error",
      {
        max: 4,
      },
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "const", "next": "*" },
      { "blankLine": "always", "prev": "let", "next": "*" },
      { "blankLine": "always", "prev": "var", "next": "*" },
      { "blankLine": "always", "prev": "*", "next": "return" }
    ],
    "no-var": "error",
    "sort-keys-fix/sort-keys-fix": ["error", "asc", {
      "caseSensitive": false,
      "natural": false
  }],
  'camelcase': ['error', { 'properties': 'always' }],
  '@typescript-eslint/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'semi', // No semicolons between members
      },
      singleline: {
        delimiter: 'semi', // Use semicolons in single-line interfaces
      },
    },
  ],
  'space-infix-ops': ['error', { int32Hint: false }],
  "@typescript-eslint/no-explicit-any": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],
  },
};
