<template>
  <layout-view>
    <c-header slot="header" :left-arrow="false">
      <template v-slot:left>
        <span>首页</span>
      </template>
    </c-header>
    <c-tabs :tabs="tabs" @change="changeActive"></c-tabs>
    <c-search placeholder="搜索产品款号/名称" @search="onSearch" @clear="onCancel">
      <template v-slot:other>
        <c-svg class-name="icon-scan" name="scan"></c-svg>
      </template>
    </c-search>
    <goods-list :searchObj="searchObj" :type="curType"></goods-list>
  </layout-view>
</template>

<script>
import GoodsList from '../goods/list.vue'
import components from 'components'
const { CTabs, CSvg } = components

export default {
  components: {
    GoodsList,
    CTabs,
    CSvg
  },
  data () {
    return {
      searchObj: {
        search: ''
      },
      tabs: [{
        name: 1,
        title: '出售中',
        num: 0
      }, {
        name: 2,
        title: '仓库中',
        num: 0
      }],
      curType: 1
    }
  },
  watch: {
    $route (val) {
      if (val.name === 'goods') {
        this.getGoodsCounts()
      }
    }
  },
  created () {
    this.getGoodsCounts()
  },
  methods: {
    getGoodsCounts (opt) {
      const params = {
        shop_id: 44
      }
      this.$api.goods.getCounts(params).then(res => {
        this.$set(this.tabs[0], 'num', res.up)
        this.$set(this.tabs[1], 'num', res.down)
      })
    },
    changeActive (val) {
      this.curType = val
    },
    onSearch (val) {
      this.$set(this.searchObj, 'search', val)
    },
    onCancel (val) {
      this.$set(this.searchObj, 'search', '')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
