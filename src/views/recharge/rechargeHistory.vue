<template>
  <layout-view>
    <c-header slot="header" :left-arrow="true" class="my-header">
      <div slot="title">{{ reportType === 1 ? "充值记录" : "支付记录" }}</div>
    </c-header>
    <empty-view
      class="empty"
      style="padding-top:25%"
      v-if="reportList.length <= 0"
      emptyType="error"
      emptyDesc="暂无数据"
    />
    <div class="panel" v-else>
      <c-list
        class="report-list"
        @load-data="handleMore"
        :loading="loading"
        :error="error"
        :finished="finished"
        :hasPullRefresh="true"
        @on-refresh="handleRefresh"
      >
        <div class="content" v-for="item in reportList" :key="item.id">
          <div class="title-content">
            <p class="title">
              {{ reportType === 1 ? "充值单号" : "支付单号" }}-{{ item.rltId }}
            </p>
            <p class="time">{{ item.creatTime }}</p>
          </div>
          <div class="balance-content">
            <p class="banlance">
              {{ reportType === 1 ? "+" : "-" }}{{ item.optAmount }}
            </p>
            <p class="total-cash">{{ item.detailAvailableMoney }}</p>
          </div>
        </div>
      </c-list>
    </div>
  </layout-view>
</template>

<script>
import CList from 'components/c-list'
import utils from 'utils'
import EmptyView from '../error/emptyView.vue'
export default {
    components: {
        CList,
        EmptyView
    },
    data() {
        return {
            reportType: 1,
            reportList: [],
            currentPage: 0, // 当前页码
            pageSize: 10, // 码数
            finished: false, // 加载完标识
            loading: false, // 加载更多标识
            error: false // 加载错误标识
        }
    },
    activated() {
        this.reportType = this.$route.query.type
        this.handleRefresh()
        utils.postMessage('changeStatus', 'default')
    },
    methods: {
        resetParams() {
            this.currentPage = 1
            this.finished = false
            this.loading = false
            this.error = false
        },
        setSuccessStatus() {
            this.loading = false
        },
        setFailureStatus() {
            this.currentPage -= 1
            this.finished = true
            this.loading = false
        },
        // 刷新
        handleRefresh() {
            this.resetParams()
            this.getRechargeHistory()
        },
        // 加载更多
        handleMore() {
            if (this.reportList.length > 0) {
                this.currentPage += 1
                this.getRechargeHistory()
            }
        },
        // 1 : 充值 ，2：提现 ，3 ：下单
        getRechargeHistory() {
            const params = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                detailOptType: this.reportType
            }
            this.loading = true
            this.$api.recharge
                .getAccontHistory(params)
                .then(res => {
                    this.setSuccessStatus()
                    if (res && res instanceof Array) {
                        if (this.currentPage === 1) {
                            this.reportList = res
                        } else {
                            this.reportList = this.reportList.concat(res)
                        }
                        if (res.length < this.pageSize) {
                            this.finished = true
                        } else {
                            this.finished = false
                        }
                    } else {
                        if (this.currentPage === 1) {
                            this.reportList = []
                        }
                        this.finished = true
                    }
                })
                .catch(() => {
                    this.setFailureStatus()
                })
        }
    }
}
</script>

<style lang="less" scoped>
.my-header {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: @color-c7;
  }
}
.panel {
  .report-list {
  height: calc(100vh - 60px);
    .content {
      display: flex;
      justify-content: space-between;
      padding: 17px 16px;
      .title-content {
        .title {
          font-size: 14px;
          font-weight: 400;
          color: @color-c1;
          line-height: 20px;
        }
        .time {
          font-size: 12px;
          font-weight: 400;
          color: @color-c4;
          line-height: 16px;
          margin-top: 9px;
        }
      }
      .balance-content {
        text-align: right;
        .banlance {
          font-size: 18px;
          font-family: "alibabaBold";
          font-weight: bold;
          color: @color-c1;
          line-height: 22px;
        }
        .total-cash {
          font-size: 14px;
          font-family: "alibabaBold";
          font-weight: bold;
          color: @color-c3;
          line-height: 16px;
          margin-top: 8px;
        }
      }
    }
    &:after {
      content: "";
      position: absolute;
      left: 16px;
      width: 100%;
      height: 1px;
      background: @color-c7;
    }
  }
}
</style>
