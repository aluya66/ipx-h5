<template>
    <layout-view :style="headerAlpha === 0 ? getBackgroundUrl() : handleAdjustHeaderBg()">
        <c-header slot="header" :left-arrow="true" :showBorderBottom='headerAlpha !== 0'
                  :isLight="false"
                  :pageOutStatus="true"
                  :style="getHeaderBg()">
        </c-header>
        <div class="agent-container">
            <div class="agent-main">
                <div class="agent-designer">
                    <designer-info class="samples-designer" :designer="designer"/>
                </div>
                <div class="join-ip">
                    <img src="../../themes/images/designer/icon_designer_agent.png"/>
                    <span class="font-style-c1-bold ip-des">加入IP代理计划</span>
                    <span class="demand-btn">可享受品牌和库存，不用担心库存问题</span>
                </div>
                <span class="font-style-c1-bold agent-process">IP代理计划</span>
                <span class="business-range">代理该设计师以后，将享受IP联营的权益，设计师将提供原创品牌授权及备货，您将享受到品牌和库存，不用担心库存问题</span>
                <span class="join-agent" @click="joinAgent()">想代理加盟</span>
            </div>
        </div>
        <div class="popup-window" v-if="isShowDialog">
            <div class="popup-main">
                <img src="../../themes/images/designer/pic_agent_province.png"/>
                <span class="popup-phone">+86 14704462886</span>
                <span class="popup-des">告诉我们您想代理的省份，稍后我们设计师品牌顾问会联系您</span>
                <div class="select-city" @click="selectProvince">
                    <img src="../../themes/images/designer/icon_location2_20_20@2x.png"/>
                    <span>{{provinceName||'选择代理省份'}}</span>
                    <img src="../../themes/images/designer/icon_next_20_20_def@2x.png"/>
                </div>
                <span class="submit" @click="postAgentExhibition">提交</span>
            </div>
            <img src="../../themes/images/designer/icon_popup_close_def@2x.png" @click="joinAgent()"/>
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
            agentInfo: {
                businessDescribe: '',
                showUrl: []
            },
            headerAlpha: 0,
            isShowDialog: false,
            phoneNumber: '',
            provinceCode: '',
            provinceName: ''
        }
    },
    methods: {
        getBackgroundUrl() {
            return `background-image:url(${this.designer.backgroundUrl});background-size:100%;background-repeat:no-repeat`
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
        handleScroll() {
            window.addEventListener(
                'scroll',
                () => {
                    let scrollTop = document.querySelector('.agent-container') && document.querySelector('.agent-container').scrollTop
                    if (scrollTop >= 60 * window.devicePixelRatio) {
                        this.headerAlpha = 1
                    } else {
                        this.headerAlpha = 0
                    }
                },
                true
            )
        },
        joinAgent() {
            this.isShowDialog = !this.isShowDialog
        },
        postAgentExhibition() {
            let params = {
                phoneNumber: this.phoneNumber,
                provinceCode: this.provinceCode,
                designsHallId: this.designer.id,
                provinceName: this.provinceName
            }
            this.$api.designer.agentExhibition(params).then(res => {
                console.log(res)
            })
        },
        selectProvince() {
            let params = {
                jumpUrl: 'selectProvince://'
            }
            utils.postMessage('', params)
            window.setProvince = (phoneNumber, provinceName, provinceCode) => {
                this.phoneNumber = phoneNumber
                this.provinceCode = provinceCode
                this.provinceName = provinceName
                console.log('省份：' + this.provinceName + ', 编码：' + this.provinceCode)
            }
        }
    },
    mounted() {
        if (this.$route.query.designerId !== undefined) {
            this.designerId = this.$route.query.designerId
            this.getDesignerHall()
        }
        this.handleScroll()
    }
}
</script>

<style lang="less" scoped>
    .agent-father {
        width: 100%;
        height: 100%;
    }

    .popup-window {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        >img {
            margin-top: 32px;
        }

        .popup-main {
            border-radius: 16px;
            background: white;
            width: 280px;
            display: flex;
            flex-direction: column;
            > img {
                width: 280px;
                height: 88px;
            }
            .popup-phone {
                height:26px;
                font-size:20px;
                font-family:AlibabaPuHuiTiM;
                line-height:26px;
                color: @color-c1;
                margin-left: 20px;
                margin-top: 20px;
                font-weight: bold;
            }
            .popup-des {
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color: @color-c3;
                line-height:20px;
                margin: 12px 20px;
            }
            .select-city {
                height:44px;
                background:rgba(244,245,247,1);
                border-radius:25px;
                padding: 0 16px;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin: 0 20px;
                >img {
                    width: 20px;
                    height: 20px;
                }
                >span {
                    flex-grow: 1;
                    padding: 0 8px;
                }
            }
            .submit {
                height:44px;
                margin: 20px;
                color: white;
                line-height: 44px;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                background:linear-gradient(146deg,rgba(53,85,241,1) 0%,rgba(136,58,241,1) 100%);
                border-radius:22px;
            }
        }
    }

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

    .agent-container {
        position: relative;
        height: 100%;
        overflow: scroll;
        background-repeat: no-repeat;
        background-attachment: fixed;

        .agent-designer {
            width: 100%;
            margin-top: -94px;
        }

        .agent-main {
            background: white;
            width: 100%;
            position: absolute;
            left: 0;
            top: 142px;
            display: flex;
            flex-direction: column;

            .join-ip {
                height: 78px;
                margin: 8px 16px 12px 16px;
                background: white;
                box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.08);
                border-radius: 8px;
                position: relative;

                > img {
                    width: 106px;
                    height: 78px;
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                .ip-des {
                    font-size: 16px;
                    position: absolute;
                    top: 16px;
                    left: 116px;
                }

                .demand-btn {
                    position: absolute;
                    bottom: 16px;
                    font-size: 12px;
                    color: @color-c4;
                    left: 116px;
                }
            }

            .agent-process {
                font-size: 18px;
                margin-left: 16px;
                margin-top: 12px;
            }

            .agent-process-introduce {
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

            .join-agent {
                height: 50px;
                background: linear-gradient(146deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
                border-radius: 25px;
                color: white;
                font-weight: bold;
                font-size: 18px;
                line-height: 50px;
                text-align: center;
                margin: 16px;
            }
        }

    }
</style>
