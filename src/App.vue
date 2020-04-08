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
        // 接受原生的token回调
        window.getNativeToken = (token, isHide) => {
            let baseParams = utils.getStore('baseParams')
            baseParams.token = token
            baseParams.isHide = isHide | 0
            utils.setStore('baseParams', JSON.stringify(baseParams))
            utils.setStore('token', baseParams.token)
            let routePath = window.globalVue.$route.path
            window.globalVue.$bus.$emit('tokenCallBack', routePath)
        }
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
                'token': 'wVf38L5wlY02Ab6zQhzuVnIMfjmm3FyaSAmSNKccqCHFlCAGx+S7rLNfKx4rE9FiR2XT9CQwpSa+WcQkSq9b5mlTDZrWIB1M4oYbYXl0BoBtWxcN2UX6+PEctO96HyAl4Mm5QBf/2fN1zLbu+OhWd5Z4ipZe8r0+IVaudh6PyYZOcOP7sU5sfVIxOX3jZECK9znhnL4kblv+IueZKTy3raeRPSP1B9lXcRi7r7JCOLkdyp+WIQpNHVKoWRCR5aa06v8z6WJy0zWb0eFelVeidKU79QkJNsKdfqVtLb3iaLib0b+phfeX+if0T/AsN9D9S1CSS3/aFL3bz3JW3XyC72yrCGFdgqZDokPXS1Nfej7I5kYQn3fPrvzr/lwRtUmLXt92aaGKzAT3FJVEHmj02Ji467AUsf8migwtNqwClGOEjS5AV6pz9sVn5vEL9xFvYgH+tV32TqCPdh8akPVw7S2InusmAZK9r4UYtukzSkiz6fxhR1jFyF4cXDY0ZvdmZY60wNx6vRM=',
                'app_version': '1.2.0',
                'platform': 'web',
                'device_id': '12A4C7D7664C4F9370BE1853D0E13CBEE3296EE3',
                'mobile_model': 'ELE-AL00',
                'os_version': '9',
                'lat': '100.156161',
                'lng': '100.156161',
                'statusBarHeight': 20,
                'isIphoneX': false,
                'phoneNumber': '13888888888',
                'isHide': 0
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
