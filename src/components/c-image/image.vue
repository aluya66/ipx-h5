<template>
  <van-image
    :lazy-load="isLazy"
    :class="bem()"
    :src="posterUrl"
    :fit="fit"
    :round="round"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:loading>
      <van-loading type="spinner" size="60"/>
    </template>
    <template v-slot:error>加载失败</template>
  </van-image>
</template>

<script>
import create from 'utils/create'
import { Image, Lazyload, Loading } from 'vant'

export default create({
  name: 'image',
  inheritAttrs: false,
  components: {
    [Image.name]: Image,
    [Lazyload.name]: Lazyload,
    [Loading.name]: Loading
  },
  props: {
    posterUrl: {
      type: String,
      default: ''
    },
    fit: {
      type: String,
      default: 'contain'
    },
    round: {
      type: Boolean,
      default: false
    },
    isLazy: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="less">
.c-image{
  width:100px;
  height: 100px;
}
</style>
