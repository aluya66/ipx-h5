<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative" :showBorderBottom='true'>
            <div slot="title">选择要购买的商品</div>
        </c-header>
        <div class="panel" :style="getBottomOffset(69)">
            <div class="list-content">
                <div
                    class="product-cell"
                    v-for="(item, index) in groupGoodsRecords"
                    :key="item.productCode"
                >
                    <img class="product-item-check" :src="item.disabled ? select_disable : item.isSelected ? select_sel : select_def" @click.stop="selectItem(item, index)"/>
                    <div class="photo_state">
                        <img :src="goodPicture(item)" alt="" @click="jumpToProduct(item)"/>
                        <div class="state_text" v-show="tipStr(item) !== ''">{{ tipStr(item) }}</div>
                    </div>
                    <div class="product-info" >
                        <p
                            :class="[item.disabled ? 'disableTitle' : '']"
                            @click="jumpToProduct(item)"
                        >
                            {{ item.productName }}
                        </p>
                        <div class="sku-list" @click="jumpToProduct(item)">
                            <p
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
                <div class=" total-price" >
                    <div class="group_price">
                        ¥<span>{{completeTotalPrice}}</span>
                    </div>
                    <div class="sale_price">
                        <span class="price">¥<span>{{completeTotalRetailPrice}}</span></span>
                        <span class="tip_title">建议零售价</span>
                    </div>
                </div>
                <div class="group_tool_btn" >
                    <button class="pay" @click="goPay">立即采购</button>
                </div>
            </div>
        </div>
        <!-- sku选择 -->
        <sku-select
            :seletedDetailsItem="seletedDetailsItem"
            :goodsId="goodsId"
            :showSku="showSkuDialog"
            @pointClick="skuCommit"
        />
    </layout-view>
</template>

<script>
import skuSelect from '@/views/common/skuSelect.vue'
import order from '@/views/user/hall/groupCreateOrder.js'
import cash from '@/views/user/hall/cashFormat.js'
import utils from 'utils'
import { Toast } from 'vant'

export default {
    components: {
        skuSelect
    },
    data() {
        return {
            showSkuDialog: false, // 是否弹出sku选择框
            // groupName: ' ', // 组货名称
            groupGoodsId: '', // 组货id
            goodsId: '',
            colorSkuAction: '',
            groupDetail: {}, // 组货基本信息
            groupGoodsRecords: [], // 商品列表数据源
            selecteProducts: [],
            // isDialog: false,
            seletedDetailsItem: {}, // sku数据源
            seletedItemIndex: '', // 选择调整商品下标
            isNative: false,
            // isManage: false,
            // postIcon: require('@/themes/images/app/btn_create_poster_def@3x.png'),
            select_def: require('@/themes/images/groupGoods/checkbox_default.png'),
            select_sel: require('@/themes/images/groupGoods/selected_icon.png'),
            select_disable: require('@/themes/images/groupGoods/checkbox_disabled@3x.png'),
            changeName_img: require('@/themes/images/groupGoods/groupName_write_def@3x.png'),
            selectedNum: 0,
            // completeTotalPrice: 0.00,
            // completeTotalRetailPrice: 0.00 
            // isAllSelected: false
            // totalRetailPrice: 0
        }
    },
    mounted() {
    },
    created() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true
        })
    },
    activated() {
        this.resetData()
        this.isNative = false
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        this.groupDetail = {}
        this.groupGoodsRecords = []
        if (this.$route.query.groupDetail !== undefined) {
            this.groupDetail = this.$route.query.groupDetail
            this.groupGoodsRecords = this.groupDetail.groupGoodsSpus
            this.groupGoodsRecords = this.groupGoodsRecords.map(item => {
                return {
                    ...item,
                    disabled: false,
                    unablepay: false,
                    isSelected: false
                }
            })
        }
        utils.postMessage('changeStatus', 'default')
    },
    filters: {
        selectSkuStr(val) {
            let str = val.attrColorValue + '：'
            let arr = []
            val.skuList.forEach(item => {
                if (item.entityStock > 0 & item.num > 0) {
                    arr.push(item.attrSpecValue + 'x' + item.num)
                }
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
            return function (good) {
                return good.colorSkuList[0].imgUrl
            }
        },
        tipStr() {
            return function (value) {
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
                    return '不足起订量，需调整' // 已选商品sku部分库存为0，不满足起批量，但总库存满足起订量
                }
                if (isChanged && isEnough) {
                    return '部分商品规格变更' // 已选商品sku部分库存为0，但剩余已选的sku满足起批量
                }
                return ''
            }
        },
        completeTotalPrice() {
            let totalPrice = 0
            console.log('1111')
            this.groupGoodsRecords.forEach((product, index) => {
                if (!product.disabled && product.isSelected) {
                    product.colorSkuList.forEach((item) => {
                        item.skuList.forEach((skuItem) => {
                            if (skuItem.entityStock > 0) {
                                totalPrice += skuItem.defaultSkuPrice * skuItem.num
                            }
                        })
                    })
                }
            })
            return cash.changeFormat(totalPrice)
        },
        completeTotalRetailPrice() {
            let retailPrice = 0
            console.log('22222')
            this.groupGoodsRecords.forEach((product, index) => {
                if (!product.disabled && product.isSelected) {
                    product.colorSkuList.forEach((item) => {
                        item.skuList.forEach((skuItem) => {
                            if (skuItem.entityStock > 0) {
                                retailPrice += skuItem.skuRetailPrice * skuItem.num
                            }
                        })
                    })
                }
            })
            return cash.changeFormat(retailPrice)
        }
    },
    methods: {
        selectItem(product, index) {
            if (product.disabled) {
                return
            }
            product.isSelected = !product.isSelected
            // this.groupGoodsRecords[index] = product
            if (product.isSelected) {
                this.selecteProducts = this.selecteProducts.concat(product)
            } else {
                let index = this.selecteProducts.indexOf(product)
                if (index > -1) {
                    this.selecteProducts.splice(index, 1)
                }
            }
            // let totalPrice = 0.00
            // let totalRetailPrice = 0.00
            // this.groupGoodsRecords.forEach((product, index) => {
            //     if (!product.disabled && product.isSelected) {
            //         product.colorSkuList.forEach((item) => {
            //             item.skuList.forEach((skuItem) => {
            //                 if (skuItem.entityStock > 0) {
            //                     totalPrice += skuItem.defaultSkuPrice * skuItem.num
            //                     totalRetailPrice += skuItem.skuRetailPrice * skuItem.num
            //                 }
            //             })
            //         })
            //     }
            // })
            // this.completeTotalPrice = cash.changeFormat(totalPrice)
            // this.completeTotalRetailPrice = cash.changeFormat(totalRetailPrice)
            // console.log(this.completeTotalPrice)
        },
        cashFormat(price) {
            return cash.changeFormat(price)
        },
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
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
            this.showSkuDialog = true//! this.showSku
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
        resetData() { // 重置页面
            Toast.clear()
            // this.isAllSelected = false
            this.showSkuDialog = false
            // this.selectedNum = 0
            if (this.groupGoodsRecords && this.groupGoodsRecords instanceof Array && this.groupGoodsRecords.length > 0) {
                this.groupGoodsRecords.forEach(item => {
                    if (item) {
                        item.isSelected = false
                    }
                })
            }
        },
        skuCommit(seletedDetailsItem) {
            this.showSkuDialog = false
            // sku修改 确定
            if (seletedDetailsItem) {
                this.seletedDetailsItem = seletedDetailsItem
                this.groupGoodsRecords[this.seletedItemIndex] = seletedDetailsItem
            }
            this.seletedDetailsItem.colorSkuList.forEach((item, index) => {
                item.skuList.forEach((skuItem, skuIndex) => {
                    skuItem.num = skuItem.skuValue
                })
            })
            this.groupGoodsRecords[this.seletedItemIndex] = this.seletedDetailsItem
        },
        goPay() {
            if (this.selecteProducts.length === 0) {
                this.$toast('请选择需要购买的商品')
                return
            }
            order.createOrder(
                this.groupDetail.groupTitle,
                this.selecteProducts,
                '',
                true
            )
        }
    }
}
</script>

