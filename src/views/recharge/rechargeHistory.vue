<template>
  <layout-view>
    <c-header slot="header" :left-arrow="true" class="my-header">
      <div slot="title">充值记录</div>
    </c-header>
    <div class="panel">
      <div class="content" v-for="item in reportList" :key="item.id">
        <div class="title-content">
          <p class="title">{{reportType === 1 ? '充值单号':'支付单号'}}-{{item.rltId}}</p>
          <p class="time">{{item.creatTime}}</p>
        </div>
        <div class="balance-content">
          <p class="banlance">{{reportType === 1 ? '+':'-'}}{{item.optAmount}}</p>
          <p class="total-cash">{{item.detailAvailableMoney}}</p>
        </div>
      </div>
    </div>
  </layout-view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            reportType: 1,
            reportList: []
        }
    },
    activated() {
        // reportType = this.$route.query.reportType
        this.getRechargeHistory()
    },
    methods: {
        // 1 : 充值 ，2：提现 ，3 ：下单
        getRechargeHistory() {
            const params = {
                pageNum: 1,
                detailOptType: 1
            }
            this.$api.recharge.getAccontHistory(params).then(res => {
                this.reportList = res
            }).catch(err => {
                console.log(err)
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
</style>
