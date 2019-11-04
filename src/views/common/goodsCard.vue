<template>
  <div class="flex goods-card" @click="routerLink(`/goods/detail/${item.goods_id}`)">
    <div class="flex-sub">
      <c-image :poster-url="item.image_url"></c-image>
    </div>
    <div class="flex-treble goods-info">
      <div class="goods-title">
        <div class="flex-twice text-ellipsis">{{item.bn}}#{{item.name}}</div>
      </div>
      <div class="flex">
        <div class="flex-treble">
          <div>
            零售价：
            <span class="price">￥{{item.common_price || 0}}</span>
          </div>
          <div>
            会员价：
            <span class="price">￥{{item.retail_price || 0}}</span>
          </div>
          <div>
            散批价：
            <span class="price">￥{{item.trade_price || 0}}</span>
          </div>
          <div>
            大批价：
            <span class="price">￥{{item.big_trade_price || 0}}</span>
          </div>
        </div>
        <div class="flex-sub">
          <div class="secret" v-if="item.is_secret === 2">私密款</div>
        </div>
      </div>
      <div class="flex-grid">
        <div>库存 {{item.sellable_stock}}</div>
        <div>销量 {{item.sales_total}}</div>
        <div class="bg-yellow" @click.stop.prevent="wechatShare(item)">微信推广</div>
      </div>
    </div>
  </div>
</template>

<script>
import CImage from 'components/c-image'

export default {
  name: 'v-goods-card',
  data () {
    return {}
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  methods: {
    wechatShare (val) {

    }
  },

  components: {
    CImage
  }
}
</script>

<style lang='less'>
.goods-card {
  background-color: @white;
  .padding-size(@xs);
  margin-top: @xs;

  .goods-info {
    padding-left: @xs;

    .text-ellipsis {
      margin-bottom: @xs;
      .multi-ellipsis(1);
    }

    .flex-grid {
      display: flex;
      flex-wrap: wrap;
      margin-top: @base;
      div {
        width: 33%;
        .padding-size(@base);
        &.bg-yellow {
          text-align: center;
          width: 34%;
          background-color: @yellow;
          .padding-size(@base, 0);
        }
      }
    }
    .price {
      display: inline-block;
      line-height: 20px;
      color: @orange-dark;
    }
    .secret {
      color: @orange-dark;
      .padding-size(@base);
      font-size: @font-size-sm;
      border: 1px solid @orange-dark;
      text-align: center;
    }
  }
}
</style>
