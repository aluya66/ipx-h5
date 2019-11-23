<template>
    <van-sku
        v-model="showSku"
        :sku="sku"
        >
      <template slot="sku-header">
        <div class="van-sku-header van-hairline--bottom">
          <div class="van-sku-header__img-wrap">
            <img :src="seletedDetailsItem.mainPic" />
          </div>
          <div class="van-sku-header__goods-info">
            <div class="van-sku__goods-price">
              &yen;<span class="van-sku__price-num">{{seletedDetailsItem.tshPrice}}</span>
            </div>
            <div class="van-sku-header-item">
              <!-- <span class="van-sku__stock">{{seletedDetailsItem.minBatchNum}}件起批</span> -->
            </div>
            <div class="van-sku-header-item">请调整颜色、尺码和数量</div>
          </div>
        </div>
      </template>
      <template slot="sku-group">
        <van-tabs v-model="colorSkuAction" swipeable class="sku-group-tabs">
          <template v-for="(colorSkusItem, colorSkusIndex) in seletedDetailsItem.colorSkuList">
            <van-tab :key="colorSkusIndex" :name="colorSkusItem.attrColorValue">
              <div slot="title">
                {{colorSkusItem.attrColorValue}}
                <div
                  class="van-info"
                  v-if="colorSkusItem.seletedColorSkuSumNum > 0"
                >{{colorSkusItem.seletedColorSkuSumNum > 99 ? colorSkusItem.seletedColorSkuSumNum + '+' : colorSkusItem.seletedColorSkuSumNum}}</div>
              </div>
              <div class="sku-card">
                <div
                  class="sku-card-list"
                  v-for="(skuItem, skuIndex) in colorSkusItem.skuList"
                  :key="skuIndex"
                >
                  <div class="flex-left">
                    <p class="spec-name">{{skuItem.attrSpecValue}}</p>
                    <p class="batch-price">&yen;{{skuItem.tshPrice}}</p>
                  </div>
                  <div class="flex-right">
                    <div class="sku-num">库存：{{skuItem.entityStock}}</div>
                    <!-- :value="Number(skuItem.entityStock) > 0 ? skuItem.selectedNum : 0" -->
                    <!-- v-model="skuItem.skuValue" -->
                    <van-stepper
                      :min="0"
                      :max="skuItem.entityStock"
                      v-model="skuItem.skuValue"
                      @change="changSelectedNum(colorSkusIndex, skuIndex)"
                    />
                    <!-- <span
                      v-show="skuValueStatus"
                    >{{ skuItem.skuValue | filterSkuValue(skuItem.selectedNum, skuItem.entityStock) }}</span>-->
                  </div>
                </div>
              </div>
            </van-tab>
          </template>
        </van-tabs>
        <div class="number-tip" v-if="seletedDetailsItem.groupNum <= 0">库存数量，不满足起批数量</div>
      </template>

      <template slot="sku-stepper">{{goodsId}}</template>
      <template slot="sku-actions">
        <div class="van-sku-actions">
          <van-button
            square
            size="large"
            type="warning"
            @click="onPointClicked"
            v-if="seletedDetailsItem.groupNum > 0"
          >确定</van-button>
          <van-button square size="large" type="warning" class="forbidColor" v-else>确定</van-button>
        </div>
      </template>
    </van-sku>
</template>

