<template>
  <div class="layout" :style="layoutPadding">
    <slot name="header"></slot>
    <div class="layout__content" :id="appId">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
import utils from '../utils'
export default {
  name: 'layout-view',
  props: {
    id: String
  },
  data () {
    return {
      appId: this.id || this.$route.path.replace(/\//g, '_') || new Date().getTime(),
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  computed: {
    layoutPadding () {
      return `padding-top:${this.paddingTop};padding-bottom:${this.paddingBottom}`
    }
  },
  created () {

  },
  activated () {
    let baseParams = utils.getStore('baseParams')
    let statusBarHeight = Number(baseParams.statusBarHeight) / 100

    if (baseParams.platform === 'ios') {
      if (Number(baseParams.statusBarHeight) > 20) {
        this.paddingTop = Number(statusBarHeight) + 'rem'
        // this.paddingBottom = '0.34rem'
      } else {
        this.paddingTop = statusBarHeight + 'rem'
      }
    } else {
      this.paddingTop = statusBarHeight + 'rem'
    }
  }
}
</script>

<style lang="less">
.layout {
  color: @text-title-color;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  &__content {
    width: 100%;
    height: 100%;
    flex: 1;
    // overflow-y: auto;
    // overflow-x: hidden;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }
}
</style>
