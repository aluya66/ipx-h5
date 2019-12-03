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
            const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi) || false
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
                'token': 'wVf38L5wlY02Ab6zQhzuVnIMfjmm3FyaSAmSNKccqCHFlCAGx+S7rLNfKx4rE9FiR2XT9CQwpSa+WcQkSq9b5mlTDZrWIB1M4oYbYXl0BoBtWxcN2UX6+PEctO96HyAlznt23QZHFaMabPP85P89K5Z4ipZe8r0+IVaudh6PyYaUtcHrDAUtuVIxOX3jZECK0mdOauI3Rp3Pv2G4fkBp8TW9zl/UIKDbcRi7r7JCOLmc01KYccN+/W4fRKmlyjHS2XOJzD4KchKb0eFelVeidKU79QkJNsKdfqVtLb3iaLib0b+phfeX+plgblaIyWybESN6JZ8Ev472q10DfzyS6fC8t/TRTt3YA0WECSY8+eQiwGSNzdOur/2AfLSa8DC+JvO/322eYJup2KLBjk/ey5i467AUsf8mCJ8Xl7nxjvp+f6hcyIuQqy9gHM/nZces3R7SaGijWd/e5J1UCaGRLMRoD5U/OM6EIHr7l3goWYMhnk7vOwozApS+USsV1SrJXDmBFsUXvtr0f2LUcvWxNA==',
                'channel': 'WEB',
                'app_id': '2B14A4DB674013075FCBE4D1AF1F607B7E215C04A9984CC84B0792D6F1E6F6D4',
                'app_version': '1.2.0',
                'platform': 'web',
                'device_id': '12A4C7D7664C4F9370BE1853D0E13CBEE3296EE3',
                'mobile_model': 'ELE-AL00',
                'os_version': '9',
                'lat': '100.156161',
                'lng': '100.156161'
            }

            let results = {}
            let data = {}

            if (!isIos) {
                data = window.IPX.postMessage(JSON.stringify(params))
                results = JSON.parse(data).results
            } else {
                results = window.nativeInjectData
            }
            this.baseParams = (results && results.data) || testData
            this.baseParams.statusBarHeight = statusBarHeight ? statusBarHeight[1] : 20
            this.baseParams.isIphoneX = this.baseParams.statusBarHeight > 20
            utils.setStore('baseParams', JSON.stringify(this.baseParams))
            utils.setStore('token', this.baseParams.token)
        }
    }
}

</script>
<style lang='less'>
@import "~themes/styles/base.less";
</style>
