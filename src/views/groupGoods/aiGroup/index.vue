<template>
    <layout-view class="header-bg" :style="handleAdjustHeaderBg()">
        <c-header class="header" slot="header" :left-arrow="true" :isLight='false' :pageOutStatus='!isFromWeb'>
            <div class="title" slot="title">
                <div class="titleContain">
                    <span :class='["title-slider",titleIndex===1?"title-slider-right":"title-slider-left"]'/>
                    <section :class='[titleIndex===1?"title-default":"title-select"]' @click="handleSelectRec">买手推荐
                    </section>
                    <section :class='[titleIndex===0?"title-default":"title-select"]' @click="handleSelectAi">智能组货
                    </section>
                </div>
            </div>
            <template slot="left" tag="div">
                <img class="header-img" :src="backImage"/>
            </template>
            <template slot="right">
                <img
                    class="header-img"
                    :src="hallIcon"
                    @click="handleToHall"
                />
            </template>
        </c-header>
        <empty-view class="empty" v-if="titleIndex === 1"/>
        <empty-view class="empty" v-else-if="titleIndex === 0 && allDatas.length <= 0" emptyType="error"
                    emptyDesc="暂无搜索结果"/>
        <div v-else class="contain" :style="getBottomOffset()">
            <div class="designer-bg">
                <div class="designer-container">
                    <p class="c-title">推荐买手</p>
                    <div class="designer-all">
                        <div class="designer-select">
                            <img class="designer-header designer-header-select" :src="curDesigner.groupGoodsKoc.headPic"
                                 alt="">
                            <p class="designer-name designer-name-select">{{curDesigner.groupGoodsKoc.kocNickName}}</p>
                        </div>
                        <div class="designer-divider"></div>
                        <swiper v-if="showDesigner" class="d-swiper" ref="designerSwiper" :options="dSwiperOption">
                            <swiper-slide class="designer-contain" v-for="item in allDatas"
                                          :key="item.groupGoodsKoc.kocCode">
                                <img
                                    :class='["designer-header",getIsCurrentDesigner(item)?"designer-header-select":"designer-header-default"]'
                                    :src="item.groupGoodsKoc.headPic" alt="">
                                <p :class='["designer-name",getIsCurrentDesigner(item)?"designer-name-select":"designer-name-default"]'>
                                    {{item.groupGoodsKoc.kocNickName}}</p>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <div class="triangle"/>
                <div class="half-bg"/>
            </div>
            <swiper v-if="showGroup" class="swiper" ref="groupSwiper" :options="swiperOption">
                <swiper-slide class="slide" v-for="item in curDesigner.groupGoodList" :key="item.groupCode">
                    <section class="box-header">
                        <p><span>{{item.groupTitle}}</span></p>
                    </section>
                    <div class="box-content" :style="getBoxContainHeight">
                        <img :style="getImgHeight" :src="item.groupImg" alt="">
                    </div>
                    <div class="box-footer">
                        <div v-for="(footerItem,index) in footerTitles" :key="index">
                            <p>{{getPercent(item,index)}}<span>%</span></p>
                            <p>{{footerItem}}</p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="rank" @click="handleToRank">
                <div>
                    <img src="@/themes/images/groupGoods/groupInfoBg.png" alt="">
                    <div>
                        <h3>最潮搭配top10</h3>
                        <p>看看同行都选了哪些组货搭配</p>
                    </div>
                </div>
                <img src="@/themes/images/groupGoods/icon_next_blue.png" alt="">
            </div>
        </div>
    </layout-view>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'
import EmptyView from '../../error/emptyView.vue'
import utils from 'utils'

