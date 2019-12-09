<template>
<layout-view class="header-bg">
    <c-header class="header" slot="header" :left-arrow="true" :isLight='false'>
        <div class="title" slot="title">
            <div class="titleContain">
                <span :class='["title-slider",titleIndex==1?"title-slider-right":"title-slider-left"]'></span>
                <section :class='[titleIndex==1?"title-default":"title-select"]' @click="handleSelectRec">买手推荐</section>
                <section :class='[titleIndex==0?"title-default":"title-select"]' @click="handleSelectAi">智能组货</section>
            </div>
        </div>
        <template slot="left" tag="div">
            <img class="header-img" :src="backImage" />
</template>

<template slot="right">
<p style="color:#fff" @click="handleToHall">
    前往展厅</p>
</template>
        </c-header>
        <empty-view class="empty" v-if="titleIndex == 1" />
        <empty-view class="empty" v-else-if="titleIndex == 0 && allDatas.length <= 0" emptyType="error" emptyDesc="暂无搜索结果" />
        <div v-else class="contain" :style="getBottomOffset()">
            <p class="c-title">推荐买手</p>
            <swiper v-if="showDesigner" class="d-swiper" ref="designerSwiper" :options="dSwiperOption">
                <swiper-slide class="designer-contain" v-for="item in allDatas" :key="item.groupGoodsKoc.kocCode">
                    <img :class='["designer-header",getIsCurrentDesigner(item)?"designer-header-select":"designer-header-default"]' :src="item.groupGoodsKoc.headPic" alt="">
                    <p :class='["designer-name",getIsCurrentDesigner(item)?"designer-name-select":"designer-name-default"]'>{{item.groupGoodsKoc.kocNickName}}</p>
                </swiper-slide>
            </swiper>
            <swiper v-if="showGroup" class="swiper" ref="groupSwiper" :options="swiperOption">
                <swiper-slide class="slide" v-for="item in curDesigner.groupGoodList" :key="item.groupCode" >
                    <section class="box-header">
                        <p><span>{{item.groupTitle}}</span></p>
                    </section>
                    <div class="box-content" :style="getBoxContainHeight" >
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
            <div class="rank" @click="handleToRank" >
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
    props: {

    },
    data() {
        return {
            showDesigner: false,
            showGroup: false,
            curDesigner: {},
            backImage: require('@/themes/images/app/icon_nav_back_white@3x.png'),
            titleIndex: 0,
            screenWidth: document.body.clientWidth,
            allDatas: [],
            footerTitles: ['推荐指数', '时尚指数', '热销指数'],
            swiperOption: {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 16 * window.devicePixelRatio,
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
                slidesPerView: 4.6,
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
        '$route' (to, from) {
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
            let width = this.screenWidth - 72 * window.devicePixelRatio
            let height = width / (303 / 342)
            return `height:${height}px`
        },
        getBoxContainHeight() {
            let width = this.screenWidth - 72 * window.devicePixelRatio
            let height = width / (303 / 342) + 20 * window.devicePixelRatio
            return `height:${height}px`
        }
    },
    methods: {
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
    activated() {
        window.sa.track('IPX_WEB', {
            page: 'groupFilterResult', // 页面名字
            type: 'pageView', // 固定参数，不用改
            event: 'pageView' // 固定参数，不用改
        })
        let swiper = this.$refs.designerSwiper.swiper
        swiper.slideTo(0, 0, false)
        let gSwiper = this.$refs.groupSwiper.swiper
        gSwiper.slideTo(0, 0, false)
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
        this.handleRequest()
    }
}
</script>

<style lang='less' scoped>
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
    border-radius: 12px 12px 0px 0px;
    padding-top: 112px;
}

.contain {
    overflow: auto;
    height: 100%;
}

.d-swiper {
    margin: 16px 16px 0;
    height: 108px;
    box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
    border-radius: 12px;
    background: #fff;
    padding: 0 8px;
    .designer-contain {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .designer-header {
        width: 48px;
        height: 48px;
        border-radius: 24px;
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
        line-height: 20px;
        margin-top: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
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
    font-size: 20px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;
    margin-top: 34px;
    margin-left: 16px;
    position: relative;
    width: 80px;
    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: -6px;
        width: 12px;
        height: 12px;
        border-radius: 6px;
        background: rgba(250, 217, 97, 1);
        opacity: 0.3;
    }
}

.swiper {
    margin-top: 20px;
    margin-left: -16px;
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
            // width: 60%;
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
    background: url("../../../themes/images/groupGoods/bg_clothes_hanger.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    img {
        width: calc(100vw - 72px);
        margin: 0 12px 0px;
        object-fit: cover;
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
    width: calc(100vw - 48px);
    box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.06);
    border-radius: 12px;
}

.rank {
    margin: 12px 16px 0;
    background: @color-ec1;
    border-radius: 12px;
    height: 70px;
    margin-bottom: 21px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    div {
        &:first-child {
            display: flex;
            flex-direction: row;
            align-items: center;
            h3 {
                font-size: 18px;
                font-weight: 500;
                color: @color-c1;
                line-height: 26px;
                margin: 0;
            }
            p {
                margin: 0;
                font-size: 12px;
                font-weight: 400;
                color: @color-c3;
                line-height: 16px;
                margin-top: 4px;
            }
        }
    }
    img {
        // display: in;
        width: 28px;
        height: 28px;
        margin-right: 12px;
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