<style lang="less" scoped>
    .panel {
        background-color: white;
        height: calc(100vh - 65px);
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 16px;
        margin-top: -1px;
    }

    .list-content {
        margin-top: 16px;
        padding-bottom: 60px;

        .product-cell {
            background: white;
            height: 106px;
            margin-bottom: 32px;
            display: flex;
            position: relative;
            align-items: center;

            .product-item-check {
                width: 20px;
                height: 20px;
                margin-right: 16px;
            }

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
                    width: 106px;
                    height: 18px;
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 0px 0px 4px 4px;
                    font-size: 10px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    text-align: center;
                    line-height: 18px;
                    top: 88px;
                }
            }

            .product-info-move {
                margin-right: -36px;
            }

            .product-info {
                margin-left: 12px;
                width: calc(100vw - 152px);
                > p {
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 22px;
                    color: @color-c1;
                    .ellipsis();
                }

                .disableTitle {
                    font-size: 16px;
                    font-weight: bold;
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
                        font-size: 10px;
                        font-weight: bold;
                        color: @color-c3;
                        line-height: 12px;
                        background: rgba(244, 245, 247, 1);
                        margin-left: 10px;
                        padding: 2px;
                        border-radius: 0px 4px 4px 4px;
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
                        font-weight: bold;
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
                font-size: 10px;
                font-weight: bold;
                color: @color-c3;
                line-height: 12px;
                background: rgba(244, 245, 247, 1);
                margin-left: 4px;
                padding: 2px;
                border-radius: 0px 4px 4px 4px;
            }
        }

        .group_tool_btn {
            display: flex;
            margin-bottom: 5px;
            .pay {
                width: 88px;
                height: 40px;
                background: linear-gradient(135deg,
                rgba(85, 122, 244, 1) 0%,
                rgba(114, 79, 255, 1) 100%);
                border-radius: 20px;
                font-size: 14px;
                font-weight: bold;
                color: white;
                align-self: center;
            }
            .pay:active {
                color: rgba(255, 255, 255, 0.3);
            }
        }

    }
</style>
