module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/no-multiple-template-root': 'off',
  },
  globals: {
    defineNuxtConfig: true,
    ref: true,
    $fetch: true,
  },
}