export default {
    components: {
        swiper,
        swiperSlide,
        EmptyView
    },
    props: {},
    data() {
        return {
            isFromWeb: false,
            showDesigner: false,
            showGroup: false,
            curDesigner: {},
            hallIcon: require('@/themes/images/app/icon_nav_exhibition.png'),
            backImage: require('@/themes/images/app/icon_nav_back_white@3x.png'),
            titleIndex: 0,
            screenWidth: document.body.clientWidth,
            allDatas: [],
            footerTitles: ['推荐指数', '时尚指数', '热销指数'],
            designerSlidesPerView: 3,
            swiperOption: {
                // slidesPerView: 1.1,
                // centeredSlides: true,
                // spaceBetween: 16 * window.devicePixelRatio,
                effect: 'slide',
                centeredSlides: true,
                spaceBetween: '8%',
                slidesPerView: 'auto',
                // loop: true,
                // autoplay: {
                //     disableOnInteraction: false
                // },
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false
                },
                on: {
                    click: () => {
                        window.sa.track('IPX_WEB', {
                            page: 'groupFilterResult', // 页面名字
                            type: 'click', // 固定参数，表明是点击事件
                            event: 'clickGroupMainPic' // 按钮唯一标识，取个语义化且不重名的名字
                        })
                        let groupList = this.curDesigner.groupGoodList
                        let swiper = this.$refs.groupSwiper.swiper
                        let i = swiper.clickedIndex
                        this.$router.push({
                            path: '/groupDetail',
                            query: {
                                groupCode: groupList[i].groupCode
                            }
                        })
                    }
                }
            },
            dSwiperOption: {
                slidesPerView: 3,
                spaceBetween: 24,
                on: {
                    click: () => {
                        window.sa.track('IPX_WEB', {
                            page: 'groupFilterResult', // 页面名字
                            type: 'click', // 固定参数，表明是点击事件
                            event: 'clickBuyerHeader' // 按钮唯一标识，取个语义化且不重名的名字
                        })
                        let swiper = this.$refs.designerSwiper.swiper
                        let i = swiper.clickedIndex
                        this.curDesigner = this.allDatas[i]
                        let gSwiper = this.$refs.groupSwiper.swiper
                        gSwiper.slideTo(0, 0, false)
                    }
                }
            }
        }
    },
    watch: {
        '$route'(to, from) {
            if (from.name === 'groupGoods' && to.name === 'aiGroup') {
                this.handleRequest()
            }
        }
    },
    computed: {

        getBoxSize() {
            let width = this.screenWidth - 72 * window.devicePixelRatio
            let height = width / (303 / 342) + (50 + 85) * window.devicePixelRatio
            return `height:${height}px`
        },
        getImgHeight() {
            let width = this.screenWidth - 110 * window.devicePixelRatio
            let height = width * 295 / 265
            return `height:${height}px;width:${width}px`
        },
        getBoxContainHeight() {
            let width = this.screenWidth - 110 * window.devicePixelRatio
            let height = width * (295 / 265) + 12 * window.devicePixelRatio
            let conWidth = width + 30 * window.devicePixelRatio
            return `height:${height}px;width:${conWidth}px;background-size:100% 100%;`
        }
    },
    methods: {
        handleAdjustHeaderBg() {
            let baseParams = utils.getStore('baseParams')
            if (!baseParams.isIphoneX) {
                return 'background-size:100% 2.22rem'
            }
        },
        getBottomOffset() {
            let offsetStr = utils.bottomOffset(0)
            return offsetStr
        },
        // 获取百分比
        getPercent(item, index) {
            let arr = [parseInt(item.adviceIndexNum), parseInt(item.fashionIndexNum), parseInt(item.hotIndexNum)]
            return arr[index]
        },
        // 判断是不是当前设计师
        getIsCurrentDesigner(item) {
            return item === this.curDesigner
        },
        // 去展厅
        handleToHall() {
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
        // 切换菜单 ---买手推荐
        handleSelectRec() {
            this.titleIndex = 0
            window.sa.track('IPX_WEB', {
                page: 'groupFilterResult', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'recommendBuyer' // 按钮唯一标识，取个语义化且不重名的名字
            })
        },
        // 切换菜单 ---智能组货
        handleSelectAi() {
            this.titleIndex = 1
            window.sa.track('IPX_WEB', {
                page: 'groupFilterResult', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'aiGroup' // 按钮唯一标识，取个语义化且不重名的名字
            })
        },
        // 查看TOP10
        handleToRank() {
            window.sa.track('IPX_WEB', {
                page: 'groupFilterResult', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'goTopRank' // 按钮唯一标识，取个语义化且不重名的名字
            })
            this.$router.push({
                path: '/groupGoods/aiGroup/matchRank'
            })
        },
        handleRequest() {
            utils.postMessage('changeStatus', 'light')
            let params = utils.getStore('searchParams')
            this.$api.groupGoods.searchGroup(params).then(res => {
                if (res instanceof Array) {
                    this.allDatas = res
                    if (this.allDatas.length > 0) {
                        this.curDesigner = this.allDatas[0]
                    }
                } else {
                    this.allDatas = []
                    this.curDesigner = {}
                }
            }).catch(() => {

            })
        }
    },
    mounted() {
        this.showGroup = false
        this.showDesigner = false
        setTimeout(() => {
            this.showDesigner = true
        }, 300)
        setTimeout(() => {
            this.showGroup = true
        }, 500)
    },
    created() {
        this.isFromWeb = this.$route.query.isFromWeb || false
        this.handleRequest()
        this.$bus.$on('tokenCallBack', (routePath) => {
            if (routePath.indexOf('aiGroup') > -1) {
                this.handleRequest()
            }
        })
    },
    activated() {
        window.sa.track('IPX_WEB', {
            page: 'groupFilterResult', // 页面名字
            type: 'pageView', // 固定参数，不用改
            event: 'pageView' // 固定参数，不用改
        })
        let swiper = this.$refs.designerSwiper && this.$refs.designerSwiper.swiper
        if (swiper !== undefined) {
            swiper.slideTo(0, 0, false)
        }
        let designerSliderWidth = document.documentElement.clientWidth - 145 * window.devicePixelRatio
        this.designerSlidesPerView = designerSliderWidth / (68 * window.devicePixelRatio)
        console.log('显示设计师的个数:' + this.designerSlidesPerView)

        // let gSwiper = this.$refs.groupSwiper && this.$refs.groupSwiper.swiper
        // if (gSwiper !== undefined) {
        //     gSwiper.slideTo(0, 0, false)
        // }
    }
}
</script>

