<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative" :showBorderBottom='true'>
            <div slot="title">定制专属时尚口罩</div>
        </c-header>
        <div class="flex-column customized-main">
            <div class="mask-mode flex-column flex-center">
                <img class="mode-logo" src="../../themes/images/mask/alienmade_logo@2x.png"/>
                <img class="mode-title" :style="getModeTitleRect()" src="../../themes/images/mask/title_customized@2x.png"/>
                <div class="mode-samples">
                    <img :style="getRoundRect()" src="../../themes/images/mask/img_word_white@2x.png"/>
                    <img :style="getRoundRect()" class="img-margin-left" src="../../themes/images/mask/img_word_black@2x.png"/>
                    <img :style="getRoundRect()" class="img-margin-top" src="../../themes/images/mask/img_tiger.png"/>
                    <img :style="getRoundRect()" class="img-margin-top img-margin-left" src="../../themes/images/mask/img_marmot.png"/>
                </div>
                <img src="../../themes/images/mask/pic_model@2x.png" :style="getModeShowRect()"/>
            </div>
            <div class="mask-team">
                <div class="team-title flex-row">
                    <span class="title-black">顶级设计师团队</span>
                    <img src="../../themes/images/mask/img_title_black.png"/>
                </div>
                <span class="subtitle-black margin-top-2">TOP DESIGNER TEAM</span>
                <div class="yellow-divider flex-row">
                    <i class="divider-left"/>
                    <i class="divider-right"/>
                </div>
                <div class="team-data margin-top-31">
                    <span class="blue">1000+</span>
                    <span class="black">设计师创意赋能</span>
                </div>
                <div class="team-data margin-top-4">
                    <span class="black">日产</span>
                    <span class="blue">100+</span>
                    <span class="black">款式</span>
                </div>
                <img class="margin-top-25" :style="getTeamShowRect()"
                     src="../../themes/images/mask/pic_designer@2x.png"/>
            </div>
            <div class="mask-supply-chain flex-column flex-center">
                <span class="supply-title">成熟供应链体系</span>
                <span class="supply-subtitle">MATURE SUPPLY CHAIN SYSTEM</span>
                <div class="yellow-divider flex-row">
                    <i class="divider-left"/>
                    <i class="divider-right"/>
                </div>
                <div class="flex-row supply-days margin-top-31">
                    <span class="data">3天</span>
                    <span class="describe">设计打样</span>
                    <span class="margin-left-8 data">7天</span>
                    <span class="describe">交付入仓</span>
                    <span class="margin-left-8 data">3天</span>
                    <span class="describe">快速翻单</span>
                </div>
                <div class="supply-days flex-row margin-top-10">
                    <span class="describe">日产纳米滤芯</span>
                    <span class="data">100W+</span>
                </div>
                <div class="supply-days flex-row margin-top-10">
                    <span class="describe">日产能</span>
                    <span class="data">100W+</span>
                </div>
                <div class="supply-days flex-row margin-top-10">
                    <span class="describe">储备日产能</span>
                    <span class="data">300W+</span>
                </div>
                <div class="mode-samples">
                    <img :style="getRoundRect()" src="../../themes/images/mask/img_supply_chain1.png"/>
                    <img :style="getRoundRect()" class="img-margin-left" src="../../themes/images/mask/img_supply_chain2.png"/>
                    <img :style="getRoundRect()" class="img-margin-top" src="../../themes/images/mask/img_supply_chain3.png"/>
                    <img :style="getRoundRect()" class="img-margin-top img-margin-left" src="../../themes/images/mask/img_supply_chain4.png"/>
                </div>
            </div>
            <div class="mask-process flex-column flex-center">
                <span class="margin-top-56 title-black">定制流程</span>
                <span class="subtitle-black margin-top-2">CUSTOMIZATION PROCESS</span>
                <div class="yellow-divider flex-row">
                    <i class="divider-left"/>
                    <i class="divider-right"/>
                </div>
                <div class="width-100vw-52 flex-row flex-center flex-between margin-top-40">
                    <img src="../../themes/images/mask/img_process1.png" class="rect-56"/>
                    <img class="rect-20" src="../../themes/images/mask/icon_next.png"/>
                    <img src="../../themes/images/mask/img_process2.png" class="rect-56"/>
                    <img class="rect-20" src="../../themes/images/mask/icon_next.png"/>
                    <img src="../../themes/images/mask/img_process3.png" class="rect-56"/>
                </div>
                <div class="width-100vw-52 flex-row flex-center flex-between margin-top-12">
                    <span class="subtitle-gray">提供素材</span>
                    <span class="subtitle-gray">设计定稿</span>
                    <span class="subtitle-gray">口罩打样</span>
                </div>
                <div class="process-trans width-100vw-52 flex-row margin-top-16">
                    <img class="rect-20 transform-90" src="../../themes/images/mask/icon_next.png"/>
                </div>
                <div class="width-100vw-52 flex-row flex-center flex-between margin-top-16">
                    <img src="../../themes/images/mask/img_process4.png" class="rect-56"/>
                    <img class="rect-20 transform-180" src="../../themes/images/mask/icon_next.png"/>
                    <img src="../../themes/images/mask/img_process5.png" class="rect-56"/>
                    <img class="rect-20 transform-180" src="../../themes/images/mask/icon_next.png"/>
                    <img src="../../themes/images/mask/img_process6.png" class="rect-56"/>
                </div>
                <div class="width-100vw-52 flex-row flex-center flex-between margin-top-12">
                    <span class="subtitle-gray">大货交付</span>
                    <span class="subtitle-gray">订单生产</span>
                    <span class="subtitle-gray">合同签订</span>
                </div>
            </div>
            <div class="mask-detail flex-column">
                <div class="team-title flex-row margin-l-r-28">
                    <span class="title-black">产品细节</span>
                    <img src="../../themes/images/mask/img_title_black.png"/>
                </div>
                <span class="subtitle-black margin-top-2 margin-l-r-28">细微之处也高级</span>
                <div class="yellow-divider flex-row margin-top-24 margin-l-r-28">
                    <i class="divider-left"/>
                    <i class="divider-right"/>
                </div>
                <span class="describe margin-top-16 margin-l-r-28">Product details <br>Subtlety is also superior</span>
                <div class="detail-show flex-row margin-top-40 flex-between margin-l-r-36">
                    <div class="detail-show-item flex-column flex-center" :style="getDetailItemRect()">
                        <img :style="getDetailItemImageRect()" src="../../themes/images/mask/img_detail_nose.png"/>
                        <span class="show-item-title">鼻梁处软骨塑形<br>贴合面部</span>
                        <span class="show-item-subtitle">Nasal cartilage<br>Fit to the face</span>
                    </div>
                    <div class="detail-show-item flex-column flex-center" :style="getDetailItemRect()">
                        <img :style="getDetailItemImageRect()" src="../../themes/images/mask/img_detail_material.png"/>
                        <span class="show-item-title">婴儿级面料<br>完全无敏</span>
                        <span class="show-item-subtitle">Baby fabric<br>Skin-friendlye</span>
                    </div>
                </div>
                <img class="margin-top-24" src="../../themes/images/mask/img_detail_show.png"
                     :style="getDetailShowRect()"/>
            </div>
            <div class="mask-advantage flex-column">
                <div class="mask-title flex-row flex-between margin-l-r-28">
                    <img class="rect-20" src="../../themes/images/mask/img_title_white.png"/>
                    <span class="title-white">滤芯优势</span>
                </div>
                <img class="percent margin-top-24  margin-l-r-28" src="../../themes/images/mask/img_advantage_percent.png"/>
                <div class="yellow-divider flex-row  margin-l-r-28 margin-top-important-16">
                    <i class="divider-left"/>
                    <i class="divider-right"/>
                </div>
                <p class="margin-top-26  margin-l-r-28">
                    相比传统的滤芯，用纳米纤维滤芯，会更轻薄，且达到非常高的透气性，胜过常规一次性防护口罩，长时间佩戴，嘴也不会有潮湿不适的感觉。
                </p>
                <p class="margin-top-16  margin-l-r-28">
                    经过权威机构检测证明，滤阻滤效高达98.7%。
                </p>
                <img class="margin-top-7" src="../../themes/images/mask/img_filter.png" :style="getFilterShowRect()"/>
                <div class="margin-top-24 flex-row flex-between mask-title margin-l-r-28">
                    <div class="mask-circle flex-column">
                        新材料
                    </div>
                    <div class="mask-circle flex-column">
                        更轻薄
                    </div>
                    <div class="mask-circle flex-column">
                        高透气
                    </div>
                    <div class="mask-circle flex-column">
                        无惧酒<br>精沸水
                    </div>
                </div>
            </div>
            <div class="mask-cooperation flex-column flex-center">
                <span class="title-black">合作案例</span>
                <span class="subtitle-black">COOPERATION CASE</span>
                <div class="yellow-divider flex-row margin-top-24">
                    <i class="divider-left"/>
                    <i class="divider-right"/>
                </div>
                <div class="cooperation-width flex-row flex-between margin-top-35">
                    <img class="cooperation-image" :style="getCooperationImageRect()" src="../../themes/images/mask/img_st_john.png"/>
                    <img class="cooperation-image" :style="getCooperationImageRect()" src="../../themes/images/mask/img_wolford.png"/>
                    <img class="cooperation-image" :style="getCooperationImageRect()" src="../../themes/images/mask/img_more.png"/>
                </div>
                <div class="cooperation-width flex-row flex-between margin-top-7">
                    <span class="cooperation-name">ST.JOHN</span>
                    <span class="cooperation-name">WOLFORD</span>
                    <span class="cooperation-name">更多合作</span>
                </div>
            </div>
        </div>

        <div class="customized-right-now" @click="goToCustomized()">
            立即定制
        </div>
    </layout-view>
