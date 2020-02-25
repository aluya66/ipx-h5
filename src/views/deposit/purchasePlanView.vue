<template>
  <layout-view>
    <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative" :showBorderBottom='true'>
      <div slot="title">请选择购买方案</div>
    </c-header>
    <div class="plan-list" :style="getBottomOffset(49)">
      <div class="item-container">
        <div class="item-title">
          <span>方案一：</span><span>付</span><span>10000</span><span>元</span><span>押金</span>
        </div>
        <div class="item-content">
          <p>·3000元消费额度</p>
          <p>·3次免费全场换货</p>
          <p>·40天押金有效期</p>
          <p>·100%退货退款</p>
        </div>
      </div>
    </div>
    <fixed-view>
      <div class="pay-button">去支付</div>
    </fixed-view>
  </layout-view>
</template>

<script>
import utils from 'utils'
import FixedView from '../common/bottomFixedView.vue'

export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    components: {
        FixedView
    },
    data() {
        return {
            isNative: false
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleAdjustHeaderBg() {
            let w = window.screen.width
            let h = w * 476 / 375 / 100
            return `background-size:100% ${h}rem`
        }
    }
}
</script>

<style lang="less" scoped>
  .plan-header {
    background: white;
  }

  .plan-list {
    padding: 20px;
  }

  .item-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0px 3px 20px 0px rgba(33, 44, 98, 0.12);
    overflow: hidden;
    .item-title {
      height: 66px;
      color: @color-c1;
      line-height: 66px;
      padding-left: 20px;
      font-size: 18px;
      font-weight: bold;
    }
    .item-content {
      border-radius: 0px 0px 8px 8px;
      background:rgba(235,238,255,1);
      display: flex;
      padding: 20px;
      flex-wrap: wrap;
      p {
        padding-left: 20px;
        width: 50%;
        height:32px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC,serif;
        font-weight:500;
        color:@color-c2;
        line-height:32px;
      }
    }
  }

  .item-container:hover {
    background: white;
    border-radius: 8px;
    box-shadow: 0px 3px 20px 0px rgba(33, 44, 98, 0.12);
    border:1px solid rgba(60,92,246,1);
    overflow: hidden;
  }

  .pay-button {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
    border-radius:25px;
    font-size: 18px;
    margin: 0px 16px;
    color: white;
  }
</style>
