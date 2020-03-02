<template>
  <div :class="bem()">
    <empty-view class="empty-list" v-if="listItems.length <= 0"  :emptyType="emptyType" :emptyDesc="emptyDesc" />
    <van-pull-refresh v-else v-model="isLoading" @refresh="onRefresh" :disabled="!hasPullRefresh">
      <van-list
        v-model="mLoading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        :immediate-check="immediateCheck"
        finished-text="已到底，没有更多数据"
        @load="loadMore"
        :class= '[isWaterFall?"waterFall":""]'
      >
        <slot></slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import create from 'utils/create'
import { List, PullRefresh } from 'vant'
import EmptyView from '../../views/error/emptyView.vue'

export default create({
    name: 'list',
    components: {
        EmptyView,
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
        /// 是否是瀑布流
        isWaterFall: {
            type: Boolean,
            default: false
        },
        hasPullRefresh: {
            type: Boolean,
            default: false
        },
        immediateCheck: {
            type: Boolean,
            default: false
        },
        emptyType: {
            type: String,
            default: 'error'
        },
        emptyDesc: {
            type: String,
            default: ''
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
.empty-list {
    position: relative;
    left: 0;
    top: 0;
    padding-top: 25%;
    height: 100%;
    width: 100%;
}
.waterFall {
    display: flex; // height: 100%;
    background: #fff;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: -1px;
    .van-list__finished-text {
        width: 100%;
    }
    .van-loading__text {
        width: 100%;
    }
    .van-list__loading {
        width: 100%;
        height: 44px;
    }
    .van-loading__spinner--circular {
        width: 16px !important;
        height: 16px !important;
    }
}
</style>
