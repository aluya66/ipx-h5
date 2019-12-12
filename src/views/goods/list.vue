<template>
  <c-list
    class="goods-list"
    @load-data="getGoodsList"
    :loading="loading"
    :error="error"
    :finished="finished"
  >
    <v-goods-card v-for="(item, index) in listItems" :key="index" :item="item"></v-goods-card>
  </c-list>
</template>

<script>
import VGoodsCard from '../common/goodsCard.vue'
import CList from 'components/c-list'

export default {
  props: {
    searchObj: {
      type: Object,
      default () {
        return {}
      }
    },
    type: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      listItems: [], // 商品列表数据
      pageInfo: {
        page: 1, // 当前页码
        total: 1, // 总页码
        limit: 20 // 每页请求数
      },
      finished: false, // 加载完标识
      loading: false, // 加载更多标识
      error: false // 加载错误标识
    }
  },
  watch: {
    type (val) {
      this.resetParams()
      this.getGoodsList()
    },
    searchObj: {
      handler () {
        this.resetParams()
        this.getGoodsList()
      },
      deep: true
    }
  },
  computed: {
    hasMore () {
      const { page, total, limit } = this.pageInfo
      if (page >= Math.ceil(total / limit)) {
        return false
      }
      return true
    }
  },
  created () {
    this.getGoodsList()
  },
  mounted () {
    console.log(this.type, this.searchObj, 111)
  },

  methods: {
    resetParams () {
      this.listItems = []
      this.pageInfo.page = 1
      this.finished = false
      this.loading = false
      this.error = false
    },
    getGoodsList () {
      const { page, limit } = this.pageInfo
      const { search } = this.searchObj
      const params = {
        page,
        limit,
        order_by: 1,
        search,
        origin: 1,
        marketable: this.type,
        is_secret: '',
        shop_id: 44
      }
      this.loading = true
      this.$api.goods.getList(params).then(res => {
        if (res.total) {
          // eslint-disable-next-line
          const { data, total, current_page } = res
          // eslint-disable-next-line
          let curPage = parseInt(current_page)
          this.pageInfo.page = curPage
          this.pageInfo.total = total
          this.listItems = this.listItems.concat(data)
          this.loading = false
          if (!this.hasMore) {
            this.finished = true
          } else {
            this.pageInfo.page = ++curPage
          }
        } else {
          this.loading = false
          this.finished = true
        }
      }).catch((err) => {
        console.log(err)
        this.error = true
      })
    },
    pullRefresh () {
      this.finished = false
      this.loading = false
      this.pageInfo.page = 1
      this.listItems = []
      this.getGoodsList()
    }
  },

  components: {
    CList,
    VGoodsCard
  }
}
</script>

<style lang='less'>
.goods-list {
  height: calc(100vh - 200px);
  .padding-size(0, @xs);
}
</style>
