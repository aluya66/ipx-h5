<template>
  <div class="layout">
    <slot name="header"></slot>
    <div class="layout__content" :id="appId">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  name: 'layout-view',
  props: {
    id: String
  },
  data () {
    return {
      appId: this.id || this.$route.path.replace(/\//g, '_') || new Date().getTime()
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
