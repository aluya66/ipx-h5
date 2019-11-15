<template>
  <div class="panel">
    <img
      src="../../themes/images/app/vote_banner@2x.png"
      alt=""
    >
    <div class="content">
      <div class="top">
        <p>这一季时尚货品，全听你的！</p>
        <div class="raduis radu-Left"></div>
        <div class="raduis radu-right"></div>
      </div>
      <div class="product-list">
        <div
          class="product"
          v-for="(product,index) in productList"
          :key="index"
        >
          <img
            :src="product.mainPic"
          >
          <p>{{product.productName}}</p>
          <button
            :class="[product.isSelect? 'select-actived':'']"
            :disabled="disableClick"
            @click="selected(product)"
          >{{product.isSelect?"已选":"选TA"}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        productList: {
            type: Array,
            default () {
                return []
            }
        },
        disableClick: {
            type: Boolean,
            default () {
                return true
            }
        }
    },
    methods: {
        selected (product) {
            this.$emit('selectClick', product)
        }
    }
}
</script>

<style lang="less" scoped>
.panel {
  img {
    width: 100%;
  }
  .content {
    background-color: white;
    .top {
      background-color: white;
      text-align: center;
      border-radius: 8px;
      height: 38px;
      width: 100%;
      z-index: 100;
      transform: translateY(-15px);
      p {
        margin: 0;
        line-height: 60px;
        font-weight: bold;
        // font-family: AlibabaPuHuiTiM;
        font-size: 16px;
        color: #2a2b33;
      }
      .raduis {
        background-color: #3c5cf6;
        width: 4px;
        height: 4px;
        border-radius: 2px;
      }
      .radu-Left {
        transform: translate(10px, -52px);
      }
      .radu-right {
        float: right;
        transform: translate(-10px, -55px);
      }
    }
    .product-list {
      //   background-color: red;
      display: flex;
      flex-wrap: wrap;
      //   justify-content: space-around;
      padding: 0px 10px 20px;
      .product {
        margin: 0 5px 20px;
        // background-color: blue;
        text-align: center;
        width: 30%;
        // &:nth-child(3n) {
        //   margin-right: 0;
        // }
        img {
          width: 100%;
          height: 143px;
          border-radius: 4px;
          object-fit: cover;
        }
        p {
          margin: 10px 0;
          font-family: PingFangSC;
          font-size: 12px;
          color: #2a2b33;
          .ellipsis();
        }
        button {
          width: 75px;
          height: 32px;
          border-radius: 17px;
          background-color: #3c5cf6;
          font-family: PingFangSC;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
        }
        .select-actived {
          background-color: #b2b5c1;
        }
      }
    }
  }
}
</style>
