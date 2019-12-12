module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
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
