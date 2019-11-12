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
    :style="{'padding-top': paddingTop}"
  >
    <div slot="left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div slot="title" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div slot="right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
  </van-nav-bar>
</template>

<script>
import create from 'utils/create'
import { NavBar } from 'vant'
import utils from 'utils'

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
      default: ''
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
    },
    pageOutStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      baseParams: {},
      paddingTop: 0
    }
  },
  activated () {
    this.baseParams = utils.getStore('baseParams')
    // this.baseParams.statusBarHeight = 44;
    let statusBarHeight = Number(this.baseParams.statusBarHeight) / 100
    if (this.baseParams.platform === 'ios') {
      if (Number(this.baseParams.statusBarHeight) > 20) {
        // this.paddingTop = (Number(statusBarHeight) - Number(0.2))   + 'rem'
        // alert(this.paddingTop)
      }
    } else {
      this.paddingTop = statusBarHeight + 'rem'
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
  mounted () {
  },
  methods: {
    onClickLeft () {
      let method = 'page_out'
      if (this.pageOutStatus) {
        utils.postMessage(method, '')
      } else {
        this.$router.go(-1)
      }
    }
  }
})
</script>

<style lang="less">
.c-header {
  height: auto;
  margin-bottom: @f1;
  .van-nav-bar__title {
    font-size: 18px;
    font-weight: 600;
    color: #2a2b33;
    height: 46px;
    line-height: 46px;
  }
}

.van-icon-arrow-left {
  width: @f26;
  height: @f26;
  background: url("../../themes/images/icon_nav_gray1_def.png");
  .background-common(@f26);
  &.van-icon-arrow-left:before {
    content: "";
  }
}
</style>
