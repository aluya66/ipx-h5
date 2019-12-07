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
            // const ua = navigator.userAgent
            const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi) || false

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
                'token': 'wVf38L5wlY02Ab6zQhzuVnIMfjmm3FyaSAmSNKccqCHFlCAGx+S7rLNfKx4rE9FiR2XT9CQwpSa+WcQkSq9b5mlTDZrWIB1M4oYbYXl0BoBtWxcN2UX6+PEctO96HyAlznt23QZHFaMhPJGEeulLELTnP4m8bauuYPg862IwoZnmBMS7110KvrT6gDPS5WEEmdFq3kIlYl0RdGvFcEDCCl6Y2wSxIl7B28bXB8N2cTKH6tCkuTek+J1it9pA7d+LrvyYPEFvEsP3FRU2Zp/2hd+pPLAA/B/ojI9SMfXOI5UdghotWQsVWIjfuuKQFkGOjedkmUdI4diAEdbtrxUlREsM3T4iQI1vxh9irerptrTzridi5DwLdgPovfRBl3D/KeeFthJ9Fn5AzfnlaEYRYVZeszzbUe2SGueHCGAHdicbWNHeW1SreGv57RE/Tt2bA3NJz0JeWZghPJGEeulLEGSSin5LPQm4nLO8cZIIkHlusKsdJZ3XLUVQDMcOWc1XVtu4TWC4TjNM6Za/s1/Ilw==',
                'channel': 'WEB',
                'app_id': '2B14A4DB674013075FCBE4D1AF1F607B7E215C04A9984CC84B0792D6F1E6F6D4',
                'app_version': '1.2.0',
                'platform': 'web',
                'device_id': '12A4C7D7664C4F9370BE1853D0E13CBEE3296EE3',
                'mobile_model': 'ELE-AL00',
                'os_version': '9',
                'lat': '100.156161',
                'lng': '100.156161',
                'statusBarHeight': 20,
                'isIphoneX': false
            }

            let results = {}
            let data = {}
            if (!isIos) {
                data = window.IPX && window.IPX.postMessage(JSON.stringify(params))
                results = JSON.parse(data).results
            } else {
                results = window.nativeInjectData
            }
            this.baseParams = (results && results.data) || testData
            this.baseParams.isIphoneX = this.baseParams.statusBarHeight > 20 && isIos
            utils.setStore('baseParams', JSON.stringify(this.baseParams))
            utils.setStore('token', this.baseParams.token)
        }
    }
}

</script>
<style lang='less'>
@import "~themes/styles/base.less";
</style>
