/* eslint-disable import/extensions */
import Vue from 'vue'
import VueRouter from 'vue-router'
import importI18n from './plugins/i18n'
import registerComponent from './utils/libs/registerComponent'
import Layout from './layout'

import route from './routes'
// 需要用到vuex时，打开
import store from './store'

// 入口文件
import App from './App.vue'
// 将接口挂载vue上，全局使用
import serviceApi from 'api'
// 通过iconfont使用svg时，打开此项
// import './themes/default/font/iconfont'

// 加入公共的全局methods方法
import mixin from './views/mixins'
Vue.mixin(mixin)

Vue.use(VueRouter)
Vue.use(Layout)
Vue.config.productionTip = false

// 全局注册自定义组件
registerComponent(Vue)

// 国际化支持
const i18n = importI18n(Vue)

const globalVue = new Vue({
  el: '#app',
  i18n,
  store, // 需要用到vuex时打开
  router: route(VueRouter),
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$api = serviceApi
    Vue.prototype.$defaultImg = require('images/img_default_photo.png')
    Vue.prototype.$staticFile =
      process.env.NODE_ENV === 'production'
        ? `${process.env.VUE_APP_BASEURLPATH}${process.env.VUE_APP_STATICFILE}`
        : process.env.VUE_APP_STATICFILE
  }
})

window.globalVue = globalVue
