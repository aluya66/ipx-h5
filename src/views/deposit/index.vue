<template>
    <layout-view class="hall-bg" :style="handleAdjustHeaderBg()">
        <c-header
            style="z-index:2"
            slot="header"
            class="hall-header"
            :style="navAlpha"
            :isLight="false"
            :left-arrow="true"
            :pageOutStatus="isNative"
            :showBorderBottom="headerAlpha === 1"
        >
            <div slot="title" style="color:#000" v-show="headerAlpha === 1" >极速上店</div>
        </c-header>
        <div class="contain-view" :style="getBottomOffset(49)">
            <div class="radius-header" :style="headerTop">
                <span></span>
            </div>
            <div class="planList-contain">
                <plan-view v-for="(item, index) in planItems" :key="index" :data="item" :showConnectIcon="index > 0" ></plan-view>
            </div>
            <div>
                <p class="pre-view">即将上线  敬请期待</p>
            </div>
            <div class="enter-view">
                <section class="enter-item">
                    <img :src="firstImg" alt="">
                    <p>商品陈列服务</p>
                </section>
                <section class="enter-item">
                    <img :src="secImg" alt="">
                    <p>服装营销培训</p>
                </section>
                <section class="enter-item">
                    <img :src="thirdImg" alt="">
                    <p>门店经营指南</p>
                </section>
            </div>
        </div>
        <fixed-view class="footer-shadow">
            <template slot="footerContain">
                <div class="footer-view">
                    <section :class='["section-common","button-default"]' @click="handleMore">了解更多</section>
                    <section :class='["section-common","button-select"]' @click="handleBuy">立即购买</section>
                </div>
            </template>
        </fixed-view>
    </layout-view>
</template>

<script>
import PlanView from './depositPlanView.vue'
import FixedView from '../common/bottomFixedView.vue'
import utils from 'utils'

export default {
    components: {
        PlanView,
        FixedView
    },
    data() {
        return {
            isNative: false,
            planItems: [1, 2, 4],
            firstImg: require('../../themes/images/app/icon_commodity_display@3x.png'),
            secImg: require('../../themes/images/app/icon_train@3x.png'),
            thirdImg: require('../../themes/images/app/icon_manage_guide@3x.png'),
            headerAlpha: 0
        }
    },
    computed: {
        headerTop() {
            let baseParams = utils.getStore('baseParams')
            let navHeight = 64
            if (baseParams.isIphoneX) {
                navHeight = 88
            }
            let w = window.screen.width
            let h = w * 476 / 375
            let top = (h - 52 - navHeight) / 100
            return `margin-top:${top}rem`
        },
        navAlpha() {
            return `background:rgb(255,255,255,${this.headerAlpha});margin-bottom:0`
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleAdjustHeaderBg() {
            let w = window.screen.width
            let h = w * 476 / 375 / 100
            if (this.headerAlpha > 0) {
                h = 0
            }
            return `background-size:100% ${h}rem`
        },
        handleMore() {
            this.$router.push({
                path: '/intention'
            })
        },
        handleBuy() {
            this.$router.push({
                path: '/deposit/purchasePlan'
            })
        },
        handleScroll() {
            window.addEventListener(
                'scroll',
                () => {
                    let scrollTop = document.querySelector('.contain-view') && document.querySelector('.contain-view').scrollTop
                    let offsetTop = document.querySelector('.planList-contain') && document.querySelector('.planList-contain').offsetTop
                    if (scrollTop >= offsetTop) {
                        this.headerAlpha = 1
                    } else {
                        this.headerAlpha = 0
                    }
                    console.log('offsetTop == ', offsetTop)
                    console.log('scrollTop == ', scrollTop)
                },
                true
            )
        },
        handleRequest() {
            this.$api.deposit.getDepositConfig().then(res => {
                if (res instanceof Array) {
                    this.planItems = res
                }
            }).catch(() => {

            })
        }
    },
    activated() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        this.headerAlpha = 0
        this.handleRequest()
    },
    mounted() {
        this.handleScroll()
    }
}
</script>

<style lang="less" scoped>
.header-img {
  display: inline-block;
  vertical-align: middle;
  width: 26px;
  height: 26px;
}

.hall-bg {
  background-image: url("../../themes/images/app/banner_laying@3x.png");
  background-repeat: no-repeat;
  background-size: 100% 212px;
}

.hall-header {
  background: rgba(0, 0, 0, 0);
}
.contain-view {
    overflow: scroll;
    height: 100%;
}
.footer-shadow {
    box-shadow:0px -1px 6px 0px rgba(33,44,98,0.06);
    border-radius:12px 12px 0px 0px;
    z-index: 99999;
}
.footer-view {
    margin: 5px 24px 0;
    display: flex;
    width: calc(100vw - 48px);
    flex-direction: row;
    justify-content :space-between;
    .section-common {
        font-size:14px;
        font-weight:500;
        line-height:40px;
        text-align: center;
    }
    .button-default {
        height:40px;
        background:linear-gradient(322deg,rgba(238,236,255,1) 0%,rgba(216,212,255,1) 100%);
        border-radius:20px;
        width: calc(50vw - 31.5px);
        color: @color-ec
    }
    .button-select {
        .btn-select(calc(50vw - 31.5px),40px,true);
    }
}
.radius-header {
    height: 31px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background: #fff;
    position: relative;
    span {
        display: block;
        width:30px;
        height:4px;
        background:rgba(225,226,230,1);
        border-radius:5px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
.planList-contain {
    background: #fff;
    margin: -1px 0;
    padding: 22px 20px 0;
}
.pre-view {
    margin-top: 56px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(43,49,51,1);
    line-height:20px;
    text-align: center;
    position: relative;
    background: #fff;
    &::before {
        content: '';
        width:24px;
        height:1px;
        background:rgba(216,216,216,1);
        display: block;
        position: absolute;
        left: calc(50vw - 101px);
        top: 10px;
    }
    &::after {
        content: '';
        width:24px;
        height:1px;
        background:rgba(216,216,216,1);
        display: block;
        position: absolute;
        right: calc(50vw - 101px);
        top: 10px;
    }
}
.enter-view {
    padding: 0 4px;
    margin-top: 29px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .enter-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 18px;
        width: calc(33.33vw);
        img {
            display: block;
            width: 64px; // calc(33.33vw - 58.8px);
            height: 64px //calc(33.33vw - 58.8px);
        }
        p {
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(43,49,51,1);
            line-height:20px;
            text-align: center;
            margin-top: 8px;
        }
    }
}
</style>
