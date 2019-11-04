import VueI18n from 'vue-i18n'

import utils from 'utils'
import messages from './lang'

export default (Vue) => {
  Vue.use(VueI18n)
  const i18n = new VueI18n({
    locale: utils.getCurrentUserLanguage(),
    messages
  })

  if (module.hot) {
    module.hot.accept(['./lang/index.js'], () => {
      const newMessages = require('./lang').default
      Object.keys(newMessages).forEach((locale) => {
        i18n.setLocaleMessage(locale, newMessages[locale])
      })
    })
  }

  return i18n
}
