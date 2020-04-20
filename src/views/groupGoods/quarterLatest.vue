<template>
    <layout-view class="latest-container">
        <c-header slot="header" :left-arrow="true" :showBorderBottom="false" :pageOutStatus="isNative" >
            <template slot="right">
                <div class="header-right" slot="right" @click="rightClick()"/>
            </template>
        </c-header>
        <div class="latest-content">
            <div class="latest-main">
                <span class="latest-label">{{showPage === 'latest' ? '本周上新' : '精选组货'}}</span>
                <swiper class="swiper" ref="groupSwiper" :style="getListHeight()" :options="swiperOption">
                    <swiper-slide class="slide" v-for="item in latestGroups" :key="item.groupCode">
                        <img class="main-pic" :src="item.groupImg" :style="getImageRect()">
                        <div class="label"><img src="../../themes/images/groupGoods/label_vip_push@2x.png"></div>
                    </swiper-slide>
                </swiper>
                <p class="group-title">{{selectGroupDetail.groupTitle}}</p>
                <div class="patch-price">
                    <span class="patch-flag">¥</span><span
                    class="patch-price-number">{{getHidePrice(selectGroupDetail.totalPrice)}}</span><span class="patch-count">{{selectGroupDetail.addedProdCount}}款</span>
                </div>
                <div class="total-price">
                    <span class="total-flag">¥</span><span
                    class="total-price-number">{{parseFloat(selectGroupDetail.totalRetailPrice).toFixed(2)}}</span><span class="total-label">建议零售价</span>
                </div>
                <!--UI确认，去掉标签，标签没有运营-->
                <!--<div class="group-labels-container">
                    <div class="group-labels">
                        <label v-for="(label, index) in selectGroupDetail.labelDescs" :key="index"
                              :style="getLabelMargin(index)">{{label}}</label>
                    </div>
                </div>-->
            </div>
            <div class="add-store" @click="addHall()">
                <p>
                    加入我的展厅
                </p>
                <div class="cover">

                </div>
            </div>
        </div>
        <LoadingView class="loadding_content" v-show="!showLoading"/>
    </layout-view>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import utils from 'utils'

import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'
import { Dialog } from 'vant'

