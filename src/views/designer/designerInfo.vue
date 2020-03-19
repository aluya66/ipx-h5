<template>
    <div class="designer-container">
        <div class="designer-top">
            <img class="photo" :src="designer.avatar"/>
            <span class="name">{{designer.nickname}}</span>
            <span class="label">IPX原创设计师</span>
            <img class="chat linear-background" src="../../themes/images/designer/icon_28_28_infor_def@2x.png" @click="handleCall">
            <div :class="[designer.isFocus === 0 ? 'linear-background attention': 'has-attention']" @click="handleFollow">
                <img v-if="designer.isFocus === 0" src="../../themes/images/designer/icon_plus_20_20@2x.png"/>
                {{designer.isFocus === 0 ? '关注' : '已关注'}}
            </div>
        </div>
        <div class="designer-bottom">
            <div class="designer-data-item">
                <div class="data">
                    {{designer.sampleClothesNum}}
                </div>
                <div class="describe">
                    全部样衣
                </div>
            </div>
            <div class="designer-data-item">
                <div class="data">
                    {{designer.followSum}}
                </div>
                <div class="describe">
                    全部样衣
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '../../utils'
export default {
    props: {
        designer: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        handleCall() {
            utils.postMessage('customer_service')
        },
        handleFollow() {
            debugger
            let params = {
                designerId: this.designer.designerId,
                designsHallId: this.designer.id,
                isFocus: 0
            }
            if (this.designer.isFocus === 0) { // 0未关注   1关注
                params.isFocus = 1
                this.$api.designer.addFollow(params).then(res => {
                    this.designer.isFocus = params.isFocus
                })
            } else {
                params.isFocus = 0
                this.$api.designer.cancelFollow(params).then(res => {
                    this.designer.isFocus = params.isFocus
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .designer-container {
        height: 156px;
        margin: 16px;
        background: white;
        box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.08);
        border-radius: 8px;
        display: flex;
        flex-direction: column;

        .designer-top {
            position: relative;
            height: 78px;

            .photo {
                position: absolute;
                top: 20px;
                left: 12px;
                width: 48px;
                height: 48px;
                border-radius: 24px;
            }

            .name {
                font-size: 20px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(42, 43, 51, 1);
                position: absolute;
                top: 20px;
                left: 68px;
                line-height: 28px;
            }

            .label {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                position: absolute;
                top: 52px;
                left: 68px;
                color: rgba(138, 140, 153, 1);
                line-height: 16px;
            }

            .linear-background {
                background: linear-gradient(146deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
            }

            .chat {
                width: 28px;
                height: 28px;
                border-radius: 4px;
                position: absolute;
                top: 30px;
                right: 92px;
            }

            .attention {
                width: 68px;
                height: 28px;
                border-radius: 4px;
                position: absolute;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 30px;
                right: 12px;
                font-size: 12px;

                > img {
                    margin-right: 4px;
                    width: 20px;
                    height: 20px;
                }
            }
            .has-attention {
                width: 68px;
                height: 28px;
                border-radius: 4px;
                position: absolute;
                color: @color-c3;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                top: 30px;
                right: 12px;
                background: white;
                border: 1px solid @color-c4;
            }
        }

        .designer-bottom {
            display: flex;
            flex-direction: row;
            height: 78px;

            .designer-data-item {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .data {
                    font-size: 18px;
                    font-family: AlibabaPuHuiTiM;
                    color: rgba(42, 43, 51, 1);
                    font-weight: bold;
                    line-height: 26px;
                }

                .describe {
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(178, 181, 193, 1);
                    line-height: 16px;
                }
            }
        }

    }
</style>
