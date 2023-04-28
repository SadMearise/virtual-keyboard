module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'eslint-config-airbnb-base',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        '@babel/plugin-syntax-import-assertions',
      ],
    },
  },
};
