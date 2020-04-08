<template>
    <div class="group-contain">
        <div class="content">
            <section class="header">
                <p><span>{{groupGood.name}}</span><span v-if='false'>{{`上装 &nbsp;${groupGood.topsSkuCount || 0} ；下装&nbsp; ${groupGood.bottomsSkuCount || 0}`}}</span>
                </p>
            </section>
            <div class="list-contain">
                <img class="pole" src="@/themes/images/groupGoods/pic_koc_clothes_hanger.png" alt="">
                <div class="group-contain">
                    <div class="p-contain" v-for="(product,index) in getColorSkuList"
                         :key="product.productCode + index">
                        <img src="@/themes/images/groupGoods/pic_hook.png" alt="">
                        <img class="productSize" :src='product.imgUrl' alt="">
                    </div>
                </div>
            </div>
            <section class="footer">
                <div>
                    <p class="total-price">¥<span>{{getHidePrice(groupGood.totalPrice)}}</span><span class="label" v-if="isHide === 0">入驻可得拿货价</span></p>
                    <p class="retail-price">¥<span>{{cashFormat(groupGood.totalPrice)}}</span><span class="label">建议零售价</span></p>
                </div>
                <div class="action">
                    <!--<section class="default" @click.stop="handleStore">极速上店</section>-->
                    <section class="select" v-show="!manageState" @click.stop="handleCheckDetail">立即购买</section>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import cash from '@/views/user/hall/cashFormat.js'
import utils from 'utils'
import order from './groupCreateOrder'

export default {
    components: {},
    props: {
        groupGood: {
            type: Object,
            default() {
                return {}
            }
        },
        manageState: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            colorList: [],
            isHide: utils.getStore('baseParams').isHide
        }
    },
    computed: {
        getColorSkuList() {
            let products = this.groupGood.groupGoodsRecords
            if (products instanceof Array && products.length > 0) {
                let arr = []
                this.groupGood.groupGoodsRecords.forEach(item => {
                    arr = arr.concat(item.colorSkuList)
                })
                return arr
            }
            return []
        }
    },
    methods: {
        cashFormat(price) {
            return cash.changeFormat(price)
        },
        getHidePrice(price) {
            let isHide = utils.getStore('baseParams').isHide
            return utils.hidePrice(price, isHide)
        },
        handleSelectImg(product) {
            window.sa.track('IPX_WEB', {
                page: 'userHall', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'hallClickGroupProductItem' // 按钮唯一标识，取个语义化且不重名的名字
            })
            const params = {
                jumpUrl: 'productDetail://',
                productCode: product.productCode
            }
            utils.postMessage('', params)
        },
        handleStore() {
            this.$router.push({
                path: '/deposit'
            })
        },
        handleCheckDetail() {
            window.sa.track('IPX_WEB', {
                page: 'userHall', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'hallPurchase' // 按钮唯一标识，取个语义化且不重名的名字
            })
            this.$router.push({
                path: '/hall/groupListDetail',
                query: {
                    groupId: this.groupGood.groupGoodsId
                }
            })
        },
        handleBuy() {
            window.sa.track('IPX_WEB', {
                page: 'userHall', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'purchase' // 按钮唯一标识，取个语义化且不重名的名字
            })
            let code = this.groupGood.groupGoodsId + ''
            order.createOrder(this.groupGood.name, this.groupGood.groupGoodsRecords, code, false) // this.groupGood.totalPrice
        }
    }
}
</script>

