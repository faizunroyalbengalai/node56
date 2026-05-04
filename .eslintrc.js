module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.js', '**/tests/**'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'consistent-return': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
};