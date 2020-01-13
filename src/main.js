/* eslint-disable import/extensions */
import Vue from 'vue'
import VueRouter from 'vue-router'
import importI18n from './plugins/i18n'
import registerComponent from './utils/libs/registerComponent'
import Layout from './layout'

import route from './routes'
// 需要用到vuex时，打开
import store from './store'
// 添加全局提示框
import { Toast } from 'vant'
// 入口文件
import App from './App.vue'
// 将接口挂载vue上，全局使用
import serviceApi from 'api'
// 通过iconfont使用svg时，打开此项
// import './themes/default/font/iconfont'

// 将utils挂载vue上,全局使用
import globalUtils from 'utils'

// 加入公共的全局methods方法
import mixin from './views/mixins'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

window.sa = require('sa-sdk-javascript')
window.sa.init({
    server_url: 'https://sensorsdatauploading.yosar.com/sa?project=default',
    // production
    // 如果神策代码中 `sensorsdata.min.js` 版本是 1.13.1 及以前版本，必须须配置 heatmap_url，高于此版本不需要配置。heatmap_url 神策分析中点击分析及触达分析功能代码，代码生成工具会自动生成。
    heatmap_url: '../utils/heatmap.min.js',
    // 如果神策后台版本及 `sensorsdata.min.js` 均是 1.10 及以上版本，这个参数不需要配置 web_url。 web_url 神策分析中点击分析及触达分析功能会用到此地址，代码生成工具会自动生成。
    web_url: 'https://sensorsdataadmin.yosar.com',
    use_app_track: true,
    is_track_single_page: true,
    heatmap: {
        clickmap: 'default',
        scroll_notice_map: 'default',
        scroll_delay_time: 4000
    }
})
window.sa.quick('autoTrack', {
    Platform: 'H5'
})

Vue.use(preview)

Vue.mixin(mixin)

Vue.use(VueRouter)
Vue.use(Layout)
Vue.config.productionTip = false
// 全局注册自定义组件
registerComponent(Vue)

const eventBus = new Vue()
// 国际化支持
const i18n = importI18n(Vue)

const globalVue = new Vue({
    el: '#app',
    i18n,
    store, // 需要用到vuex时打开
    router: route(VueRouter),
    render: h => h(App),
    beforeCreate () {
        Vue.prototype.$bus = eventBus
        Vue.prototype.$api = serviceApi
        Vue.prototype.$toast = Toast
        Vue.prototype.$utils = globalUtils
        Vue.prototype.$defaultImg = require('images/img_default_photo.png')
        Vue.prototype.$staticFile =
      process.env.NODE_ENV === 'production'
          ? `${process.env.VUE_APP_BASEURLPATH}${process.env.VUE_APP_STATICFILE}`
          : process.env.VUE_APP_STATICFILE
    }
})
window.globalVue = globalVue
