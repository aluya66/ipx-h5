<template>
  <app-container id="app" :keepAlive="true"></app-container>
</template>
<script>
import utils from 'utils'
export default {
  name: 'c-app',
  data () {
    return {
      baseParams: {}
    }
  },
  created () {
    this.getBaseCofing()
  },
  methods: {
    // 获取配置参数
    getBaseCofing () {
      this.baseParams = this.$route.query

      const ua = navigator.userAgent
      const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
      const statusBarHeight = ua.match(/statusBarHeight\/(\d{2})/i)

      let params = {
        success: true,
        message: '',
        code: 0,
        method: 'app_info',
        data: {},
        uiData: '',
        callBack: 'javascript:baseCofing'
      }

      let testData = {
        token: 'wVf38L5wlY02Ab6zQhzuVnIMfjmm3FyaSAmSNKccqCHFlCAGx+S7rLNfKx4rE9FiR2XT9CQwpSa+WcQkSq9b5mlTDZrWIB1M4oYbYXl0BoBtWxcN2UX6+PEctO96HyAlznt23QZHFaO/bpC2m5+aHxysW4D3sfo7YPg862IwoZm3WL6uAdjs4vP7finKFoc9BpX3OeZ8mk0RdGvFcEDCCreTZZjMURQJDpcax5wVlYnace3ohCYChofq0KS5N6T4DCJ1g7s774oLZijnZ2IBpABU/vxb3OmQ4iksLk64HGcFHB4U9QIHbp7oIViNtJhUbUXpCSeJK8HIggz+pe7Xq/26Zzg/zsHPBpUDYUd7JhvxB/7u0g33wIv8oZ0Wg74RzrDlNovQToLdg8d+6oZg5CkjaClRghSS222',
        channel: 'WEB',
        app_id: '2B14A4DB674013075FCBE4D1AF1F607B7E215C04A9984CC84B0792D6F1E6F6D4',
        app_version: '1.2.0',
        platform: 'android',
        device_id: '12A4C7D7664C4F9370BE1853D0E13CBEE3296EE3',
        mobile_model: 'ELE-AL00',
        os_version: '9',
        lat: '100.156161',
        lng: '100.156161'
      }

      let results = {}
      let data = {}
      if (statusBarHeight) {
        if (!isIos) {
          data = window.IPX.postMessage(JSON.stringify(params))
          // alert(JSON.stringify(data))
          results = JSON.parse(data).results
        } else {
          results = window.nativeInjectData
        }
      }

      // this.baseParams = testData
      // this.baseParams.statusBarHeight = statusBarHeight ? statusBarHeight[1] : 24
      // utils.setStore('baseParams', JSON.stringify(this.baseParams) || {})
      // utils.setStore('token', this.baseParams.token || '')
      if (results) {
        this.baseParams = results.data || testData
        this.baseParams.statusBarHeight = statusBarHeight ? statusBarHeight[1] : 24
        utils.setStore('baseParams', JSON.stringify(this.baseParams) || {})
        utils.setStore('token', this.baseParams.token || '')
      }
    }
  }
}
</script>
<style lang='less'>
@import "~themes/styles/base.less";
</style>
