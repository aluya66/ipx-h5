<template>
  <div class="check-contain" >
    <div class="check-content" v-if="!isTest ">
      <div class="check-topClass">
        <img src="@/themes/images/app/check-icon@2x.png" alt="">
        <div>
          <h3>主推款免费测款</h3>
          <p>顾客喜不喜欢货品，一测见真知
淘宝商家制造爆款的秘密工具
免费测款，让顾客和市场帮你做决策</p>
        </div>
      </div>
      <section class="check-button" @click="handleCheck">
        <p>立即免费测款
        </p>
        <img src="@/themes/images/app/check-rightArrow@2x.png" alt="">
      </section>
    </div>
    <div v-if="isTest">
      <div class="testContent">
        <h3>我的测款</h3>
        <div class="infoContent">
          <section class="infoHeader">
            <h3>共{{products.length}}种测款款式</h3>
            <p @click="handleCheckDetail">查看测款页<img src="@/themes/images/app/icon-next@2x.png" alt=""></p>
          </section>
          <div class="imageContent">
            <section v-for="item in products.slice(0,3)" :key="item.productCode">
              <img :src="item.mainPic" alt="">
            </section>
          </div>
        </div>
        <p class="proptTitle">分享给越多顾客测款，数据越准哦～</p>
        <dl>
          <dd :class="['actionBtn','leftBtn']" @click="handleShare">分享测款</dd>
          <dt :class="['actionBtn','rightBtn']" @click="handleCheckTestResult">测款报告</dt>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    products: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isTest: false
    }
  },
  created () {
    this.isTest = this.products.length > 0
  },
  watch: {
    products (val) {
      this.isTest = val.length > 0
    }
  },
  methods: {
    // 发起测款
    handleCheck () {
      this.$emit('onCheck')
    },
    // 测款报告
    handleCheckTestResult () {
      this.$emit('onResult')
    },
    // 分享测款
    handleShare () {
      this.$emit('onShare')
    },
    // 查看测款详情页
    handleCheckDetail () {
      this.$emit('onDetail')
    }
  }
}
</script>

<style lang='less' scoped>
.check-contain {
  padding: 0 16px;
  .actionBtn {
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    height: 50px;
    border-radius: 25px;
    box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
    flex: 1;
  }
  dl {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom :20px;
    margin-top:12px;
    position: relative;
    .leftBtn {
      background-image: linear-gradient(to top, #557af4, #724fff);
      color:#fff;
      margin: 0 16px 0 0;
    }
    .rightBtn {
      border: solid 1.5px #3c5cf6;
      color:#3c5cf6
    }
  }
  .testContent {
    border-radius: 8px;
    box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
    background-color: #ffffff;
    position: relative;
    padding-bottom: 26px;
    position: relative;
    padding: 0 12px;
    .proptTitle {
      margin: 16px 0 0 0;
      height: 16px;
      font-size: 12px;
      line-height: 16px;
      color: #8a8c99;
      text-align: center;
    }
    >h3 {
      line-height: 28px;
      font-size: 20px;
      font-weight: 500;
      color: @color-c1;
      margin:20px 0 0;
      text-align: center;
      display: inline-block;
      width: 100%;
    }
    .imageContent {
      display: flex;
      flex-direction: row;
      padding: 0 12px 12px;
      section {

        margin-right: 10px;
        border-radius: 4px;
        object-fit: cover;
        flex: 1;
        &:last-child {
          margin-right: 0;
        }
        img {
          height: 119px;
          width: 100%;
          border-radius: 4px;
          object-fit: cover
        }
      }
    }
    .infoContent {
      border-radius: 8px;
      background-color: @color-c7;
      margin-top: 20px;
      .infoHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 44px;
        >h3 {
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: @color-c1;
          margin: 0 0 0 12px;
          text-align: left;
          flex: 2;
        }
        p {
          font-size:12px;
          line-height: 16px;
          color: #8a8c99;
          margin:0 12px 0 0;
          flex: 1;
          text-align:right;
          img {
            width: 16px;
            height: 16px;
            vertical-align: text-top
          }
        }
      }
    }
  }
  .check-content {
    border-radius: 8px;
    box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
    background-color: #ffffff;
    position: relative;
    padding-bottom: 26px;
    .check-button {
      border-radius: 25px;
      box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
      background-image: linear-gradient(to top, #557af4, #724fff);
      height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 20px 16px 0px;

      p {
        font-size: 18px;
        font-weight: 500;
        color: #ffffff;
        line-height: 50px;
      }
      img {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
    }
    .check-topClass {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding: 20px 16px 0;
      img {
        // margin: 20px 0 0 0;
        width: 84px;
      }
      >div {
        display: flex;
        flex: auto;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        padding-left: 16px;
        h3 {
            font-family: PingFangSC;
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
            font-size:@f20;
            color: #2a2b33;
            margin: 0;
        }
        p {
          font-family: PingFangSC;
          font-size: 12px;
          line-height: 16px;
          margin: 0;
        }
      }
    }
  }
}
</style>