<style lang='less' scoped>

    .designer-bg {
        position: relative;
        height: 178px;
    }

    .triangle {
        border: 8px solid;
        border-color: white transparent transparent transparent;
        position: absolute;
        top: 158px;
        z-index: 10;
        left: 50px;
    }

    .half-bg {
        position: absolute;
        top: 120px;
        left: 0;
        width: 100%;
        background: white;
        height: 100px;
    }

    .designer-container {
        position: absolute;
        height: 138px;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
        border-radius: 12px;
        margin: 20px 16px 0 16px;
        padding: 16px 0 24px 20px;
        display: flex;
        z-index: 5;
        flex-direction: column;
    }

    .designer-select {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .designer-all {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 12px;
    }

    .designer-divider {
        width: 1px;
        height: 36px;
        margin-left: 24px;
        margin-right: 24px;
        background: linear-gradient(90deg, rgba(227, 226, 230, 0) 0%, rgba(227, 226, 230, 1) 0%, rgba(227, 226, 230, 1) 100%);
    }

    .header-img {
        display: inline-block;
        vertical-align: middle;
        width: 26px;
        height: 26px;
    }

    .header-bg {
        background-image: url('../../../themes/images/groupGoods/bg_koc_recommend_top.png');
        background-repeat: no-repeat;
        background-size: 100% 246px;
    }

    .empty {
        margin-top: 24px;
        border-radius: 12px 12px 0 0;
        padding-top: 112px;
    }

    .contain {
        overflow: auto;
        height: 100%;
    }

    .designer-header {
        width: 44px;
        height: 44px;
        border-radius: 22px;
        object-fit: cover
    }

    .designer-header-default {
        border: 1px solid rgba(255, 255, 255, 1);
    }

    .designer-header-select {
        border: 2px solid @color-ec
    }

    .designer-name {
        text-align: center;
        font-size: 14px;
        margin-top: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 48px;
    }

    .d-swiper {
        /*padding: 0 8px;*/
        flex-grow: 1;

        .designer-contain {
            display: flex;
            flex-direction: column;
            /*align-items: center;*/
            justify-content: center;
        }

        .designer-name-default {
            color: @color-c3;
            font-weight: 400;
        }

        .designer-name-select {
            color: @color-ec;
            font-weight: 500;
        }
    }

    .c-title {
        font-size: 18px;
        font-weight: bold;
        color: @color-c1;
        position: relative;
        width: 80px;
        /*&:after {
            content: '';
            position: absolute;
            top: 0;
            right: -6px;
            width: 12px;
            height: 12px;
            border-radius: 6px;
            background: rgba(250, 217, 97, 1);
            opacity: 0.3;
        }*/
    }

    .swiper {
        background: white;
        padding-bottom: 20px;
    }

    .header {
        background: rgba(0, 0, 0, 0);

        .title {
            // margin: auto 0;
            // height: 100%;
            height: 40px;
        }

        .titleContain {
            width: 160px;
            height: 32px; // background: #fff;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 16px;
            position: relative;
            margin: 6px auto;
            display: flex;
            justify-content: space-between;
            align-items: center;

            section {
                display: inline-block;
                width: 50%;
                line-height: 32px;
                height: 32px;
                font-size: 14px;
                font-weight: 500;
                z-index: 200;
            }

            .title-select {
                color: @color-ec;
            }

            .title-default {
                color: #fff;
            }

            .title-slider {
                position: absolute;
                top: 0;
                transition: left 0.3s;
                width: 80px;
                height: 32px;
                background: #fff;
                border-radius: 16px;
                z-index: 100;
            }

            .title-slider-left {
                left: 0
            }

            .title-slider-right {
                left: 80px;
            }
        }
    }

    .box-header {
        vertical-align: middle;
        position: relative;
        background: linear-gradient(180deg, rgba(246, 246, 250, 1) 0%, rgba(232, 233, 237, 1) 100%);
        border-radius: 8px 8px 0 0;
        padding: 0 12px;
        height: 50px;

        .selectIcon {
            position: absolute;
        }

        p {
            line-height: 50px;
            position: relative;

            span:first-child {
                position: relative; // width: 60%;
                max-width: 60%;
                display: inline-block;
                font-size: 18px;
                font-weight: 500;
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

    .box-content {
        background-size: 100% 100%;
        background: url("../../../themes/images/groupGoods/bg_clothes_hanger.png") no-repeat;
        display: flex;
        align-items: center;

        img {
            flex-grow: 1;
            margin: 0 12px 20px 12px;
            object-fit: fill;
        }
    }

    .box-footer {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        text-align: center;
        height: 66px;

        p {
            margin: 0;

            &:first-child {
                height: 26px;
                margin-top: 11px;
                line-height: 26px;
                font-size: 18px;
                font-family: 'alibabaBold';
                font-weight: bold;
                color: @color-c1;

                span {
                    font-size: 8px;
                    font-weight: 500;
                    color: @color-c1;
                    line-height: 12px;
                }
            }

            &:last-child {
                height: 16px;
                font-size: 12px;
                font-weight: 400;
                color: @color-c3;
                line-height: 16px;
                margin-top: 2px;
            }
        }
    }

    .slide {
        width: calc(100vw - 80px);
        box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
        border-radius: 12px;
    }

    .rank {
        margin: 12px 16px 21px;
        background:linear-gradient(137deg,rgba(234,241,251,1) 0%,rgba(234,231,251,1) 100%);
        border-radius: 35px;
        height: 70px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        >div {
            &:first-child {
                display: flex;
                flex-direction: row;
                align-items: center;

                h3 {
                    font-size: 16px;
                    font-weight: bold;
                    color: @color-ec;
                    line-height: 22px;
                    margin: 0;
                }

                p {
                    margin: 4px 0 0;
                    font-size: 12px;
                    font-weight: 400;
                    color: @color-c4;
                    line-height: 16px;
                }
            }
        }

        img {
            // display: in;
            width: 28px;
            height: 28px;
            margin-right: 20px;

            &:first-child {
                display: block;
                width: 50px;
                height: 50px;
                margin-left: 12px;
                object-fit: cover;
                border-radius: 25px;
            }
        }
    }
</style>