<style lang='less' scoped>
    // @import '../../../themes/default/styles/mixin.less';
    .group-contain {
        width: 100%;
        padding: 8px 0;
        overflow: auto;
        .content {
            margin: 0 16px;
            box-shadow: 0 4px 4px 0 rgba(33, 44, 98, 0.06);
            background: white;
            border-radius: 8px;

            .header {
                vertical-align: middle;
                position: relative;
                background: linear-gradient(180deg, rgba(246, 246, 250, 1) 0%, rgba(232, 233, 237, 1) 100%);
                border-radius: 8px 8px 0px 0px;
                padding: 0 12px;
                height: 50px;

                .selectIcon {
                    position: absolute;
                }

                p {
                    line-height: 50px;
                    position: relative;

                    span:first-child {

                        position: relative;
                        display: inline-block;
                        max-width: 60%;
                        font-size: 18px;
                        font-weight: bold;
                        color: @color-c1;
                        line-height: 50px;
                        z-index: 2;
                        padding-left: 0;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;

                        &:after {
                            content: "";
                            width: 100%;
                            height: 8px;
                            background: #fff;
                            position: absolute;
                            display: inline-block;
                            left: 0;
                            top: 30px;
                            z-index: -1; // border-top: 8px
                        }
                    }

                    span {
                        font-size: 12px;
                        font-weight: 400;
                        color: @color-c1;
                        line-height: 16px;
                        padding-left: 12px;
                    }
                }

                img {
                    display: block;
                    position: absolute;
                    width: 26px;
                    height: 26px;
                }
            }

            .list-contain {
                width: calc(100vw - 32px);
                background: url("../../../themes/images/groupGoods/bg_clothes_hanger.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                position: relative;

                .pole {
                    position: absolute;
                    top: 12px;
                    left: 24px;
                    right: 24px;
                    width: calc(100vw - 80px);
                    height: 8px;
                }

                .group-contain {
                    width: calc(100vw - 92px);
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    height: 170px;
                    margin: 0 30px;
                    overflow: scroll; // align-items: flex-start;
                    &::-webkit-scrollbar {
                        display: none;
                    }

                    .p-contain {
                        // width: calc(28.5vw - 28px);
                        // vertical-align: middle;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 4px 4px 0;

                        img {
                            display: block; // margin: 0 4px;
                            &:first-child {
                                width: 4px;
                                height: 20px;
                            }
                        }

                        .productSize {
                            // 3:4
                            border-radius: 4px;
                            width: calc(28.5vw - 36px);
                            height: calc(37.5vw - 47px);
                            object-fit: cover;
                        }
                    }
                }
            }

            .footer {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0 12px;
                height: 67px;

                .total-price {
                    font-size: 14px;
                    font-weight: 400;
                    color: @color-rc;
                    line-height: 24px;
                    font-family: 'alibabaRegular';

                    span {
                        font-family: 'alibabaBold';
                        font-size: 20px;
                        font-weight: bold;
                        line-height: 24px;
                    }

                    .label {
                        padding: 1px 2px;
                        height:14px;
                        background:rgba(255,235,237,1);
                        border-radius: 0 4px 4px 4px;
                        font-size: 10px;
                        font-weight: bold;
                        margin-left: 8px;
                    }
                }

                .retail-price {
                    font-size: 12px; // font-family:ALIBABAFont-Regular,ALIBABAFont;
                    font-weight: 400;
                    color: @color-c1;
                    line-height: 17px;
                    font-family: 'alibabaRegular';

                    span {
                        font-family: 'alibabaBold';
                        font-size: 14px;
                        font-weight: bold;
                        line-height: 24px;
                    }

                    .label {
                        padding: 1px 2px;
                        height:14px;
                        background: rgba(244,245,247,1);
                        border-radius: 0 4px 4px 4px;
                        color: @color-c3;
                        font-size: 10px;
                        font-weight: bold;
                        margin-left: 8px;
                    }
                }

                .action {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;

                    .default {
                        font-weight: bold;
                        margin-right: 12px;
                        .btn-gray(96px, 36px)
                    }

                    .select {
                        font-weight: bold;
                        .btn-select(96px, 36px, true)
                    }

                    .select:active {
                        background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(91, 64, 204, 1) 100%);
                    }

                    .inManage {
                        margin-right: 12px;
                    }
                }
            }
        }
    }
</style>
