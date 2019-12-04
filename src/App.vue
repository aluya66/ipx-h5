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
                'token': 'wVf38L5wlY02Ab6zQhzuVnIMfjmm3FyaSAmSNKccqCHFlCAGx+S7rLNfKx4rE9FiR2XT9CQwpSa+WcQkSq9b5mlTDZrWIB1M4oYbYXl0BoBtWxcN2UX6+PEctO96HyAlznt23QZHFaNQceLH3dxQ2w/kHEszPGyjYPg862IwoZnmBMS7110KvrT6gDPS5WEEmdFq3kIlYl0RdGvFcEDCCreTZZjMURQJP8/YY+2ubUv3p8CpzGfI74fq0KS5N6T4DCJ1g7s774oLZijnZ2IBpDt/P2FVazQI8xsZNtevQQcFHB4U9QIHbhCAEovCfaGjwXnRgN7XA+V6MbvrJ5cZXZLUImuL4Ks8+WwoB42k3BbG0i3LR3Ie/aBuCX9szB5h18eatgN119CbHPZ5hGX3hJrRD6K+7IRf',
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
