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
            utils.setStore('isHide', baseParams.isHide)
            let routePath = window.globalVue.$route.path
            window.globalVue.$bus.$emit('tokenCallBack', routePath)
        }
        // 解决IOS不支持:active的问题
        document.body.addEventListener('touchstart', function() {})
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
                'token': 'wVf38L5wlY02Ab6zQhzuVnIMfjmm3FyaSAmSNKccqCHFlCAGx+S7rLNfKx4rE9FiR2XT9CQwpSa+WcQkSq9b5mlTDZrWIB1M4oYbYXl0BoBtWxcN2UX6+PEctO96HyAl4Mm5QBf/2fMrLH//nUVcvIe8iEsSYNnfIVaudh6PyYYCGrGXgA+SQ1IxOX3jZECK0mdOauI3Rp3Pv2G4fkBp8TW9zl/UIKDbcRi7r7JCOLlv9o7b5p4TsD7HSZULnEaMm9HhXpVXonSlO/UJCTbCnX6lbS294mi4iLMspi/U7o7A7OmaPDXGJBLJXNOr+1kJie4gSISlCIcaclWol1ysgZopf0aCZ3Y6+tmY0rc8iSN7MfngN8bfloTw2UqEOyydGEIU7gWe7dtnxAmb1ZlfnZr436VSLHGy4Blc0tJ2TEdVABUYTdTmv2wKO4QvO0Ge3a+5qcd/nBDVdNOygLcZbjnguDVBy0HBUpyZ32tfYwkUjXuW1E4HTUuyNiplFt5PZ85XiMNRlo0LZijnZ2IBpIiv1QjqlB2VKKrn+rGmPrAFHB4U9QIHbo3NzyphJq6szh2SZhg99kr5x/KFwiu98fqm/BM3X4vEiufli/Ix6k6MkzZVswSctZsGHe9NMa/YOy+BIDNSuVySHuLXnnX/Rw==',
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
            utils.setStore('isHide', Number(this.baseParams.isHide))
        }
    }
}

</script>
<style lang='less'>
@import "~themes/styles/base.less";
</style>
