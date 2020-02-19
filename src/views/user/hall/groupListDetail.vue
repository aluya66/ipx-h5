<template>
  <layout-view>
    <c-header
      class="my-header"
      slot="header"
      :left-arrow="true"
      :pageOutStatus="isNative"
    >
      <div class="title-header" slot="title">
        编辑组货方案
      </div>
    </c-header>
    <!-- <div class="line" :style="marginTop"></div> -->
    <div class="panel" :style="getBottomOffset(69)">
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
          <div class="photo_state">
            <img :src="goodPicture(item)" alt="" @click="jumpToProduct(item)" />
            <div class="state_text" v-show="tipStr(item) !== ''" >{{ tipStr(item) }}</div>
          </div>
          <div class="product-info">
            <p
              :class="[item.disabled ? 'disableTitle' : '']"
              @click="jumpToProduct(item)"
            >
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
            </div>
            <div class="sale_price">
                <span :class="[item.disabled ? 'disablePrice' : 'price']">¥<span>{{ cashFormat(item.spuRetailPrice) }}</span></span>
                <span class="tip_title">建议零售价</span>
            </div>
            <div class="footer-btn">
              <p :class="[item.disabled ? 'disablePrice' : 'price']">
                ¥<span>{{ cashFormat(item.spuTshPrice) }}</span>
              </p>
              <button @click="openSku(item, index)" :disabled="item.disabled">
                调整规格
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-content" :style="getBottomOffset(0)">
        <div class=" total-price">
          <div class="group_price">
            ¥<span>{{ cashFormat(groupDetail.totalPrice) }}</span>
          </div>
          <div class="sale_price">
            <span class="price">¥<span>{{ cashFormat(groupDetail.totalRetailPrice) }}</span></span>
            <span class="tip_title">零售货值</span>
          </div>
        </div>
        <div class="group_tool_btn">
          <button class="poster" @click="addPoster">生成海报</button>
          <button class="pay" @click="goPay">立即采购</button>
        </div>
      </div>
    </div>
    <!-- sku选择 -->
    <sku-select
      :seletedDetailsItem="seletedDetailsItem"
      :goodsId="goodsId"
      :showSku="showSku"
      @pointClick="skuCommit"
    />
  </layout-view>
</template>

