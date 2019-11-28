<template>
<div class="contain">
    <div class="content">
        <section class="header">
            <p><span>{{groupGood.name}}</span><span v-if='false'>{{`上装 &nbsp;${groupGood.topsSkuCount || 0} ；下装&nbsp; ${groupGood.bottomsSkuCount || 0}`}}</span></p>
        </section>
        <div class="list-contain">
            <img class="pole" src="@/themes/images/groupGoods/pic_koc_clothes_hanger.png" alt="">
            <div class="group-contain">
                <div class="p-contain" v-for="(product,index) in getColorSkuList" :key="product.productCode + index">
                    <img src="@/themes/images/groupGoods/pic_hook.png" alt="">
                    <img class="productSize" :src='product.imgUrl' alt="" @click.stop="handleSelectImg(product)">
                </div>
            </div>
        </div>
        <section class="footer">
            <p>￥<span>{{parseInt(groupGood.totalPrice).toFixed(2) || 0.00}}</span></p>
            <div class="action">
                <section :class='["default", !manageState ? "inManage" :""]' @click="handleCheckDetail">查看详情</section>
                <section class="select" v-show="!manageState" @click="handleBuy">一键采购</section>
            </div>
        </section>
    </div>
</div>
</template>

<script>
import utils from 'utils'
import order from './groupCreateOrder'

export default {
    components: {

    },
    props: {
        groupGood: {
            type: Object,
            default () {
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
            colorList: []
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
        handleSelectImg(product) {
            const params = {
                jumpUrl: 'productDetail://',
                productCode: product.productCode
            }
            utils.postMessage('', params)
        },
        handleCheckDetail(e) {
            e.stopPropagation()
            this.$router.push({
                path: '/hall/groupListDetail',
                query: {
                    groupId: this.groupGood.groupGoodsId
                }
            })
        },
        handleBuy(e) {
            e.stopPropagation()
            window.sa.track('IPX_WEB', {
                page: 'userHall', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'purchase' // 按钮唯一标识，取个语义化且不重名的名字
            })
            let code = this.groupGood.groupGoodsId + ''
            order.createOrder(this.groupGood.groupGoodsRecords, this.groupGood.totalPrice, code)
        }
    }
}
</script>

<style lang='less' scoped>
// @import '../../../themes/default/styles/mixin.less';
.contain {
    padding-bottom: 20px;
    .content {
        margin: 0 16px;
        box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.06);
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
                    display: inline;
                    font-size: 18px;
                    font-weight: 500;
                    color: @color-c1;
                    line-height: 50px;
                    z-index: 2;
                    padding-left: 0;
                    &:after {
                        content: "";
                        width: 100%;
                        height: 8px;
                        background: #fff;
                        position: absolute;
                        display: inline-block;
                        left: 0;
                        top: 14px;
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
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                height: 170px;
                margin: 0 30px;
                overflow: scroll; // align-items: flex-start;
                .p-contain {
                    // width: calc(28.5vw - 28px);
                    // vertical-align: middle;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 12px 4px 0;
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
            color: @color-rc;
            height: 60px;
            p {
                font-size: 14px; // font-family:ALIBABAFont-Regular,ALIBABAFont;
                font-weight: 400;
                line-height: 17px;
                span {
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 17px;
                }
            }
            .action {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                .default {
                    margin-right: 0;
                    .btn-select(96px,
                    36px,
                    false)
                }
                .select {
                    .btn-select(96px,
                    36px,
                    true)
                }
                .inManage {
                    margin-right: 12px;
                }
            }
        }
    }
}
</style>
