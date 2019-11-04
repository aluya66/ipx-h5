<template>
  <div :class="bem()">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="!hasPullRefresh">
      <van-list
        v-model="mLoading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        :immediate-check="false"
        finished-text="已到底，没有更多数据"
        @load="loadMore"
      >
        <slot></slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import create from 'utils/create'
import { List, PullRefresh } from 'vant'

export default create({
  name: 'list',
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  props: {
    listItems: {
      type: Array,
      default () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    hasPullRefresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    mLoading: {
      get: function () {
        return this.loading
      },
      set: function () {
      }
    }
  },
  methods: {
    loadMore () {
      this.$emit('load-data')
    },
    onRefresh () { // 下拉刷新
      setTimeout(() => {
        this.isLoading = false
        this.$emit('on-refresh')
      }, 300)
    }
  }
})
</script>

<style lang="less">
.c-list {
  overflow: auto;
}
</style>
