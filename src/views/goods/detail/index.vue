<template>
  <layout-view>
    <c-header slot="header"></c-header>
    <c-tabs :tabs="tabs" @change="changeActive"></c-tabs>
    <component :is="curType"></component>
  </layout-view>
</template>

<script>
import components from 'components'
const { CTabs, CHeader } = components

import Detail from './detail.vue'
import Statistics from './statistics.vue'
import Visitor from './visitor.vue'

export default {
  data () {
    return {
      tabs: [{
        name: 'statistics',
        title: '数据统计'
      }, {
        name: 'visitor',
        title: '访客'
      }, {
        name: 'detail',
        title: '货品详情'
      }],
      curType: 'statistics'
    }
  },

  methods: {
    changeActive (val) {
      this.curType = val
    },
  },

  components: {
    CHeader,
    CTabs,
    Detail,
    Statistics,
    Visitor
  }
}
</script>

<style lang='less'>
</style>
