<template>
  <layout-view>
    <c-header
      slot="header"
      :left-arrow="true"
    >
      <div slot="title">组货清单详情</div>
      <template
        slot="right"
        tag="div"
      >
        <span class="header-save">保存</span>
      </template>
    </c-header>
    <div class="panel">
      <div class="top-content">
        <span>组货名称</span>
        <p>{{groupName}}</p>
        <button @click="routerLink(`/changeGroupName/${groupName}`)">更改</button>
      </div>
      <div class="list-title">
        <div class="dot"></div>
        <p>样衣列表</p>
      </div>
      <div class="list-content">
        <div
          class="product-cell"
          v-for="(item,index) in groupGoodsRecords"
          :key="index"
        >
          <img
            :src="item.mainPic"
            alt=""
          >
          <div class="product-info">
            <p>{{item.productName}}</p>
            <div class="sku-list">
              <p
                for=""
                v-for="(sku,i) in item.colorSkuList"
                :key="i"
              >{{sku | selectSkuStr}}</p>
            </div>
            <p class="price">¥{{item.spuTshPrice}}</p>
            <button @click="openSku(item,index)">调整规格</button>
          </div>
        </div>
      </div>
      <div class="footer-content">
        <div class="total-price">合计：<span class="yen">¥</span><span class="price">{{groupDetail.totalPrice}}</span></div>
        <button>立即采购</button>
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
import utils from 'utils'
export default {
    data() {
        return {
            showSku: false, // 是否弹出sku选择框
            groupName: '深色系', // 组货名称
            groupGoodsId: '', // 组货id
            goodsId: '',
            colorSkuAction: '',
            groupDetail: {}, // 组货基本信息
            groupGoodsRecords: [], // 商品列表数据源

            seletedDetailsItem: {}, // sku数据源
            seletedItemIndex: '' // 选择调整商品下标
        }
    },
    activated() {
        this.groupName = utils.getStore('groupName') || '未设置'
    },
    created() {
        this.getGroupDetail()
    // this.groupGoods()
    },
    components: {
        skuSelect
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
    methods: {
        openSku(item, index) {
            this.seletedDetailsItem = {}
            this.colorSkuAction = 0
            this.showSku = !this.showSku
            this.seletedDetailsItem = item
            this.seletedItemIndex = index
            let { colorSkuList } = this.seletedDetailsItem
            let seletedColorSkuSumNum = 0

            colorSkuList.forEach((item, index) => {
                let seletedColorSkuNum = 0
                item.skuList.forEach((skuItem, skuIndex) => {
                    skuItem.skuValue =
            Number(skuItem.entityStock) > 0 ? Number(skuItem.groupNum) : 0
                    seletedColorSkuNum =
            Number(skuItem.skuValue) + Number(seletedColorSkuNum)
                    //   debugger
                })
                item.seletedColorSkuNum = seletedColorSkuNum
                seletedColorSkuSumNum =
          Number(item.seletedColorSkuNum) + Number(seletedColorSkuSumNum)
                //   debugger
            })

            this.seletedDetailsItem.seletedColorSkuSumNum = seletedColorSkuSumNum
            //   debugger
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
                        // let seletedTotalItem = 0
                        // let seletedStatus = true
                        // this.groupGoodsRecords.forEach((item, index) => {
                        //     if (item.defaultSelectedkinds > 0) {
                        //         seletedTotalItem++
                        //     } else {
                        //         seletedStatus = false
                        //     }
                        // })
                        // this.groupDetail.seletedTotalItem = seletedTotalItem
                        // this.groupDetail.seletedStatus = seletedStatus
                        this.groupName = this.groupDetail.name
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        groupGoods() {
            let params = {
                groupGoodsInfos: [
                    {
                        groupGoodsRecords: [
                            {
                                num: 2,
                                productAtrNumber: '19Y9302QL480',
                                productCode: '051705137353',
                                productSkuCode: '051705137353000',
                                starasSkuCode: '19Y9302QL480XWKX'
                            },
                            {
                                num: 3,
                                productAtrNumber: '19Y9302QL480',
                                productCode: '051705137353',
                                productSkuCode: '051705137353002',
                                starasSkuCode: '19Y9302QL480XWEW'
                            },
                            {
                                num: 1,
                                productAtrNumber: '1HZ9401S2552',
                                productCode: '052205137352',
                                productSkuCode: '052205137352000',
                                starasSkuCode: '1HZ9401S2552XWHM'
                            }
                        ],
                        name: '测试组货完成'
                    }
                ]
            }
            this.$api.groupGoods
                .groupGoods(params)
                .then(res => {
                    console.log(res)
                    debugger
                })
                .catch(err => {
                    console.log(err)
                })
        },
        skuCommit(seletedDetailsItem) {
            // sku修改 确定
            this.showSku = false
            this.seletedDetailsItem = seletedDetailsItem

            let seletedTotalNum = 0 // 总件数
            let seletedTotalKinds = 0 // 总种类
            let defaultSelectedPieces = 0 // 款件数
            let defaultSelectedkinds = 0 // 款种类
            let totalAmount = 0 // 总价

            this.seletedDetailsItem.colorSkuList.forEach((item, index) => {
                if (item.seletedColorSkuNum > 0) {
                    defaultSelectedPieces =
            Number(item.seletedColorSkuNum) + defaultSelectedPieces
                    defaultSelectedkinds++
                }
            })

            this.seletedDetailsItem.defaultSelectedPieces = defaultSelectedPieces
            this.seletedDetailsItem.defaultSelectedkinds = defaultSelectedkinds

            this.groupGoodsRecords.forEach((item, index) => {
                totalAmount =
          Number(item.defaultSelectedPieces) * Number(item.tshPrice) +
          Number(totalAmount)
                item.colorSkuList.forEach((skuItem, skuIndex) => {
                    seletedTotalNum =
            Number(skuItem.seletedColorSkuNum) + Number(seletedTotalNum)
                    if (skuItem.seletedColorSkuNum > 0) {
                        seletedTotalKinds++
                    }
                })
            })

            this.groupDetail.seletedTotalKinds = seletedTotalKinds
            this.groupDetail.seletedTotalNum = seletedTotalNum
            this.groupDetail.totalAmount = totalAmount
            this.groupDetail.totalDiscountAmount = totalAmount

            const params = {
                groupGoodsId: this.groupDetail.groupId,
                groupGoodsRecords: {
                    num: 1,
                    productAtrNumber: '',
                    productCode: '',
                    productSkuCode: '',
                    starasSkuCode: ''
                },
                name: this.groupDetail.name
            }
            this.$api.groupGoods.updateGroupListDetail(params).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })

            this.showSku = false
        }
    }
}
</script>

