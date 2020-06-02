<template>
    <div class="footer" :style="{'height': footerHeight}">
        <slot class="footer-contain" name="footerContain">
        </slot>
    </div>
</template>

<script>
import utils from 'utils'
export default {
    data () {
        return {
            footerHeight: 0
        }
    },
    created () {
        let baseParams = utils.getStore('baseParams')
        if (baseParams.isIphoneX) {
            this.footerHeight = (Number(37 + 49) / 100) + 'rem'
        } else {
            this.footerHeight = (Number(49) / 100) + 'rem'
        }
    }
}
</script>

<style lang="less" scoped>
.footer {
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
}
.footer-contain {
    height: 49px;
    width: 100%;
    margin-top: 0;
}
</style>
