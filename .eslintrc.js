module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 不检查分号
    "no-extra-semi": [0],
    // 缩进2或4个空格
    "indent": [2,4],
    // function的参数前加空格
    "space-before-function-paren": [0]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
