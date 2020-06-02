<template>
  <layout-view>
    <c-header class="my-header" slot="header" :left-arrow="true">
      <div slot="title">充值成功</div>
    </c-header>
    <div class="result-my-panel">
      <!-- 上部分内容 -->
      <div class="top-content">
        <div class="icon-pay-status">
          <img
            src="../../themes/images/app/icon_recharge_success@3x.png"
            alt=""
          />
          <p>充值成功</p>
        </div>
        <div class="change-cash">
          <p class="titile-text">成功充入</p>
          <p class="money">¥<span>5,000.00</span></p>
        </div>
        <div class="balance-cash">
          <p class="titile-text">当前余额</p>
          <p class="banlance">¥<span>7,500.00</span></p>
        </div>
      </div>
      <!-- 底部按钮 -->
      <div class="footer-content">
        <button class="go-on">继续充值</button>
        <button class="to-use">去使用</button>
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
.result-my-panel {
  .top-content {
    background: white;
    box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.08);
    border-radius: 8px;
    text-align: center;
    margin: 20px 16px 32px;
    .icon-pay-status {
      > img {
        width: 103px;
        height: 103px;
        margin-top: 32px;
      }
      > p {
        font-size: 20px;
        font-weight: 500;
        color: @color-c1;
        line-height: 28px;
        margin-top: 8px;
      }
    }
    .titile-text {
      font-size: 14px;
      font-weight: 400;
      color: @color-c3;
      line-height: 44px;
    }
    .change-cash {
      margin: 20px 12px 0;
      display: flex;
      justify-content: space-between;
      height: 44px;
      text-align: center;
      position: relative;
      .money {
        font-size: 12px;
        font-family: "alibabaRegular";
        font-weight: 400;
        color: @color-rc;
        line-height: 44px;
        > span {
          font-size: 16px;
          font-family: "alibabaBold";
          font-weight: bold;
          color: @color-rc;
          line-height: 44px;
        }
      }
      &:after {
        content: "";
        position: absolute;
        top: 44px;
        left: 0;
        width: 100%;
        height: 1px;
        background: @color-c7;
      }
    }
    .balance-cash {
      margin: 0 12px;
      display: flex;
      justify-content: space-between;
      height: 44px;
      .banlance {
        font-size: 12px;
        font-family: "alibabaRegular";
        font-weight: 400;
        color: @color-c1;
        line-height: 44px;
        > span {
          font-size: 16px;
          font-family: "alibabaBold";
          font-weight: bold;
          color: @color-c1;
          line-height: 44px;
        }
      }
    }
  }

  .footer-content {
    margin: 0 16px;
    display: flex;
    justify-content: space-between;
    .go-on {
      width: 50%;
      height: 50px;
      border-radius: 25px;
      border: 1px solid rgba(60, 92, 246, 1);
      background-color: white;
      font-size: 18px;
      font-weight: 500;
      color: @color-ec;
      line-height: 26px;
      margin-right: 15px;
    }
    .to-use {
      width: 50%;
      height: 50px;
      background: linear-gradient(
        135deg,
        rgba(85, 122, 244, 1) 0%,
        rgba(114, 79, 255, 1) 100%
      );
      border-radius: 25px;
      font-size: 18px;
      font-weight: 500;
      color: white;
      line-height: 26px;
      margin-right: 0;
    }
  }
}
</style>
