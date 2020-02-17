<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true">
            <div slot="title">选择海报商品</div>
        </c-header>
        <div class="product-list" :style="getBottomOffset(49)">
            <div class="product-item" v-for="item in products" :key="item.productCode" @click="handleSelectItem(item)" >
                <img :src="item.select ? select_sel : select_def" alt="">
                <img :src="item.mainPic" alt="">
                <div class="product-info">
                    <div class="title-contain">
                        <p>{{item.productName}}</p>
                        <p>{{selectSkuStr(item)}}</p>
                    </div>
                    <div class="price-contain">
                        <p class="suggest-price" >{{item.spuRetailPrice}}<span>建议零售价</span></p>
                        <p class="sale-price">{{item.spuTshPrice}}</p>
                    </div>
                </div>
            </div>
        </div>
        <fixed-view>
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

export default {
    components: {
        FixedView
    },
    data() {
        return {
            products: [],
            isSelectAll: false,
            select_def: require('../../../themes/images/groupGoods/checkbox_default.png'),
            select_sel: require('../../../themes/images/groupGoods/selected_icon.png'),
            selectAllString: '',
            selectItems: []
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
            this.selectItems.push(item)
        },
        handleSelectAll() {
            this.selectItems = []
            this.isSelectAll = !this.isSelectAll
            this.products.map(item => {
                item.select = this.isSelectAll
                this.selectItems.push(item)
            })
        },
        getGroupDetail() {
            const params = {
                groupCode: 'GR4801551916036180' // this.$route.query.groupCode
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
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    activated() {
        this.selectItems = []
        this.isSelectAll = false
        this.selectAllString = ''
        this.getGroupDetail()
    }
}
</script>

<style lang="less" scoped>
.selectContain {
    box-shadow:0px -1px 6px 0px rgba(33,44,98,0.06);
    border-radius:12px 12px 0px 0px;
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
      font-weight: 500;
      line-height: 40px;
      text-align: center;
    }
  }
.product-list {
    overflow: auto;
    height: 100%;
    .product-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 16px 16px;
        img {
            &:nth-child(1) {
                width: 20px;
                height: 20px;
            }
            &:nth-child(2) {
                width: 106px;
                height: 106px;
                margin-left: 16px;
            }
        }
        .product-info {
            display: flex;
            flex-direction: column;
            padding: 0px 0;
            justify-content: space-between;
                .title-contain {
                    p {
                        &:nth-child(1) {
                            font-size:16px;
                            font-weight:500;
                            color:@color-c1;
                            line-height:22px;
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
                            font-weight:500;
                            color:@color-c1;
                            margin-left: 12px;
                            font-family: "alibabaBold";
                            margin-bottom: 4px;
                            span {
                                margin-left: 12px;
                                font-size:12px;
                                font-weight:400;
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
                            font-weight:500;
                            color:#F41F1F;
                            margin-left: 12px;
                            font-family: "alibabaBold";
                            &::before {
                                content: '¥';
                                font-family: "alibabaRegular";
                                width: 20px;
                                font-weight:600;
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
