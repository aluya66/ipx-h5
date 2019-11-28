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
                })
                item.seletedColorSkuNum = seletedColorSkuNum
                seletedColorSkuSumNum =
          Number(item.seletedColorSkuNum) + Number(seletedColorSkuSumNum)
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
                        this.groupName = this.groupDetail.name
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        skuCommit(seletedDetailsItem) {
            // sku修改 确定
            this.showSku = false
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

            this.$api.groupGoods.updateGroupListDetail(params).then(res => {
                if (res.code === 0) {
                    this.getGroupDetail()
                    this.$toast.success('已修改')
                }
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
