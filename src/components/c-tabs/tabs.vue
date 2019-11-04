<template>
  <van-tabs :class="bem()" :border="showBorder" v-bind="$attrs" v-on="$listeners">
    <van-tab
      v-for="(item, index) in tabs"
      :key="index"
      :title="setTitle(item)"
      :name="item.name"
      :disabled="item.disabled"
    >{{item.value}}</van-tab>
  </van-tabs>
</template>

<script>
import create from 'utils/create'
import { Tab, Tabs } from 'vant'

export default create({
  name: 'tabs',
  inheritAttrs: false,
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    showBorder: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setTitle (item) {
      return item.num ? `${item.title}(${item.num})` : item.title
    }
  }
})
</script>

<style lang="less">
.c-tabs {
}
</style>
