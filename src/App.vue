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
        window.getNativeToken = (token) => {
            let baseParams = utils.getStore('baseParams')
            baseParams.token = token
            utils.setStore('baseParams', JSON.stringify(baseParams))
            utils.setStore('token', baseParams.token)
            let routePath = window.globalVue.$route.path
            window.globalVue.$bus.$emit('tokenCallBack', routePath)
        }

        let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi) || false
        if (!isIos) {
            window.addEventListener('resize', () => {
                if (document.activeElement.tagName === 'INPUT') {
                    window.setTimeout(() => {
                        document.activeElement.scrollIntoViewIfNeeded()
                    }, 100)
                }
            })
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
                'token': 'wVf38L5wlY02Ab6zQhzuVnIMfjmm3FyaSAmSNKccqCHFlCAGx+S7rLNfKx4rE9FiR2XT9CQwpSa+WcQkSq9b5mlTDZrWIB1M4oYbYXl0BoBtWxcN2UX6+PEctO96HyAl4Mm5QBf/2fMy4INP2jH2lGPDCTCbeCMRIVaudh6PyYZOcOP7sU5sfVIxOX3jZECK0mdOauI3Rp3Pv2G4fkBp8TW9zl/UIKDbcRi7r7JCOLk+mtgbkTUo4YSC+ImZUQSNknBdbvdf+XD3OEjtKzY7IpvR4V6VV6J0pTv1CQk2wp1+pW0tveJouIizLKYv1O6Osr6WYBeRgpV4jeK9jP/bOijmzOJ48xwjHYeoGxRkQKzodU9bMVP+gqgIG6+56aWeuSYV4JV9RuKc27/H3KB+KDCRMzG2CWX9BtFinj84ch48cLB23AkFQhBWLZ/OwnSPmqmAHmF853oYrP+IIJbkJV/UvaOF0O65MRJjxeidOaUvYBzP52XHrGqmgazfEQCF9vGKvP4Nwzq5QRuHOP++VYC7mn2mLVQ365EVTj8rLcz8S7jjXtebnKHV/Ska7p/4ts3fLi7nqrc=',
                'app_version': '1.2.0',
                'platform': 'web',
                'device_id': '12A4C7D7664C4F9370BE1853D0E13CBEE3296EE3',
                'mobile_model': 'ELE-AL00',
                'os_version': '9',
                'lat': '100.156161',
                'lng': '100.156161',
                'statusBarHeight': 20,
                'isIphoneX': false,
                'phoneNumber': '13888888888'
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
