<template>
  <div :class="bem()">
    <van-search
      :class="bem('search')"
      v-model="value"
      :background="bgColor"
      :show-action="rightAction"
      :placeholder="placeholder"
      :shape="shape"
      :action-text="rightActionText"
      v-bind="$attrs"
      v-on="$listeners"
    ></van-search>
    <div :class="bem('other')" v-if="$slots.other">
      <slot name="other"></slot>
    </div>
  </div>
</template>

<script>
import { Search } from 'vant'
import create from 'utils/create'

export default create({
  name: 'search',
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索关键词'
    },
    shape: {
      type: String,
      default: 'square'
    },
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    rightAction: {
      type: Boolean,
      default: false
    },
    rightActionText: {
      type: String,
      default: '取消'
    }

  },
  data () {
    return {
      value: ''
    }
  },

  components: {
    [Search.name]: Search
  }
})
</script>

<style lang='less'>
.c-search {
  display: flex;
  &__search {
    flex: 1
  }
  &__other {
    .padding-size(@sm, @sm, @xs, 0);
    background-color: @white;
    line-height: 30px;
  }
}
</style>
