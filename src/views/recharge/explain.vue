<template>
  <layout-view>
    <c-header class="my-header" slot="header" :left-arrow="true">
      <div slot="title">说明</div>
    </c-header>
    <div class="explain-content">
      <p class="titile">如何为余额充值？</p>
      <p class="main-text">通过IPX App我的-我的余额页面进行充值</p>

      <p class="titile">如何使用？</p>
      <p class="main-text">在IPX App下单支付时，选择“余额支付”。</p>

      <p class="titile">如何查询余额？</p>
      <p class="main-text">进入IPX App - 我的 - 的余额，可查看当前可用金额</p>

      <p class="titile">使用须知</p>
      <p class="main-text">1）余额仅支持在IPX App下单使用，充值不支持使用余额支付；</p>
      <p class="main-text">2）余额不能兑换现金，可分次消费使用；</p>
      <p class="main-text">3）余额不足支付订单，需先充值至足额，再继续选择余额完成订单支付（后续版本将支持余额+微信/支付宝的混合支付方式）；</p>
      <p class="main-text">4）充值后如需开具发票请联系客服开具；在后续使用余额支付的订单将不再开具发票。</p>

    </div>
  </layout-view>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  }
};
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
.explain-content {
    padding: 0 16px;
  .titile {
    font-size: 18px;
    font-weight: 500;
    color: @color-c1;
    line-height: 26px;
    margin-top: 24px;
  }
  .main-text {
    font-size: 16px;
    font-weight: 400;
    color: @color-c2;
    line-height: 22px;
    margin-top: 8px;
  }
}
</style>
