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

      // let testData = {
      //   token: 'wVf38L5wlY02Ab6zQhzuVnIMfjmm3FyaSAmSNKccqCHFlCAGx+S7rLNfKx4rE9FiR2XT9CQwpSa+WcQkSq9b5mlTDZrWIB1M4oYbYXl0BoBtWxcN2UX6+PEctO96HyAlznt23QZHFaNBjnwvWNZ7K24Q+aOdWUBDYPg862IwoZnhcSSXNL0Ap+sjyadjGE6LN4aY5ctv7L0RdGvFcEDCCiZzcFKnsRqyxsZtLjReobjtzHZMqES7mYfq0KS5N6T4DCJ1g7s774oLZijnZ2IBpDjbe4k89V0bK1FvZlCW+QIFHB4U9QIHbi2GTwDkubm7bUXpCSeJK8F5LFfhub8nrJmYk0t5CIFlIf2E92+22cOwnqn/eP4iDLQIAkvu1pi4Ec9bC9EuTSo61kZqFQUM7AGh5WGVx2FV',
      //   channel: 'WEB',
      //   app_id: '2B14A4DB674013075FCBE4D1AF1F607B7E215C04A9984CC84B0792D6F1E6F6D4',
      //   app_version: '1.2.0',
      //   platform: 'android',
      //   device_id: '12A4C7D7664C4F9370BE1853D0E13CBEE3296EE3',
      //   mobile_model: 'ELE-AL00',
      //   os_version: '9',
      //   lat: '100.156161',
      //   lng: '100.156161',
      //   phoneNumber: '18681587662'
      // }

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
        this.baseParams.statusBarHeight = statusBarHeight ? statusBarHeight[1] : 0
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
