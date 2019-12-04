<template>
  <van-nav-bar
    :class='bem()'
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
    <div :style='themeLight' slot="title" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div class="c-header-right" slot="right" v-if="$slots.right">
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
        isLight: {
            type: Boolean,
            default: true
        },
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
        },
        themeLight () {
            if (this.isLight) {
                return 'color:#2a2b33'
            }
            return 'color:#fff'
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
        height: 44px;
        line-height: 44px;
        .title_light {
            color: @color-c1;
        }
        .title_dart {
            color: #fff
        }
    }

}

.c-header-right {
    p {
        margin: 0
    }
}
.c-header-white{
  .van-icon-arrow-left {
    // background: url("../../themes/images/app/icon_next20_white1@3x.png");
    background: url("../../themes/images/app/icon_nav_back_white@3x.png");
    .background-common(@f26);
  }
}

.van-icon-arrow-left {
  width: @f26;
  height: @f26;
  // background: url("../../themes/images/icon_nav_gray1_def.png");
  background: url("../../themes/images/app/icon_nav_back1_def@3x.png");
  .background-common(@f26);
  &.van-icon-arrow-left:before {
    content: "";
  }
}
</style>