export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            pageNumber: 1,
            pageSize: 10,
            latestGroups: [],
            showPage: 'latest', // latest:本季上新，feature:精选组货
            showLoading: true,
            isNative: false,
            finished: false, // 加载完标识
            loading: false, // 加载更多标识
            error: false, // 加载错误标识
            itemWidth: 335,
            itemHeight: 376,
            selectGroupDetail: {},
            groupDetail: {},
            swiperOption: {
                // slidesPerView: 'auto',
                // centeredSlides: true,
                // spaceBetween: 12 * window.devicePixelRatio,
                centeredSlides: true,
                spaceBetween: '4%',
                slidesPerView: 'auto',
                loop: false,
                effect: 'slide',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false
                },
                on: {
                    slideChange: () => {
                        let swiper = this.$refs.groupSwiper.swiper
                        this.selectGroupDetail = this.latestGroups[swiper.activeIndex]
                        this.getGroupDetail(this.selectGroupDetail.groupCode)
                    },
                    click: () => {
                        let swiper = this.$refs.groupSwiper.swiper
                        this.selectGroupDetail = this.latestGroups[swiper.activeIndex]
                        this.$router.push({
                            path: '/groupDetail',
                            query: {
                                groupCode: this.selectGroupDetail.groupCode
                            }
                        })
                    }
                }
            }
        }
    },
    methods: {
        getQuarterLatest() {
            let params = {
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }
            if (this.showPage === 'latest') {
                this.$api.groupGoods.getQuarterLatest(params).then(res => {
                    this.showLoading = false
                    if (res && res instanceof Array) {
                        if (this.pageNumber === 1) {
                            this.latestGroups = res
                            this.selectGroupDetail = this.latestGroups[0]
                            this.getGroupDetail(this.selectGroupDetail.groupCode)
                        } else {
                            this.latestGroups.concat(res)
                        }
                        this.finished = res.length < this.pageSize
                    } else {
                        this.finished = true
                    }
                }).catch(err => {
                    this.error = true
                    console.log(err)
                })
            } else {
                this.$api.groupGoods.getSelectedGroup(params).then(res => {
                    this.showLoading = false
                    if (res && res instanceof Array) {
                        if (this.pageNumber === 1) {
                            this.latestGroups = res
                            this.selectGroupDetail = this.latestGroups[0]
                            this.getGroupDetail(this.selectGroupDetail.groupCode)
                        } else {
                            this.latestGroups.concat(res)
                        }
                        this.finished = res.length < this.pageSize
                    } else {
                        this.finished = true
                    }
                }).catch(err => {
                    this.error = true
                    console.log(err)
                })
            }
        },
        getImageRect() {
            this.itemWidth = document.documentElement.clientWidth - 40 * window.devicePixelRatio
            this.itemHeight = this.itemWidth * 376 / 335
            return `width:${this.itemWidth}px;height:${this.itemHeight}px`
        },
        getLabelMargin(index) {
            let marginLeft = index === 0 ? 0 : 8 * window.devicePixelRatio
            return `margin-left:${marginLeft}px`
        },
        rightClick() {
            window.sa.track('IPX_WEB', {
                page: 'groupFilterResult', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'clickToHall' // 按钮唯一标识，取个语义化且不重名的名字
            })

            this.$router.push({
                path: '/user/hall',
                query: {
                    isFromWeb: true
                }
            })
        },
        getListHeight() {
            let width = document.documentElement.clientWidth - 40 * window.devicePixelRatio
            let height = width * 376 / 335 + 20 * window.devicePixelRatio
            return `width:100%;height:${height}px`
        },
        getGroupDetail(groupCode) {
            const params = {
                groupCode: groupCode
            }
            this.$api.groupGoods.getGroupDetail(params)
                .then(res => {
                    this.groupDetail = res
                    // this.findvideocover();
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getHidePrice(price) {
            let isHide = utils.getStore('baseParams').isHide
            return utils.hidePrice(price, isHide)
        },
        addHall() {
            window.sa.track('IPX_WEB', {
                page: 'groupDetail', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'addTohall' // 按钮唯一标识，取个语义化且不重名的名字
            })
            let token = utils.getStore('token')
            if (token === 'undefined' || token === '') {
                window.globalVue.$utils.postMessage('user_authentication', '')
                return
            }
            let params = {}
            let groupInfos = []
            let groupProductInfo = {
                name: this.groupDetail.groupTitle,
                groupCode: this.groupDetail.groupCode
            }
            let groupProducts = []
            this.groupDetail.groupGoodsSpus.forEach((good, goodIndex) => {
                good.colorSkuList.forEach((item, index) => {
                    item.skuList.forEach((skuItem, skuIndex) => {
                        let sku = {
                            num: skuItem.num,
                            productName: good.productName,
                            productAtrNumber: good.productAtrNumber,
                            productCode: good.productCode,
                            productSkuCode: skuItem.productSkuCode,
                            starasSkuCode: skuItem.starasSkuCode
                        }
                        groupProducts.push(sku)
                    })
                })
            })
            groupProductInfo.groupGoodsRecords = groupProducts
            groupInfos.push(groupProductInfo)
            params.groupGoodsInfos = groupInfos
            this.$api.groupGoods
                .groupGoods(params)
                .then(res => {
                    if (res.code === 0) {
                        let groupGoodsId = res.data.groupGoodsId
                        Dialog.confirm({
                            title: '添加成功',
                            message: '该组货方案已添加至我的展厅',
                            confirmButtonText: '编辑组货方案',
                            cancelButtonText: '继续逛逛',
                            confirmButtonColor: '#007AFF'
                        }).then(() => {
                            window.sa.track('IPX_WEB', {
                                page: 'groupDetail', // 页面名字
                                type: 'click', // 固定参数，表明是点击事件
                                event: 'editGroupPlan' // 按钮唯一标识，取个语义化且不重名的名字
                            })
                            this.$router.push({
                                path: '/hall/groupListDetail',
                                query: { groupId: groupGoodsId }
                            })
                        }).catch(() => {
                            // on cancel
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created() {
    },
    mounted() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        if (this.$route.query.showPage !== undefined) {
            this.showPage = this.$route.query.showPage
        }
        this.getQuarterLatest()
    }
}
</script>

<style lang="less" scoped>
    .latest-container {
        height: 100%;
    }
    .header-right {
        display: inline-block;
        vertical-align: middle;
        width: 26px;
        height: 26px;
        background: url("../../themes/images/groupGoods/icon_nav_exhibition26_gray1@2x.png") no-repeat;
        background-size: 100%;
    }
    .header-right:active {
        background: url("../../themes/images/groupGoods/icon_nav_exhibition26_gray_press.png") no-repeat;
        background-size: 100%;
    }
    .empty {
        margin-top: 24px;
        border-radius: 12px 12px 0 0;
        padding-top: 112px;
    }
    .latest-content {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: scroll;
        .latest-main {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-bottom: 100px;
            .latest-label {
                width: calc(100vw - 40px);
                font-size: 24px;
                font-weight: bold;
                color: rgba(42, 43, 51, 1);
                line-height: 32px;
                margin: 16px 20px 10px 20px;
            }

            .swiper {
                border-radius: 12px;
                background: #fff;
                padding: 0 8px;

                .slide {
                    width: calc(100vw - 40px);
                    .main-pic {
                        position: absolute;
                        top: 10px;
                        left: 0;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.08);
                        border-radius: 12px;
                    }

                    .label {
                        position: absolute;
                        width: calc(100vw - 40px);
                        top: 10px;
                        z-index: 1;
                        left: 0;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        >img {
                            width: 108px;
                            height: 28px;
                        }
                    }
                }
            }

            .patch-price {
                display: flex;
                justify-content: center;
                margin-top: 14px;
                align-items: flex-end;

                .patch-flag {
                    font-size: 14px;
                    font-family: "alibabaRegular";
                    font-weight: 400;
                    padding-bottom: 4px;
                    color: rgba(245, 48, 48, 1);
                }

                .patch-price-number {
                    font-size: 22px;
                    font-family: "alibabaBold";
                    font-weight: bold;
                    line-height:26px;
                    color: rgba(245, 48, 48, 1);
                }

                .patch-count {
                    font-size: 14px;
                    font-weight: 400;
                    padding-bottom: 4px;
                    margin-left: 8px;
                    color: rgba(138, 140, 153, 1);
                }
            }

            .total-price {
                display: flex;
                justify-content: center;
                margin-top: 6px;
                align-items: flex-end;

                .total-flag {
                    font-size: 10px;
                    font-family: "alibabaRegular";
                    font-weight: 400;
                    padding-bottom: 1px;
                    color: rgba(88, 91, 102, 1);
                }

                .total-price-number {
                    font-size: 14px;
                    font-family: "alibabaBold";
                    line-height:14px;
                    font-weight: bold;
                    color: rgba(88, 91, 102, 1);
                }

                .total-label {
                    font-size: 10px;
                    font-weight: bold;
                    color: @color-c3;
                    line-height: 14px;
                    margin-left: 8px;
                    padding: 1px 2px;
                    background: rgba(244, 245, 247, 1);
                    border-radius: 0 4px 4px 4px;
                }
            }

            .group-title {
                font-size: 18px;
                font-weight: bold;
                color: rgba(42, 43, 51, 1);
                margin: 14px 36px 0 36px;
                line-height:26px;
                height: 26px;
                text-align: center;
                max-width: 303px;
                .ellipsis()
            }

            .group-labels-container {
                width: 100%;
                overflow-x: scroll;
                text-align: center;
                .group-labels {
                    /*display: flex;
                    justify-content: center;
                    overflow-x: scroll;
                    width: 100%;*/
                    white-space:nowrap;
                    margin: 12px 0 48px 0;
                    padding: 0 20px;

                    > label {
                        min-width: 64px;
                        height: 28px;
                        border-radius: 14px;
                        margin: auto;
                        color: @color-ec;
                        font-size: 10px;
                        font-weight: bold;
                        display: inline-block;
                        padding: 0 12px;
                        line-height: 28px;
                        text-align: center;
                        border: 1px solid rgba(60, 92, 246, 1);
                    }
                }
            }

        }
    }

    .add-store {
        width: calc(100vw - 40px);
        color: white;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        font-weight: bold;
        height: 50px;
        background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
        border-radius: 12px;
        position: fixed;
        bottom: 36px;
        left: 20px;
        .cover {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            width: calc(100vw - 40px);
            height: 50px;
            background-color: black;
            border-radius: 12px;
            opacity: 0;
        }
        >p {
            position: absolute;
            width: calc(100vw - 40px);
            text-align: center;
            left: 0;
            top: 0;
            margin: auto;
        }
    }
    .add-store:active .cover {
        opacity: 0.3;
    }
</style>
