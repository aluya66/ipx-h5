<template>
    <layout-view :style="headerAlpha === 0 ? getBackgroundUrl() : handleAdjustHeaderBg()">
        <c-header slot="header" :left-arrow="true" :showBorderBottom='headerAlpha !== 0'
                  :isLight="false"
                  :pageOutStatus="true"
                  :style="getHeaderBg()">
        </c-header>
        <div class="custom-container" >
            <div class="custom-main">
                <div class="custom-designer">
                    <designer-info class="samples-designer" :designer="designer"/>
                </div>
                <div class="publish-demand">
                    <span class="font-style-c1-bold demand-des">按需定制专属样衣</span>
                    <span class="demand-btn" @click="publishDemand()">找Ta定制开款</span>
                </div>
                <span class="font-style-c1-bold custom-process">定制开款流程</span>
                <div class="custom-process-introduce">
                    <div class="process">
                        <img src="../../themes/images/designer/icon_issue@2x.png"/>
                        <span class="">提交需求</span>
                    </div>
                    <div class="process-divider">
                        <span>...</span>
                        <img src="../../themes/images/designer/icon_next_blue@2x.png"/>
                    </div>
                    <div class="process">
                        <img src="../../themes/images/designer/icon_communicate@2x.png"/>
                        <span>沟通需求</span>
                    </div>
                    <div class="process-divider">
                        <span>...</span>
                        <img src="../../themes/images/designer/icon_next_blue@2x.png"/>
                    </div>
                    <div class="process">
                        <img src="../../themes/images/designer/icon_design_clothe@2x.png"/>
                        <span>设计出款</span>
                    </div>
                    <div class="process-divider">
                        <span>...</span>
                        <img src="../../themes/images/designer/icon_next_blue@2x.png"/>
                    </div>
                    <div class="process">
                        <img src="../../themes/images/designer/icon_check@2x.png"/>
                        <span>验收完成</span>
                    </div>
                </div>
                <span class="font-style-c1-bold custom-process">业务范围</span>
                <span class="business-range">{{customInfo.businessDescribe}}</span>
                <span class="font-style-c1-bold custom-process">案例展示</span>
                <div class="show-samples">
                    <img :style="getPictureRect()" v-for="(item, index) in customInfo.showUrl" :key="index"
                         :class="[index % 3 === 1 ? 'margin-l-r-8':'', index>=3 ? 'margin-t-8' : '']" :src="item"/>
                </div>
            </div>
        </div>
    </layout-view>
</template>

<script>
import DesignerInfo from './designerInfo'
import utils from '../../utils'

export default {
    components: {
        DesignerInfo
    },
    data() {
        return {
            designer: {
                backgroundUrl: ''
            },
            designerId: '0',
            designsHallId: '0',
            customInfo: {
                businessDescribe: '',
                showUrl: []
            },
            headerAlpha: 0
        }
    },
    methods: {
        getBackgroundUrl() {
            return `background-image:url(${this.designer.backgroundUrl});background-size:100%`
        },
        handleAdjustHeaderBg() {
            let w = window.screen.width
            let h = w * 476 / 375 / 100
            if (this.headerAlpha > 0) {
                h = 0
            }
            return `background-size:100% ${h}rem`
        },
        getHeaderBg() {
            return `background:rgba(255,255,255,${this.headerAlpha});margin-bottom:0`
        },
        getDesignerHall() {
            const params = {
                designerId: this.designerId
            }
            this.$api.designer.getDesignerHall(params).then(res => {
                this.designer = res
                console.log(this.designer)
            })
        },
        getPictureRect() {
            // `padding-bottom:${y}px !important`
            let width = (document.body.clientWidth - 48 * window.devicePixelRatio) / 3
            return `width:${width}px`
        },
        getCustomPay() {
            const params = {
                designsHallId: this.designsHallId
            }
            this.$api.designer.getCustomPay(params).then(res => {
                this.customInfo = res
                console.log(this.designer)
            })
        },
        publishDemand() {
            const params = {
                jumpUrl: 'publishDemand://'
            }
            utils.postMessage('', params)
        },
        handleScroll() {
            window.addEventListener(
                'scroll',
                () => {
                    let scrollTop = document.querySelector('.custom-container') && document.querySelector('.custom-container').scrollTop
                    if (scrollTop >= 60 * window.devicePixelRatio) {
                        this.headerAlpha = 1
                    } else {
                        this.headerAlpha = 0
                    }
                },
                true
            )
        }
    },
    mounted() {
        if (this.$route.query.designerId !== undefined) {
            this.designerId = this.$route.query.designerId
            this.getDesignerHall()
        }
        if (this.$route.query.designsHallId !== undefined) {
            this.designsHallId = this.$route.query.designsHallId
            this.getCustomPay()
        }
        this.handleScroll()
    }
}
</script>

<style lang="less" scoped>
    .font-style-c1-bold {
        color: @color-c1;
        font-weight: bold;
    }

    .margin-l-r-8 {
        margin-left: 8px;
        margin-right: 8px;
    }

    .margin-t-8 {
        margin-top: 8px;
    }

    .custom-container {
        position: relative;
        height: 100%;
        overflow: scroll;
        background-repeat: no-repeat;
        background-attachment: fixed;

        .custom-header {
            width: 100%;
            position: fixed;
            z-index: 1;
            >img {
                width: 26px;
                height: 26px;
                margin-left: 16px;
            }
        }

        .custom-designer {
            width: 100%;
            /*position: absolute;*/
            /*left: 0;*/
            /*top: 0;*/
            margin-top: -94px;

            /*.samples-designer {*/
            /*    margin-top: 136px;*/
            /*}*/
        }

        .custom-main {
            background: white;
            width: 100%;
            position: absolute;
            left: 0;
            top: 142px;
            display: flex;
            flex-direction: column;

            .publish-demand {
                height: 142px;
                background-image: url("../../themes/images/designer/bg_customization@2x.png");
                background-repeat: no-repeat;
                margin: 8px 16px 12px 16px;
                background-size: 100% 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

                .demand-des {
                    font-size: 20px;
                    margin-top: 40px;
                }

                .demand-btn {
                    background: @color-ec1;
                    border-radius: 16px;
                    border: 1px solid @color-ec;
                    height: 32px;
                    margin-top: 10px;
                    color: @color-ec;
                    padding: 0 16px;
                    line-height: 32px;
                    text-align: center;
                }
            }

            .custom-process {
                font-size: 18px;
                margin-left: 16px;
                margin-top: 12px;
            }

            .custom-process-introduce {
                height: 108px;
                background: white;
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
                border-radius: 8px;
                display: flex;
                flex-direction: row;
                margin: 12px 16px;
                padding: 12px 15px 15px 15px;

                .process {
                    text-align: center;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    > img {
                        width: 48px;
                        height: 48px;
                    }

                    > span {
                        font-size: 14px;
                        margin-top: 12px;
                    }
                }

                .process-divider {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding-bottom: 6px;
                    padding-top: 18px;
                    color: #E1E2E6;

                    > img {
                        width: 16px;
                        height: 16px;
                    }
                }
            }

            .business-range {
                margin: 12px 16px;
                color: @color-c3;
                font-size: 16px;
            }

            .show-samples {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                width: 100%;
                padding: 12px 16px;
                overflow-x: hidden;

                > img {
                    height: 146px;
                    border-radius: 4px;
                }
            }
        }

    }
</style>
