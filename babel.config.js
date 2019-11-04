module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
  sourceType: 'unambiguous' // 【issues2746】 https://github.com/vuejs/vue-cli/issues/2746
}
