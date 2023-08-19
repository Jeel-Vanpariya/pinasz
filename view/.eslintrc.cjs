/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  parser: "vue-eslint-parser",
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-strongly-recommended",
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  rules: {}
}
