import AppContainer from './app-container'
import Layout from './layout'

const install = function (Vue) {
  Vue.component(AppContainer.name, AppContainer)
  Vue.component(Layout.name, Layout)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
