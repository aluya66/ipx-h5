<template>
  <layout-view>
    <c-header slot="header" :left-arrow="true">
      <div slot="title">组货清单详情</div>
      <template slot="right" tag="div">
        <span class="header-save" @click="save">保存</span>
      </template>
    </c-header>
    <div class="panel" :style="getBottomOffset(49)">
      <div class="top-content">
        <span>组货名称</span>
        <div class="group-name">
          <p>{{ groupName }}</p>
          <button @click="changeGroupName">更改</button>
        </div>
      </div>
      <div class="list-title">
        <div class="dot"></div>
        <p>样衣列表</p>
      </div>
      <div class="list-content">
        <div
          class="product-cell"
          v-for="(item, index) in groupGoodsRecords"
          :key="item.productCode"
        >
          <img :src="item.mainPic" alt="" @click="jumpToProduct(item)" />
          <div class="product-info">
            <p :class="[item.disabled ? 'disableTitle' : '']" @click="jumpToProduct(item)">
              {{ item.productName }}
            </p>
            <div class="sku-list" @click="jumpToProduct(item)">
              <p
                for=""
                v-for="(sku, i) in item.colorSkuList"
                :key="i"
                :class="[item.disabled ? 'disableSku' : '']"
              >
                {{ sku | selectSkuStr }}
              </p>
              <p class="tips">{{ tipStr(item) }}</p>
            </div>
            <p :class="[item.disabled ? 'disablePrice' : 'price']">¥{{ item.spuTshPrice }}</p>
            <button @click="openSku(item, index)" :disabled="item.disabled">调整规格</button>
          </div>
        </div>
      </div>
      <div class="footer-content" :style="getBottomOffset(0)">
        <div class="total-price">
          合计：<span class="yen">¥</span><span class="price">{{ groupDetail.totalPrice }}</span>
        </div>
        <button @click="goPay">立即采购</button>
      </div>

      <!-- sku选择 -->
      <sku-select
        :seletedDetailsItem="seletedDetailsItem"
        :goodsId="goodsId"
        :showSku="showSku"
        @pointClick="skuCommit"
      />
    </div>
  </layout-view>
</template>

