<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative" :showBorderBottom='true'>
            <div slot="title">选择海报商品</div>
        </c-header>
        <empty-view class="empty" v-if="isShowEmpty" emptyType="error" emptyDesc="暂无可选商品" />
        <div v-else class="productSelect-list" :style="getBottomOffset(49)">
            <div class="productSelect-item" v-for="item in products" :key="item.productCode" @click="handleSelectItem(item)" >
                <div>
                    <img class="select-icon" :src="item.select ? select_sel : select_def" alt="">
                </div>
                <div>
                    <img class="product-mainImg" :src="item.colorSkuList[0].imgUrl" alt="">
                </div>
                <div class="product-info">
                    <div class="title-contain">
                        <p>{{item.productName}}</p>
                        <p>{{selectSkuStr(item)}}</p>
                    </div>
                    <div class="price-contain">
                        <p class="suggest-price" >{{parseFloat(item.spuRetailPrice).toFixed(2)}}<span>建议零售价</span></p>
                        <p class="sale-price">{{parseFloat(item.spuTshPrice).toFixed(2)}}</p>
                    </div>
                </div>
            </div>
        </div>
        <fixed-view class="footer-shadow" v-if="products.length > 0" >
            <template slot="footerContain">
                <div class="selectContain">
                    <div class="select" @click="handleSelectAll">
                    <p>
                        <img :src="isSelectAll ? select_sel : select_def" alt="" /><span
                        >全选</span
                        >
                    </p>
                    </div>
                    <section class="nextBtn" @click="handleNext">
                    下一步{{ selectItems.length > 0 ? `(${selectItems.length})` : "" }}
                    </section>
                </div>
            </template>
        </fixed-view>
    </layout-view>
</template>

