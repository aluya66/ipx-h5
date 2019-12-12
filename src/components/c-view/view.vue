<template>
  <div :class="bem()">
    <slot></slot>
  </div>
</template>

<script>
import create from 'utils/create'

export default create({
  name: 'view'
})
</script>

<style lang="less">
.c-view {
  position: relative;
  background-size: 100% 100%;
  color: @text-title-color;
  height: 100vh;
}
</style>