</template>

<script>
export default {
    data() {
        return {
            isNative: false,
            screenWidth: document.body.clientWidth
        }
    },
    methods: {
        getModeShowRect() {
            let width = parseInt(this.screenWidth - 56 * window.devicePixelRatio)
            let height = parseInt(width * 523 / 319)
            return `width:${width}px;height:${height}px`
        },
        getModeTitleRect() {
            let width = parseInt(this.screenWidth - 32 * window.devicePixelRatio)
            let height = parseInt(width * 80 / 343)
            return `width:${width}px;height:${height}px`
        },
        getTeamShowRect() {
            let width = this.screenWidth - 56 * window.devicePixelRatio
            let height = width * 410 / 319
            return `width:${width}px;height:${height}px`
        },
        getDetailShowRect() {
            let width = this.screenWidth
            let height = width * 388 / 375
            return `width:${width}px;height:${height}px`
        },
        getFilterShowRect() {
            let width = this.screenWidth
            let height = width * 301 / 375
            return `width:${width}px;height:${height}px`
        },
        goToCustomized() {
            this.$router.push({
                path: '/mask/intention'
            })
        },
        getRoundRect() {
            let width = parseInt((this.screenWidth - 73 * window.devicePixelRatio) / 2)
            return `width:${width}px;height:${width}px`
        },
        getDetailItemRect() {
            let width = parseInt((this.screenWidth - 90 * window.devicePixelRatio) / 2)
            return `width:${width}px`
        },
        getDetailItemImageRect() {
            let width = parseInt((this.screenWidth - 90 * window.devicePixelRatio) / 2)
            return `width:${width}px;height:${width}px`
        },
        getCooperationImageRect() {
            let width = parseInt((this.screenWidth - 72 * window.devicePixelRatio) / 3)
            let height = parseInt(width * 74 / 100)
            return `width:${width}px;height:${height}px`
        }
    },
    activated() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
    }
}
</script>