<script>
import FixedView from '../../common/bottomFixedView.vue'
import utils from 'utils'
import EmptyView from '../../error/emptyView.vue'
export default {
    components: {
        FixedView,
        EmptyView
    },
    data() {
        return {
            products: [],
            isSelectAll: false,
            select_def: require('../../../themes/images/groupGoods/checkbox_default.png'),
            select_sel: require('../../../themes/images/groupGoods/selected_icon.png'),
            selectAllString: '',
            selectItems: [],
            isNative: false,
            isShowEmpty: false
        }
    },
    watch: {
        selectItems(val) {
            this.isSelectAll = val.length === this.products.length
        },
        '$route' (to, from) {
            if ((from.name === 'groupListDetail' || from.name === 'groupDetail') && to.name === 'eidtGroupProducts') {
                this.selectItems = []
                this.isSelectAll = false
                this.getGroupDetail()
            }
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        selectSkuStr(val) {
            if (val.colorSkuList && val.colorSkuList.length) {
                let colorObj = val.colorSkuList[0]
                let colorStr = colorObj.attrColorValue + '：'
                let arr = []
                colorObj.skuList.forEach(item => {
                    arr.push(item.attrSpecValue)
                })
                return colorStr + arr.join('，')
            }
        },
        handleNext () {
            if (this.selectItems.length <= 0) {
                this.$toast('请选择海报商品')
                return
            }
            let allSelect = this.products.filter(item => {
                return item.select
            })
            let allSelectCode = []
            allSelect.forEach(item => {
                allSelectCode.push(item.productCode)
            })
            utils.setStore('groupProductCodes', allSelectCode)
            this.$router.push({
                path: '/poster/editGroupPoster',
                query: { groupCode: this.$route.query.groupCode }
            })
        },
        handleSelectItem(item) {
            item.select = !item.select
            let index = this.selectItems.indexOf(item)
            if (index < 0) {
                this.selectItems.push(item)
            } else {
                this.selectItems.splice(index, 1)
            }
        },
        handleSelectAll() {
            if (this.selectItems.length === this.products.length) {
                this.selectItems = []
                this.products.map(item => {
                    item.select = false
                })
            } else {
                this.selectItems = []
                this.products.map(item => {
                    item.select = true
                    this.selectItems.push(item)
                })
            }
        },
        contains(a, obj) {
            var i = a.length
            while (i--) {
                if (a[i].productCode === obj.productCode) {
                    return true
                }
            }
            return false
        },
        getGroupDetail() {
            const params = {
                groupCode: this.$route.query.groupCode
            }
            this.$api.groupGoods
                .getGroupDetail(params)
                .then(res => {
                    this.products = res.groupGoodsSpus.filter(item => item.productShelves !== 0)
                    this.products = this.products.map(item => {
                        return {
                            ...item,
                            select: false
                        }
                    })
                    let productList = this.$route.query.productList
                    this.products.forEach(item => {
                        let index = this.contains(productList, item)
                        if (index) {
                            item.select = true
                            this.selectItems.push(item)
                        }
                    })
                    this.isShowEmpty = this.products.length === 0
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        this.getGroupDetail()
    },
    activated() {
        // this.selectAllString = ''

    }
}
</script>

<style lang="less" scoped>
.empty {
    margin-top: 24px;
    border-radius: 12px 12px 0px 0px;
    padding-top: 112px;
}

.footer-shadow {
    box-shadow:0px -1px 6px 0px rgba(33,44,98,0.06);
    border-radius:12px 12px 0px 0px;
}
.selectContain {
    // box-shadow:0px -1px 6px 0px rgba(33,44,98,0.06);
    // border-radius:12px 12px 0px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    height: 49px;
    .select {
      font-size: 12px;
      color: @color-c1; // height: 49px;
      // line-height: 49px;
      // vertical-align: middle;
      text-align: center;
      img {
        vertical-align: middle;
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 8px;
      }
    }
    .nextBtn {
      width: 100px;
      height: 40px;
      border-radius: 20px;
      background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      line-height: 40px;
      text-align: center;
    }
  }
.productSelect-list {
    overflow: auto;
    height: 100%;
    .productSelect-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 16px 16px;
        .select-icon {
            width: 20px;
            height: 20px;
            object-fit: contain;
            // display: block;
        }
        .product-mainImg {
            margin-left: 16px;
            object-fit: cover;
            width: 106px;
            height: 106px;
            border-radius:4px;
            border: 1px solid @color-c7;
        }
        .product-info {
            display: flex;
            flex-direction: column;
            padding: 0px 0;
            justify-content: space-between;
                .title-contain {
                    position: relative;
                    p {
                        &:nth-child(1) {
                            // display: inline-block;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            height: 22px;
                            font-size:16px;
                            font-weight:bold;
                            color:@color-c1;
                            line-height:22px;
                            width: calc(100vw - 186px);
                            margin: 0 16px 0 12px;
                        }
                        &:nth-child(2) {
                            font-size:12px;
                            font-weight:400;
                            color:@color-c3;
                            line-height:16px;
                            margin: 8px 16px 0 12px;
                        }
                    }
                }
                .price-contain {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    margin-top: 16px;
                    p {
                        &:nth-child(1) {
                            // height: 16px;
                            font-size:14px;
                            font-weight:bold;
                            color:@color-c1;
                            margin-left: 12px;
                            font-family: "alibabaBold";
                            margin-bottom: 4px;
                            span {
                                font-family:PingFangSC-Medium,PingFang SC;
                                margin-left: 12px;
                                font-size:10px;
                                font-weight:bold;
                                color:@color-c3;
                                height: 16px;
                                line-height: 16px;
                                background:rgba(244,245,247,1);
                                padding: 1px 4px;
                                border-top-left-radius: 0;
                                border-top-right-radius: 3px;
                                border-bottom-right-radius: 3px;
                                border-bottom-left-radius: 3px;
                            }
                            &::before {
                                content: '¥';
                                font-family: "alibabaRegular";
                                width: 20px;
                                font-weight:400;
                                line-height: 16px;
                                font-size: 12px;
                            }
                        }
                        &:nth-child(2) {
                            // height: 24px;
                            line-height: 24px;
                            font-size:22px;
                            font-weight:bold;
                            color:#F41F1F;
                            margin-left: 12px;
                            font-family: "alibabaBold";
                            &::before {
                                content: '¥';
                                font-family: "alibabaRegular";
                                width: 20px;
                                font-weight:bold;
                                line-height: 24px;
                                font-size: 12px;
                            }
                        }
                    }
            }
        }
    }
}
</style>
