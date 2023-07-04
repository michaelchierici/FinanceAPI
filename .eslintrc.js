module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "class-methods-use-this": "off",
    camelcase: "off",
    quotes: "off",
    "object-curly-newline": "off",
  },
};
