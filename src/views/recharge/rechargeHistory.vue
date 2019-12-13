<template>
  <layout-view>
    <c-header slot="header" :left-arrow="true">
      <div slot="title">充值记录</div>
    </c-header>
    <div class="panel">
      <div class="content">
        <div class="title-content">
          <p class="title">充值单号-344546577</p>
          <p class="time">2019-12-08 18:50:00</p>
        </div>
        <div class="balance-content">
          <p class="banlance">+1,000.00</p>
          <p class="total-cash">1,233,500.00</p>
        </div>
      </div>
    </div>
  </layout-view>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
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
    width: 95%;
    height: 1px;
    background: @color-c7;
  }
}
</style>
