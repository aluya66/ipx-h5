<template>
  <van-nav-bar
    :class="bem()"
    :fixed="fixed"
    :title="curTitle"
    :left-text="leftText"
    :right-text="rightText"
    :left-arrow="leftArrow"
    @click-left="onClickLeft"
    :border="showBorderBottom"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div slot="left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div slot="right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
  </van-nav-bar>
</template>

<script>
import create from 'utils/create'
import { NavBar } from 'vant'

export default create({
  name: 'header',
  inheritAttrs: false,
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    leftText: {
      type: String,
      default: '返回'
    },
    rightText: {
      type: String,
      default: ''
    },
    leftArrow: {
      type: Boolean,
      default: true
    },
    showBorderBottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    curTitle () {
      if (this.$route.meta) {
        const { title } = this.$route.meta
        if (title) {
          return this.translate(title, 'route')
        }
      }
      return this.title
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
})
</script>

<style lang="less">
.c-header {
  margin-bottom: @base;
}
</style>
