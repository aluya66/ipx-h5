<template>
    <layout-view class="latest-container">
        <c-header slot="header" :left-arrow="true" :showBorderBottom="true" :pageOutStatus="isNative">
            <template slot="right">
                <img class="header-right" slot="right"
                     src="../../themes/images/groupGoods/icon_nav_exhibition26_gray1@2x.png" @click="rightClick()"/>
            </template>
        </c-header>
        <div class="latest-content">
            <div class="latest-main" v-if="latestGroups.length > 0">
                <span class="latest-label">{{showPage === 'latest' ? '本季上新' : '精选组货'}}</span>
                <swiper class="swiper" ref="groupSwiper" :style="getListHeight()" :options="swiperOption">
                    <swiper-slide class="slide" v-for="item in latestGroups" :key="item.groupCode">
                        <img class="main-pic" :src="item.groupImg" :style="getImageRect()">
                        <div class="label"><img src="../../themes/images/groupGoods/label_vip_push@2x.png"></div>
                    </swiper-slide>
                </swiper>
                <div class="patch-price">
                    <span class="patch-flag">¥</span><span
                    class="patch-price-number">{{selectGroupDetail.totalRetailPrice}}</span><span class="patch-count">{{selectGroupDetail.addedProdCount}}款</span>
                </div>
                <div class="total-price">
                    <span class="total-flag">¥</span><span
                    class="total-price-number">{{selectGroupDetail.totalPrice}}</span><span class="total-label">零售货值</span>
                </div>
                <span class="group-title">{{selectGroupDetail.groupTitle}}</span>
                <div class="group-labels">
                    <span v-for="(label, index) in selectGroupDetail.labelDescs" :key="index"
                          :style="getLabelMargin(index)">{{label}}</span>
                </div>
                <div class="add-store" @click="addHall()">加入我的展厅</div>
            </div>
        </div>
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
            isNative: false,
            finished: false, // 加载完标识
            loading: false, // 加载更多标识
            error: false, // 加载错误标识
            itemWidth: 335,
            itemHeight: 376,
            selectGroupDetail: {},
            groupDetail: {},
            swiperOption: {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 12 * window.devicePixelRatio,
                on: {
                    slideChange: () => {
                        let swiper = this.$refs.groupSwiper.swiper
                        this.selectGroupDetail = this.latestGroups[swiper.activeIndex]
                        this.getGroupDetail(this.selectGroupDetail.groupCode)
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
    mounted() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        if (this.$route.query.showPage !== undefined) {
            this.showPage = this.$route.query.showPage
        }
        debugger
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
                    font-family: ALIBABAFont-Regular, ALIBABAFont;
                    font-weight: 400;
                    color: rgba(245, 48, 48, 1);
                }

                .patch-price-number {
                    font-size: 22px;
                    font-family: ALIBABAFont-Bold, ALIBABAFont;
                    font-weight: bold;
                    color: rgba(245, 48, 48, 1);
                }

                .patch-count {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    margin-left: 8px;
                    color: rgba(138, 140, 153, 1);
                }
            }

            .total-price {
                display: flex;
                justify-content: center;
                margin-top: 4px;
                align-items: flex-end;

                .total-flag {
                    font-size: 12px;
                    font-family: ALIBABAFont-Regular, ALIBABAFont;
                    font-weight: 400;
                    color: rgba(88, 91, 102, 1);
                }

                .total-price-number {
                    font-size: 14px;
                    font-family: ALIBABAFont-Bold, ALIBABAFont;
                    font-weight: bold;
                    color: rgba(88, 91, 102, 1);
                }

                .total-label {
                    font-size: 10px;
                    font-family: PingFangSC-Regular, PingFang SC;
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
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: bold;
                color: rgba(42, 43, 51, 1);
                margin-top: 12px;
            }

            .group-labels {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                margin: 8px 20px 48px 20px;

                > span {
                    height: 28px;
                    border-radius: 14px;
                    margin-top: 4px;
                    color: @color-ec;
                    font-weight: bold;
                    padding: 0 12px;
                    line-height: 28px;
                    text-align: center;
                    border: 1px solid rgba(60, 92, 246, 1);
                }
            }

            .add-store {
                width: calc(100vw - 40px);
                color: white;
                text-align: center;
                line-height: 50px;
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 20px;
                height: 50px;
                background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
                border-radius: 12px;
            }
        }
    }
</style>
