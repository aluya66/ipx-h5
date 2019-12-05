<template>
  <van-sku v-model="showSku" :sku="sku" class="my-sku-content">
    <template slot="sku-header">
      <div class="van-sku-header van-hairline--bottom">
        <div class="van-sku-header__img-wrap">
          <img :src="seletedDetailsItem.mainPic" />
        </div>
        <div class="van-sku-header__goods-info">
          <div class="van-sku__goods-price">
            &yen;
            <span class="van-sku__price-num">{{ seletedDetailsItem.spuTshPrice }}</span>
          </div>
          <div class="van-sku-header-item">
            <!-- <span class="van-sku__stock">{{seletedDetailsItem.minBatchNum}}件起批</span> -->
          </div>
          <div class="van-sku-header-item">请调整颜色、尺码和数量</div>
        </div>
      </div>
    </template>
    <template slot="sku-group">
      <van-tabs swipeable class="sku-group-tabs">
        <template v-for="(colorSkusItem, colorSkusIndex) in seletedDetailsItem.colorSkuList">
          <van-tab :key="colorSkusIndex" :name="colorSkusItem.attrColorValue">
            <div slot="title">
              {{ colorSkusItem.attrColorValue }}
              <div class="icon-info" v-if="colorSkusItem.seletedColorSkuNum > 0">
                {{
                  colorSkusItem.seletedColorSkuNum > 99
                    ? colorSkusItem.seletedColorSkuNum + "+"
                    : colorSkusItem.seletedColorSkuNum
                }}
              </div>
            </div>
            <div class="sku-card">
              <div
                class="sku-card-list"
                v-for="(skuItem, skuIndex) in colorSkusItem.skuList"
                :key="skuIndex"
              >
                <div class="flex-left">
                  <p class="spec-name">{{ skuItem.attrSpecValue }}</p>
                  <p class="batch-price">&yen;{{ skuItem.tshPrice }}</p>
                </div>
                <div class="flex-right">
                  <div class="sku-num">库存：{{ skuItem.entityStock }}</div>
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
      <div class="number-tip" v-if="seletedDetailsItem.seletedColorSkuSumNum <= 0">
        库存数量，不满足起批数量
      </div>
    </template>

    <template slot="sku-stepper">{{ goodsId }}</template>
    <template slot="sku-actions">
      <div class="van-sku-actions" :style="getBottomOffset(2)">
        <van-button
          square
          size="large"
          type="warning"
          @click="onPointClicked"
          v-if="seletedDetailsItem.seletedColorSkuSumNum > 0"
          >确定</van-button
        >
        <van-button square size="large" type="warning" class="forbidColor" v-else>确定</van-button>
      </div>
    </template>
  </van-sku>
</template>

<script>
import utils from 'utils'
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
            default() {
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
    data() {
        return {
            sku: {
                tree: [],
                list: []
            }
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        changSelectedNum(colorSkusIndex, skuIndex) {
            let { colorSkuList } = this.seletedDetailsItem
            let seletedColorSkuNum = 0
            let seletedColorSkuSumNum = 0
            colorSkuList[colorSkusIndex].skuList.forEach((item, index) => {
                seletedColorSkuNum = Number(item.skuValue) + Number(seletedColorSkuNum)
            })
            this.seletedDetailsItem.colorSkuList[colorSkusIndex].seletedColorSkuNum = seletedColorSkuNum

            colorSkuList.forEach((item, index) => {
                seletedColorSkuSumNum = Number(item.seletedColorSkuNum) + Number(seletedColorSkuSumNum)
            })
            this.$set(this.seletedDetailsItem, seletedColorSkuSumNum, seletedColorSkuSumNum)
            // this.seletedDetailsItem.seletedColorSkuSumNum = seletedColorSkuSumNum
        },
        onPointClicked() {
            this.$emit('pointClick', this.seletedDetailsItem)
        }
    }
}
</script>

<style lang="less" scoped>
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
        color: @color-c4;
        font-family: "alibabaBold";
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
      .stepper-option {
        height: 24px;
        background: red;
        > img {
          width: 24px;
          height: 24px;
        }
        .inputNum {
          width: 48px;
          height: 24px;
          background: #f4f5f7;
        }
      }
    }
  }
}
</style>

<style lang="less">
.my-sku-content {
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
        font-size: 14px;
        font-weight: 400;
        font-family: "alibabaRegular";
        .van-sku__price-num {
          font-size: 20px;
          font-weight: bold;
          color: #f53030;
          font-family: "alibabaBold";
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

  .sku-group-tabs {
    margin-top: 25px;
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
          // margin-right: 12px;
          flex-basis: auto !important;
          min-width: initial;
          // margin-top: 12px;
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
          .icon-info {
            position: absolute;
            background-color: @color-rc;
            color: white;
            width: 15px;
            height: 15px;
            border-radius: 10px;
            top: -5px;
            right: 5px;
            line-height: 14px;
            text-align: center;
            font-weight: 500;
            font-size: 12px;
            z-index: 100;
          }
          &.van-tab--active {
            span {
              border: solid 1px #3c5cf6;
              background-color: #ebeeff;
              color: #3c5cf6;
            }
          }
        }
        .van-tabs__line {
          height: 0;
        }
      }
    }
  }
  .flex-right {
    .van-stepper {
      > input {
        width: 48px;
        background-color: #f4f5f7;
        font-size: 14px;
        font-family: "alibabaBold";
        font-weight: bold;
      }
    }
    .van-stepper__minus {
      background: url("../../themes/images/app/number_reduce@3x.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      // width: 24px;
      // height: 24px;
    }
    .van-stepper__minus--disabled {
      background: url("../../themes/images/app/number_reduce_unable@3x.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .van-stepper__plus {
      background: url("../../themes/images/app/number_plus@3x.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .van-stepper__plus--disabled {
      background: url("../../themes/images/app/number_plus_unable@3x.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .van-stepper__minus::before,
    .van-stepper__plus::before,
    .van-stepper__minus::after,
    .van-stepper__plus::after {
      background-color: transparent;
    }
    .van-stepper__input {
      height: 24px;
    }
  }
}
</style>
