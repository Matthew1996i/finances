module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended'],
  plugins: ['airbnb-base', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    camelcase: 'off',
    'global-require': 0,
    'no-dynamic-require': 0,
    'import/no-dynamic-require': 0,
  },
};