<script>
import skuSelect from '@/views/common/skuSelect.vue'
import order from './groupCreateOrder'
import utils from 'utils'
import { Dialog } from 'vant'
export default {
    components: {
        skuSelect
    },
    data() {
        return {
            showSku: false, // 是否弹出sku选择框
            groupName: ' ', // 组货名称
            groupGoodsId: '', // 组货id
            goodsId: '',
            colorSkuAction: '',
            groupDetail: {}, // 组货基本信息
            groupGoodsRecords: [], // 商品列表数据源
            isDialog: false,
            seletedDetailsItem: {}, // sku数据源
            seletedItemIndex: '' // 选择调整商品下标
        }
    },
    activated() {
        this.showSku = false
        this.isDialog = false
        this.getGroupDetail()
        utils.postMessage('changeStatus', 'default')
    },
    mounted() {
    // 上报页面事件
        window.sa.track('IPX_WEB', {
            page: 'groupListDetail',
            type: 'pageView',
            event: 'pageView'
        })
    },
    filters: {
        selectSkuStr(val) {
            let str = val.attrColorValue + '：'
            let arr = []
            val.skuList.forEach(item => {
                arr.push(item.attrSpecValue)
            })
            return str + arr.join('，')
        }
    },
    computed: {
        tipStr() {
            return function(value) {
                if (value.productShelves === 0) {
                    value.disabled = true
                    return '商品已失效' // 下架 置灰
                }
                let batchNum = value.minBatchNum
                let stockAll = 0
                let isChanged = false
                let isEnough = false
                value.colorSkuList.forEach((item, index) => {
                    item.skuList.forEach((skuItem, skuIndex) => {
                        if (skuItem.entityStock === 0 && skuItem.num !== 0) {
                            isChanged = true
                        }
                        if (skuItem.num >= batchNum && skuItem.entityStock >= skuItem.num) {
                            isEnough = true
                        }
                        stockAll += skuItem.entityStock
                    })
                })
                if (stockAll === 0 || stockAll < batchNum) {
                    value.disabled = true
                    this.dialogAlert(true)
                    return '库存不足，暂不可购买' // 已选商品总库存不足起订量、已选商品已选商品总库存为0 置灰
                }
                if (!isEnough && stockAll >= batchNum) {
                    this.dialogAlert(true)
                    return '不满足起订量，需手动调整' // 已选商品sku部分库存为0，不满足起批量，但总库存满足起订量
                }
                if (isChanged && isEnough) {
                    this.dialogAlert(true)
                    return '商品规格变更，请再次确认' // 已选商品sku部分库存为0，但剩余已选的sku满足起批量
                }
            }
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        save() {
            this.$toast.success('已保存')
            this.$router.go(-1)
        },
        dialogAlert(isDialog) {
            if (!this.isDialog && isDialog) {
                this.isDialog = true
                Dialog.alert({
                    title: '商品信息变更',
                    message: '该组货杆中部分商品信息发生变更，请确认无误后再购买',
                    confirmButtonText: '我知道了'
                }).then(() => {})
            }
        },
        jumpToProduct(product) {
            const params = {
                jumpUrl: 'productDetail://',
                productCode: product.productCode
            }
            utils.postMessage('', params)
        },
        openSku(item, index) {
            window.sa.track('IPX_WEB', {
                page: 'groupListDetail', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'modifySku' // 按钮唯一标识，取个语义化且不重名的名字
            })
            this.seletedDetailsItem = {}
            this.colorSkuAction = '0'
            this.showSku = !this.showSku
            this.seletedDetailsItem = item
            this.seletedItemIndex = index
            let { colorSkuList } = this.seletedDetailsItem
            let seletedColorSkuSumNum = 0

            colorSkuList.forEach((item, index) => {
                let seletedColorSkuNum = 0
                item.skuList.forEach((skuItem, skuIndex) => {
                    skuItem.skuValue = Number(skuItem.entityStock) > 0 ? Number(skuItem.num) : 0
                    // skuItem.num = Number(skuItem.entityStock) > 0 ? Number(skuItem.num) : 0
                    seletedColorSkuNum = Number(skuItem.skuValue) + Number(seletedColorSkuNum)
                })
                item.seletedColorSkuNum = seletedColorSkuNum
                seletedColorSkuSumNum = Number(item.seletedColorSkuNum) + Number(seletedColorSkuSumNum)
            })

            this.seletedDetailsItem.seletedColorSkuSumNum = seletedColorSkuSumNum
        },
        getGroupDetail() {
            // 获取组货详情列表
            const params = {
                groupGoodsId: this.$route.query.groupId
            }
            this.$api.groupGoods
                .getGroupListDetail(params)
                .then(res => {
                    if (res.code === 0) {
                        const { data } = res
                        const { groupGoodsRecords } = data

                        this.groupDetail = data
                        this.groupGoodsRecords = groupGoodsRecords
                        this.groupGoodsRecords = this.groupGoodsRecords.map(item => {
                            return {
                                ...item,
                                disabled: false
                            }
                        })
                        this.groupName = this.groupDetail.name
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        skuCommit(seletedDetailsItem) {
            // sku修改 确定
            this.seletedDetailsItem = seletedDetailsItem
            let groupProducts = []

            const params = {
                groupGoodsId: this.groupDetail.groupGoodsId,
                name: this.groupDetail.name
            }

            this.seletedDetailsItem.colorSkuList.forEach((item, index) => {
                item.skuList.forEach((skuItem, skuIndex) => {
                    let sku = {
                        groupGoodsRecordId: '',
                        num: skuItem.skuValue,
                        productAtrNumber: this.seletedDetailsItem.productAtrNumber,
                        productCode: this.seletedDetailsItem.productCode,
                        productSkuCode: skuItem.productSkuCode,
                        starasSkuCode: skuItem.starasSkuCode
                    }
                    groupProducts.push(sku)
                })
            })
            params.groupGoodsRecords = groupProducts

            this.$api.groupGoods
                .updateGroupListDetail(params)
                .then(res => {
                    if (res.code === 0) {
                        this.getGroupDetail()
                        this.$toast.success('已修改')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            this.showSku = false
        },
        changeGroupName() {
            this.$router.push({
                path: '/group/changeGroupName',
                query: { name: this.groupName, groupGoodsId: this.groupDetail.groupGoodsId }
            })
        },
        goPay() {
            window.sa.track('IPX_WEB', {
                page: 'groupListDetail', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'editPurchaseNow' // 按钮唯一标识，取个语义化且不重名的名字
            })
            order.createOrder(this.groupGoodsRecords, this.groupGoodsId, true)
        }
    }
}
</script>

<style lang="less" scoped>
.header-save {
  font-size: 14px;
  font-weight: 400;
  color: @color-ec;
}
.panel {
  background-color: white;
  height: calc(100vh - 65px);
  overflow-y: scroll;
  padding: 16px;
  margin-top: -1px;
}
.top-content {
  padding: 16px 0 16px 12px;
  background: white;
  box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.08);
  border-radius: 8px;
  .group-name {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    > p {
      font-size: 16px;
      font-weight: 500;
      color: @color-c1;
      .ellipsis();
    }
    > button {
      font-size: 14px;
      font-weight: 500;
      color: @color-ec;
      width: 20%;
      background: none;
    }
  }
  > span {
    font-size: 14px;
    font-weight: 500;
    color: @color-c3;
  }
}
.list-title {
  margin-top: 32px;
  position: relative;
  height: 28px;
  > p {
    position: absolute;
    font-size: 20px;
    font-weight: 500;
    color: @color-ec;
    line-height: 28px;
  }
  .dot {
    position: absolute;
    width: 12px;
    height: 12px;
    background: #fad961;
    border-radius: 6px;
    top: 0;
    left: 73px;
    z-index: 0;
  }
}
.list-content {
  margin-top: 16px;
  .product-cell {
    background: white;
    height: 106px;
    margin-bottom: 32px;
    display: flex;
    > img {
      flex: none;
      width: 106px;
      height: 106px;
      border-radius: 4px;
      object-fit: cover;
    }
    .product-info {
      margin-left: 12px;
      width: calc(100vw - 152px);
      > p {
        font-size: 16px;
        font-weight: 500;
        color: @color-c1;
        .ellipsis();
      }
      .disableTitle {
        font-size: 16px;
        font-weight: 500;
        color: @color-c4;
        .ellipsis();
      }
      .sku-list {
        margin-top: 8px;
        height: 55px; //// 去掉
        overflow: hidden;
        overflow-y: auto; //// 去掉
        > p {
          font-size: 12px;
          font-weight: 400;
          color: @color-c3;
          line-height: 16px;
          margin: 8px 0;
        }
        .disableSku {
          font-size: 12px;
          font-weight: 400;
          color: @color-c4;
          line-height: 16px;
          margin: 8px 0;
        }
        .tips {
          font-size: 12px;
          font-weight: 400;
          color: @color-rc;
          height: 15px;
        }
      }
      .price {
        font-size: 18px;
        font-weight: 500;
        color: @color-rc;
        margin-top: 8px;
      }
      .disablePrice {
        font-size: 18px;
        font-weight: 500;
        color: @color-c4;
        margin-top: 8px;
      }
      > button {
        width: 80px;
        height: 28px;
        background: @color-ec1;
        border-radius: 18px;
        font-size: 12px;
        font-weight: 500;
        color: @color-ec;
        float: right;
        transform: translate(0, -25px);
      }
      > button:disabled {
        background: rgba(249, 250, 252, 1);
        color: @color-c4;
      }
    }
  }
}
.footer-content {
  background-color: white;
  // height: 49px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0px -1px 6px 0px rgba(33, 44, 98, 0.06);
  border-radius: 12px 12px 0px 0px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  .total-price {
    font-size: 14px;
    font-weight: 400;
    color: @color-c1;
    line-height: 49px;
    .yen {
      font-size: 12px;
      font-weight: 400;
      color: @color-rc;
    }
    .price {
      font-size: 18px;
      font-weight: 500;
      color: @color-rc;
      margin-bottom: 16px;
    }
  }
  > button {
    width: 96px;
    height: 40px;
    background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    color: white;
    align-self: center;
  }
}
</style>
