<template>
  <i :class="[bem(), extIcon ? bem(name) : `iconfont icon-${name}` ]" @click="doEmit"></i>
</template>

<script>
import create from 'utils/create'

export default create({
  name: 'icon',
  props: {
    name: String,
    extIcon: Boolean
  },
  methods: {
    doEmit () {
      this.$emit('click-icon')
    }
  }
})
</script>

<style lang="less">
@import './icon.less';

.icon-small {
    font-size: @f16 !important;
}

.icon-big {
    font-size: @f30 !important;
}

.icon-active {
    color: @active-color;
}

.icon-red {
    color: @red;
}
</style>
