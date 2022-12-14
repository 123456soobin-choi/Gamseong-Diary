module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'prettier',

    // "plugin:vue/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'import'],
  rules: {
    'no-param-reassign': 0,
    'no-alert': ['off'],
    'no-console': ['off'],
    'react/function-component-definition': [2, { namedcomponents: 'arrow-function' }],
    'react/jsx-curly-brace-presence': [1, { props: 'never', children: 'never' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
  },
};
