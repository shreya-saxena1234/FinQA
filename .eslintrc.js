module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:import/recommended'],
  overrides: [
    {
      env: {
        node: true,
        es6: true,
        browser: false,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'operator-linebreak': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'warn',
    semi: 'off',
  },
};