<style lang="less" scoped>
    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
    }

    .flex-center {
        align-items: center;
    }

    .flex-between {
        justify-content: space-between;
    }

    .margin-left-8 {
        margin-left: 8px;
    }

    .margin-top-2 {
        margin-top: 2px;
    }

    .margin-top-7 {
        margin-top: 7px;
    }

    .margin-top-10 {
        margin-top: 10px;
    }

    .margin-top-12 {
        margin-top: 12px;
    }

    .margin-top-16 {
        margin-top: 16px;
    }

    .margin-top-24 {
        margin-top: 24px;
    }

    .margin-top-26 {
        margin-top: 26px;
    }

    .margin-top-31 {
        margin-top: 31px;
    }

    .margin-top-35 {
        margin-top: 35px;
    }

    .margin-top-40 {
        margin-top: 40px;
    }

    .margin-top-52 {
        margin-top: 52px;
    }

    .margin-top-56 {
        margin-top: 56px;
    }

    .margin-l-r-28 {
        margin-left: 28px;
        margin-right: 28px;
    }

    .margin-l-r-36 {
        margin-left: 36px;
        margin-right: 36px;
    }

    .mode-samples {
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 40px 28px 56px 28px;

        .img-margin-left {
            margin-left: 17px;
        }

        .img-margin-top {
            margin-top: 16px;
        }
    }

    .rect-20 {
        width: 20px;
        height: 20px;
    }

    .rect-56 {
        width: 56px;
        height: 56px;
    }

    .title-black {
        font-size: 24px;
        font-weight: bold;
        color: @color-c1;
        line-height: 33px;
    }

    .title-white {
        font-size: 24px;
        font-weight: bold;
        color: white;
        line-height: 33px;
    }

    .subtitle-black {
        font-size: 13px;
        color: @color-c2;
        line-height: 18px;
    }

    .subtitle-gray {
        font-size: 14px;
        font-weight: bold;
        color: rgba(88, 91, 102, 1);
        line-height: 20px;
    }

    .transform-90 {
        transform: rotate(90deg);
    }

    .transform-180 {
        transform: rotate(180deg);
    }

    .transform-270 {
        transform: rotate(270deg);
    }

    .customized-main {
        overflow: scroll;
        height: 100%;
        width: 100%;

        .mask-mode {
            background: url("../../themes/images/mask/bg_top@2x.png") no-repeat;
            background-size: 100%;
            width: 100%;
            padding-bottom: 80px;
            flex-shrink: 0;

            .mode-logo {
                width: 85px;
                height: 28px;
            }

            .mode-title {
                margin-top: 8px;
            }

        }

        .mask-team {
            background: white;
            padding: 56px 28px 83px 28px;

            .team-title {
                justify-content: space-between;
                width: calc(100vw - 56px);

                > img {
                    width: 24px;
                    height: 24px;
                }
            }

            .margin-top-4 {
                margin-top: 4px;
            }

            .margin-top-25 {
                margin-top: 25px;
            }

            .team-data {
                line-height: 20px;
                font-weight: bold;

                .blue {
                    color: @color-ec;
                    font-size: 14px;
                }

                .black {
                    color: @color-c1;
                    font-size: 12px;
                }

                .span1 {

                }
            }

            .team-creative-data {

            }
        }

        .mask-supply-chain {
            background: url("../../themes/images/mask/bg_supply_chain.png") no-repeat;
            background-size: 100% 100%;
            width: 100%;
            padding-bottom: 24px;
            flex-shrink: 0;

            .supply-title {
                margin-top: 56px;
                font-size: 24px;
                font-weight: 600;
                color: white;
                line-height: 33px;
            }

            .supply-subtitle {
                font-size: 13px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 18px;
                margin-top: 2px;
            }

            .supply-days {
                align-items: flex-end;
                color: white;

                .data {
                    font-weight: bold;
                    font-size: 14px;
                }

                .describe {
                    font-size: 12px;
                }
            }
        }

        .mask-process {
            background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(244, 245, 247, 1) 100%);
            position: relative;
            width: 100%;
            padding-bottom: 80px;
            flex-shrink: 0;

            .process-trans {
                justify-content: flex-end;
                margin-right: 18px;
            }
        }

        .mask-detail {
            background: white;
            width: 100%;
            padding: 56px 0 48px 0;
            flex-shrink: 0;

            .team-title {
                justify-content: space-between;
                width: calc(100vw - 56px);

                > img {
                    width: 24px;
                    height: 24px;
                }
            }

            > span {
                width: calc(100vw - 56px);
            }

            .describe {
                font-size: 10px;
                font-weight: 100;
                color: rgba(138, 140, 153, 1);
                line-height: 14px;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .detail-show {
                width: calc(100vw - 72px);

                .detail-show-item {
                    background: #1C1C1C;
                    border-radius: 8px;

                    > img {
                        border-radius: 8px 8px 0 0;
                        width: 143px;
                        height: 143px;
                    }

                    .show-item-title {
                        font-size: 12px;
                        text-align: center;
                        line-height: 16px;
                        margin-top: 4px;
                        color: rgba(255, 255, 255, 1);
                    }

                    .show-item-subtitle {
                        font-size: 9px;
                        font-weight: 300;
                        margin-top: 8px;
                        text-align: center;
                        color: rgba(255, 255, 255, 1);
                        line-height: 14px;
                        margin-bottom: 8px;
                    }
                }
            }

            > img {
                width: 100%;
            }
        }

        .mask-advantage {
            background: #4762F8;
            width: 100%;
            align-items: flex-end;
            padding: 56px 0 80px 0;
            color: white;
            flex-shrink: 0;
            .mask-title {
                width: calc(100vw - 56px);
            }
            .percent {
                width: 204px;
                height: 32px;
            }
            >p {
                width: calc(100vw - 56px);
                font-size:12px;
                font-weight:400;
                color: white;
                line-height:17px;
            }
            .mask-circle {
                width:68px;
                height:68px;
                border-radius: 34px;
                justify-content: center;
                text-align: center;
                border:1px solid rgba(255,255,255,1);
            }
        }

        .mask-cooperation {
            padding: 56px 26px 125px 26px;
            flex-shrink: 0;
            .cooperation-image {
                border: solid 1px @color-c7;
                border-radius: 8px;
            }
            .cooperation-width {
                width: calc(100vw - 56px);
            }
            .cooperation-name {
                width: 100px;
                text-align: center;
                font-size:12px;
                font-weight:400;
                color:rgba(88,91,102,1);
                line-height:17px;
            }
        }
    }

    .width-100vw-52 {
        width: calc(100vw - 104px);
    }

    .margin-top-important-16 {
        margin-top: 16px !important;
    }

    .yellow-divider {
        margin-top: 24px;

        .divider-left {
            background: #FFD924;
            border-radius: 1px;
            width: 18px;
            height: 2px;
        }

        .divider-right {
            background: #FFD924;
            border-radius: 1px;
            margin-left: 2px;
            width: 2px;
            height: 2px;
        }
    }

    .customized-right-now {
        position: fixed;
        height: 50px;
        bottom: 0;
        left: 0;
        width: calc(100vw - 56px);
        background: linear-gradient(142deg, rgba(255, 241, 115, 1) 0%, rgba(255, 212, 82, 1) 100%);
        border-radius: 25px;
        margin: 0 28px 34px 28px;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: @color-c1;
    }
</style>