<script>
import { Icon, Dialog, Sku, Button, Tab, Tabs, Stepper } from 'vant'
export default {
    components: {
        [Icon.name]: Icon,
        [Dialog.Component.name]: Dialog.Component,
        [Sku.name]: Sku,
        [Button.name]: Button,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Stepper.name]: Stepper
    },
    props: {
        seletedDetailsItem: {
            type: Object,
            default () {
                return {}
            }
        },
        colorSkuAction: {
            type: String,
            default() {
                return ''
            }
        },
        goodsId: {
            type: String,
            default() {
                return ''
            }
        },
        showSku: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    data () {
        return {
            sku: {
                tree: [],
                list: []
            }
        }
    },
    methods: {
        changSelectedNum (colorSkusIndex, skuIndex) {
            let { colorSkus } = this.seletedDetailsItem
            let seletedColorSkuNum = 0
            let seletedColorSkuSumNum = 0
            colorSkus[colorSkusIndex].seletedcolorSkus.forEach((item, index) => {
                seletedColorSkuNum = Number(item.skuValue) + Number(seletedColorSkuNum)
            })
            this.seletedDetailsItem.colorSkus[colorSkusIndex].seletedColorSkuNum = seletedColorSkuNum

            colorSkus.forEach((item, index) => {
                seletedColorSkuSumNum =
            Number(item.seletedColorSkuNum) + Number(seletedColorSkuSumNum)
            })

            this.seletedDetailsItem.seletedColorSkuSumNum = seletedColorSkuSumNum
        },
        onPointClicked() {
            this.$emit('pointClick', this.seletedDetailsItem)
        }
    }
}
</script>

<style lang='less' scoped>
.number-tip {
  font-size: 12px;
  color: #f53030;
  position: fixed;
  bottom: 49px;
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: #ffebed;
}

.sku-card {
  width: calc(100vw - 32px);
  // height: 200px;
  margin: 0 auto;
  border-radius: 8px;
  border: solid 0.5px #e1e2e6;
  background-color: #ffffff;
  margin-top: 16px;
  padding: 6px 12px;
  .sku-card-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    &:last-child {
      margin-bottom: 0;
    }
    .flex-left {
      p {
        margin: 0;
        margin-bottom: 4px;
      }
      .spec-name {
        font-size: 14px;
        font-weight: 500;
        color: #2a2b33;
      }
      .batch-price {
        font-size: 12px;
        font-weight: bold;
        color: #b2b5c1;
      }
    }
    .flex-right {
      display: flex;
      align-items: center;
      .sku-num {
        font-size: 10px;
        color: #8a8c99;
        margin-right: 20px;
      }
    }
  }
}
</style>

<style lang="less">
.van-sku-actions {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  padding: 5px 16px;
  box-shadow: 0 -1px 6px 0 rgba(33, 44, 98, 0.06);
  .van-button {
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    background: #3c5cf6;
    &.forbidColor {
      color: #ffffff;
      background-color: #d5d6de;
    }
  }
}

.van-popup--bottom.van-popup--round {
  border-radius: 8px 8px 0 0;
}

.van-sku-header {
  .van-sku-header__img-wrap {
    width: 88px;
    height: 88px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }

  .van-sku-header__goods-info {
    margin-top: 14px;
    .van-sku__goods-price {
      color: #f53030;
      font-size:14px;
      font-weight:400;
      .van-sku__price-num {
        font-size: 20px;
        font-weight: bold;
        color: #f53030;
      }
    }
    .van-sku-header-item {
      font-size: 12px;
      color: #2a2b33;
      margin-top: 4px;
    }
    .van-sku__stock {
      color: #b2b5c1;
    }
  }
}

.van-hairline--bottom::after,
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: 0;
}

.van-info {
}

.van-sku-body {
  // background-color: #
}

.sku-group-tabs {
  margin-top: 26px;
  margin-bottom: 80px;
  .van-tabs__wrap {
    height: initial;
    overflow: initial;
    .van-tabs__nav {
      margin-left: 16px;
      padding-bottom: 0;
      .van-tab {
        flex: initial;
        position: relative;
        margin-right: 12px;
        flex-basis: auto !important;
        min-width: initial;
        margin-top: 12px;
        span {
          font-size: 12px;
          font-weight: 500;
          color: #2a2b33;
          width: 74px;
          height: 28px;
          line-height: 28px;
          border-radius: 14px;
          background-color: #f4f5f7;
        }
        .van-info {
          top: 1px;
          right: 12px;
        }
        &.van-tab--active {
          span {
            border: solid 1px #3c5cf6;
            background-color: #ebeeff;
            color: #3c5cf6;
          }
        }
        .van-ellipsis {
        }
      }
      .van-tabs__line {
        height: 0;
      }
    }
  }
}
</style>
