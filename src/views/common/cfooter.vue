<template>
    <footer class="" :style="{'height': footerHeight}"></footer>
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
        this.baseParams = utils.getStore('baseParams')
        if (this.baseParams.isIphoneX) {
            this.footerHeight = (Number(37) / 100) + 'rem'
        }
    }
}
</script>

<style lang="less" scoped>
</style>