<script>
import skuSelect from '@/views/common/skuSelect.vue'
import order from './groupCreateOrder'
import cash from './cashFormat.js'
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
            seletedItemIndex: '', // 选择调整商品下标
            isOrderSuply: false,
            isNative: false
        }
    },
    mounted() {
        if (this.$route.query.orderId !== undefined) {
            this.isOrderSuply = true
            this.suplyGoods()
        }
    },
    activated() {
    // 上报页面事件
        window.sa.track('IPX_WEB', {
            page: 'groupListDetail',
            type: 'pageView',
            event: 'pageView'
        })
        this.showSku = false
        this.isNative = false
        this.isDialog = false
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        if (this.$route.query.orderId === undefined) {
            this.groupDetail = {}
            this.groupGoodsRecords = []
            this.isOrderSuply = false
            this.getGroupDetail()
        }
        if (this.$route.query.groupName !== undefined) {
            this.groupName = this.$route.query.groupName
        }
        utils.postMessage('changeStatus', 'default')
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
        marginTop() {
            let basepara = utils.getStore('baseParams')
            if (basepara.isIphoneX) {
                return 'top:0.88rem'
            }
            return 'top:0.64rem'
        },
        goodPicture() {
            return function(good) {
                return good.colorSkuList[0].imgUrl
            }
        },
        tipStr() {
            return function(value) {
                if (value.productShelves === 0) {
                    value.disabled = true
                    value.unablepay = true
                    return '商品已失效' // 下架 置灰
                }
                let batchNum = value.minBatchNum
                let stockAll = 0
                let selectAll = 0
                let isChanged = false
                let isEnough = false
                value.colorSkuList.forEach((item, index) => {
                    item.skuList.forEach((skuItem, skuIndex) => {
                        if (skuItem.entityStock === 0 && skuItem.num !== 0) {
                            isChanged = true
                        }
                        selectAll += skuItem.num
                        stockAll += skuItem.entityStock
                    })
                })
                if (selectAll >= batchNum) {
                    isEnough = true
                }
                if (stockAll === 0 || stockAll < batchNum) {
                    value.disabled = true
                    value.unablepay = true
                    return '库存不足，暂不可购买' // 已选商品总库存不足起订量、已选商品已选商品总库存为0 置灰
                }
                if (!isEnough && stockAll >= batchNum) {
                    value.unablepay = true
                    return '不满足起订量，需手动调整' // 已选商品sku部分库存为0，不满足起批量，但总库存满足起订量
                }
                if (isChanged && isEnough) {
                    return '商品规格变更，请再次确认' // 已选商品sku部分库存为0，但剩余已选的sku满足起批量
                }
                return ''
            }
        }
    },
    methods: {
        cashFormat(price) {
            return cash.changeFormat(price)
        },
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        dialogAlert(isDialog) {
            if (!this.isDialog && isDialog) {
                this.isDialog = true
                Dialog.alert({
                    title: '商品信息变更',
                    message: '该组货杆中部分商品信息发生变更，请确认无误后再购买',
                    confirmButtonText: '我知道了',
                    confirmButtonColor: '#007AFF'
                }).then(() => {})
            }
        },
        jumpToProduct(product) {
            window.sa.track('IPX_WEB', {
                page: 'groupListDetail', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'editItemClick' // 按钮唯一标识，取个语义化且不重名的名字
            })
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
            this.showSku = true//! this.showSku
            this.seletedItemIndex = index
            this.seletedDetailsItem = this.groupGoodsRecords[this.seletedItemIndex]
            this.seletedDetailsItem = {
                ...this.seletedDetailsItem,
                seletedColorSkuSumNum: 0
            }

            let { colorSkuList } = this.seletedDetailsItem
            let seletedColorSkuSumNum = 0

            colorSkuList.forEach((item, index) => {
                let seletedColorSkuNum = 0
                item.skuList.forEach((skuItem, skuIndex) => {
                    skuItem.skuValue =
            Number(skuItem.entityStock) > 0 ? Number(skuItem.num) : 0
                    seletedColorSkuNum =
            Number(skuItem.skuValue) + Number(seletedColorSkuNum)
                })
                item.seletedColorSkuNum = seletedColorSkuNum
                seletedColorSkuSumNum =
          Number(item.seletedColorSkuNum) + Number(seletedColorSkuSumNum)
            })
            this.seletedDetailsItem.seletedColorSkuSumNum = seletedColorSkuSumNum
        },
        suplyGoods() {
            const params = {
                orderCode: this.$route.query.orderId
            }
            this.$api.groupGoods
                .suplyGoods(params)
                .then(res => {
                    const { groupGoodsRecords } = res

                    this.groupDetail = res
                    this.groupGoodsRecords = groupGoodsRecords
                    this.groupGoodsRecords = this.groupGoodsRecords.map(item => {
                        return {
                            ...item,
                            disabled: false,
                            unablepay: false
                        }
                    })
                    this.groupName = this.groupDetail.name
                })
                .catch(err => {
                    console.log(err)
                })
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
                                disabled: false,
                                unablepay: true
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
            this.groupGoodsRecords[this.seletedItemIndex] = seletedDetailsItem
            let totalPrice = 0
            let groupProducts = []
            const params = {
                groupGoodsId: this.groupDetail.groupGoodsId,
                name: this.groupDetail.name
            }
            this.seletedDetailsItem.colorSkuList.forEach((item, index) => {
                item.skuList.forEach((skuItem, skuIndex) => {
                    skuItem.num = skuItem.skuValue
                    let sku = {
                        groupGoodsRecordId: skuItem.groupGoodsRecordId,
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
            if (this.isOrderSuply) {
                this.groupGoodsRecords.forEach((product, index) => {
                    let unablepay = product.unablepay
                    product.colorSkuList.forEach((item, index) => {
                        item.skuList.forEach((skuItem, skuIndex) => {
                            if (!unablepay) {
                                totalPrice += skuItem.tshPrice * skuItem.num
                            }
                        })
                    })
                })
                this.groupDetail.totalPrice = totalPrice
                this.$toast.success('已修改')
                this.showSku = false
                return
            }
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
                query: {
                    isSuply: this.isOrderSuply,
                    name: this.groupName,
                    groupGoodsId: this.groupDetail.groupGoodsId
                }
            })
        },
        addPoster() {
            let products = this.groupGoodsRecords.filter(item => item.productShelves !== 0)
            if (products.length === 0) {
                this.$toast('该组货所有商品已失效，无法生成海报')
                return
            }
            this.$router.push({
                path: '/poster/eidtGroupProducts',
                query: { groupCode: this.groupDetail.groupCode }
            })
        },
        goPay() {
            window.sa.track('IPX_WEB', {
                page: 'groupListDetail', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'editPurchaseNow' // 按钮唯一标识，取个语义化且不重名的名字
            })
            order.createOrder(
                this.groupName,
                this.groupGoodsRecords,
                this.groupDetail.groupGoodsId,
                true
            )
        }
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
.line {
  position: fixed;
  width: 100%;
  background-color: @color-c7;
  height: 1px;
  z-index: 100;
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
    font-weight: 400;
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
    position: relative;
    .photo_state {
      position: relative;
      > img {
        flex: none;
        width: 106px;
        height: 106px;
        border-radius: 4px;
        object-fit: cover;
        border: 1px solid @color-c7;
      }
      .state_text {
        position: absolute;
        width:106px;
        height:18px;
        background:rgba(0,0,0,0.5);
        border-radius:0px 0px 4px 4px;
        font-size:10px;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height:18px;
        top: 88px;
      }
    }
    .product-info {
      margin-left: 12px;
      width: calc(100vw - 152px);
      > p {
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        color: @color-c1;
        .ellipsis();
      }
      .disableTitle {
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        color: @color-c4;
        .ellipsis();
      }
      .sku-list {
        // margin-top: 8px;
        overflow: hidden;
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
        // .tips {
        //   font-size: 12px;
        //   font-weight: 400;
        //   color: @color-rc;
        //   height: 15px;
        // }
      }
      .sale_price {
        margin-top: 8px;
        // margin-bottom: 4px;
        .price {
          font-size: 12px;
          font-weight: 400;
          color: @color-c1;
          line-height: 14px;
          font-family: "alibabaRegular";
          > span {
            font-size: 14px;
            font-weight: bold;
            color: @color-c1;
            line-height: 14px;
            font-family: "alibabaBold";
          }
        }
        .disablePrice {
          font-size: 12px;
          font-weight: 400;
          color: @color-c4;
          font-family: "alibabaRegular";
          > span {
            font-size: 14px;
            font-weight: bold;
            color: @color-c4;
            font-family: "alibabaBold";
          }
        }
        .tip_title {
          font-size:10px;
          font-weight:400;
          color: @color-c3;
          line-height:12px;
          background:rgba(244,245,247,1);
          margin-left: 10px;
        }
      }
      .footer-btn {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: 12px;
          font-weight: 400;
          color: @color-rc;
          font-family: "alibabaRegular";
          margin-top: 8px;
          > span {
            font-size: 18px;
            font-weight: bold;
            color: @color-rc;
            font-family: "alibabaBold";
          }
        }
        .disablePrice {
          font-size: 12px;
          font-weight: 400;
          color: @color-c4;
          font-family: "alibabaRegular";
          margin-top: 8px;
          > span {
            font-size: 18px;
            font-weight: bold;
            color: @color-c4;
            font-family: "alibabaBold";
          }
        }
        .yen {
          font-size: 12px;
          font-weight: 400;
          color: @color-rc;
          font-family: "alibabaRegular";
        }
        > button {
          width: 80px;
          height: 28px;
          background: @color-ec1;
          border-radius: 18px;
          font-size: 12px;
          font-weight: 500;
          color: @color-ec;
        }
        > button:disabled {
          background: rgba(249, 250, 252, 1);
          color: @color-c4;
        }
      }
    }
  }
}
.footer-content {
  background-color: white;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  box-shadow: 0px -1px 6px 0px rgba(33, 44, 98, 0.06);
  border-radius: 12px 12px 0px 0px;
  padding: 5px 16px 5px;
  .group_price {
    font-size: 12px;
    font-weight: 400;
    color: rgba(245, 48, 48, 1);
    line-height: 24px;
    font-family: "alibabaRegular";
    > span {
      font-size: 20px;
      font-weight: bold;
      color: rgba(245, 48, 48, 1);
      line-height: 24px;
      font-family: "alibabaBold";
    }
  }
  .sale_price {
    margin-bottom: 5px;
    .price {
      font-size: 12px;
      font-weight: 400;
      color: @color-c1;
      line-height: 14px;
      font-family: "alibabaRegular";
      > span {
        font-size: 14px;
        font-weight: bold;
        color: @color-c1;
        line-height: 14px;
        font-family: "alibabaBold";
      }
    }
    .tip_title {
      font-size:10px;
      font-weight:400;
      color: @color-c3;
      line-height:12px;
      background:rgba(244,245,247,1);
      margin-left: 4px;
    }
  }
  .group_tool_btn {
    display: flex;
    margin-bottom: 5px;
     .poster {
      width: 96px;
      height: 40px;
      background:linear-gradient(322deg,rgba(238,236,255,1) 0%,rgba(216,212,255,1) 100%);border-radius:20px;
      font-size:14px;
      font-weight:500;
      color:rgba(60,92,246,1);
      // margin-right: 20px;
      align-self: center;
    }
    .pay {
      width: 96px;
      height: 40px;
      background: linear-gradient(
        135deg,
        rgba(85, 122, 244, 1) 0%,
        rgba(114, 79, 255, 1) 100%
      );
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
      color: white;
      align-self: center;
      margin-left: 12px;
    }
  }

}
</style>