<style lang='less' scoped>
.header-save {
  font-size: 14px;
  font-weight: 400;
  color: @color-ec;
}
.panel {
  background-color: white;
  height: calc(100vh - 85px);
  overflow-y: scroll;
  padding: 16px;
  margin-top: -1px;
}
.top-content {
  padding: 16px 12px;
  background: white;
  box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.08);
  border-radius: 8px;
  > p {
    font-size: 16px;
    font-weight: 500;
    color: @color-c1;
    margin-top: 10px;
  }
  > span {
    font-size: 14px;
    font-weight: 500;
    color: @color-c3;
  }
  > button {
    font-size: 14px;
    font-weight: 500;
    color: @color-ec;
    float: right;
    transform: translateY(-16px);
    background: none;
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
    box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.06);
    border-radius: 8px;
    padding: 16px;
    height: 166px;
    margin-bottom: 20px;
    display: flex;
    > img {
      flex: none;
      width: 100px;
      height: 134px;
      border-radius: 4px;
      object-fit: cover;
    }
    .product-info {
      margin-left: 12px;
      // margin-right: 16px;
      width: calc(100vw - 176px);
      > p {
        font-size: 16px;
        font-weight: 500;
        color: @color-c1;
        .ellipsis();
      }
      .sku-list {
        margin-top: 8px;
        margin-bottom: 16px;
        height: 80px;
        max-height: 80px;
        overflow: hidden;
        overflow-y: auto;
        > p {
          font-size: 12px;
          font-weight: 400;
          color: @color-c3;
          line-height: 16px;
          margin: 8px 0;
        }
      }
      .price {
        font-size: 18px;
        font-weight: 500;
        color: @color-rc;
        margin-bottom: 16px;
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
        transform: translate(0, -44px);
      }
    }
  }
}
.footer-content {
  background-color: white;
  height: 49px;
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
    background: linear-gradient(
      135deg,
      rgba(85, 122, 244, 1) 0%,
      rgba(114, 79, 255, 1) 100%
    );
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    color: white;
    align-self: center;
  }
}
</style>
