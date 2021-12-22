module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'parser': 'babel-eslint',  // Specifies the ESLint parser
  'extends': [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'impliedStrict': true, // enable global strict mode
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'settings': {
    'import/resolver': { // This config is used by eslint-import-resolver-webpack
      webpack: {
        config: './webpack/webpack-common-config.js',
      },
    },
  },
  'plugins': [
    'react',
    'react-hooks',
    'promise',
    'prettier',
  ],
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
  },
}
