<template>
    <div class="plan-contain">
        <div class="plan-shadow">
            <div class="plan-header-con">
                <div class="plan-header">
                    <p class="plan-title">{{data.remark}}：付{{data.depositAmount}}押金</p>
                </div>
            </div>
            <div class="plan-conditions">
                <div class="condition">
                    <img src="../../themes/images/icon_consumption_quota@2x.png" />
                    <div class="data"><span class="number">{{data.consumeAmount}}</span><span class="unit">元</span></div>
                    <span>消费额度</span>
                </div>
                <div class="condition">
                    <img src="../../themes/images/icon_validity_period@2x.png" />
                    <div class="data"><span class="number">{{data.effectiveDays}}</span><span class="unit">天</span></div>
                    <span>押金有效期</span>
                </div>
                <div class="condition">
                    <img src="../../themes/images/icon_returns@2x.png" />
                    <div class="data"><span class="number">{{data.refundTimes}}</span><span class="unit">次</span></div>
                    <span>免费全场退货</span>
                </div>
                <div class="condition">
                    <img src="../../themes/images/icon_replacement_ratio@2x.png" />
                    <div class="data"><span class="number">{{data.refundRate}}</span><span class="unit">%</span></div>
                    <span>退换货比例</span>
                </div>
            </div>
            <!--<div class="plan-moneyContain">
                <p class="plan-money">{{data.depositAmount}}<span> 元押金</span></p>
                <p style="padding:0 0.1rem">=</p>
                <p class="plan-money">{{data.consumeAmount}}<span> 元消费额度</span></p>
            </div>
            <div class="plan-info">
                <p>{{data.effectiveDays}}天押金有效期</p>
                <p>{{data.refundTimes}}天退货周期</p>
                <p>{{data.refundRate}}%受理退货</p>
            </div>-->
            <div class="open-vip" @click.stop="goToBuy(data.depositConfigId)">
                开通享权益
            </div>
        </div>
        <!--<div class="out-side-left" v-show="showConnectIcon">
            <img :src="connetImg" alt="">
        </div>
        <div class="out-side-right" v-show="showConnectIcon">
            <img :src="connetImg" alt="">
        </div>-->
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default () {
                return {}
            }
        },
        title: {
            type: String,
            default: ''
        },
        showConnectIcon: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            connetImg: require('@/themes/images/app/icon_connect@3x.png')
        }
    },
    methods: {
        goToBuy(depositConfigId) {
            this.$router.push({
                path: '/deposit/purchasePlan',
                query: {
                    depositConfigId: depositConfigId
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.out-side-left {
    position: absolute;
    width: 10px;
    height: 44px;
    left: 48px;
    top: -26px;
    z-index: 999;
    img {
        width: 100%;
        height: 100%;
    }
}
.out-side-right {
    position: absolute;
    width: 10px;
    height: 44px;
    right: 48px;
    top: -26px;
    z-index: 999;
    img {
        width: 100%;
        height: 100%;
    }
}
.plan-shadow {
    text-align: center;
    box-shadow:0 3px 20px 0 rgba(33,44,98,0.12);
    background: url("../../themes/images/bg_deposit_plan.png") no-repeat;
    background-size: 100%;
    border-radius: 12px;
    margin-top: 8px;
    padding-bottom: 32px;
}
.plan-conditions {
    display: flex;
    flex-direction: row;
    margin-top: 28px;
    .condition {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        >img {
            width: 44px;
            height: 44px;
        }
        .data {
            color: @color-c1;
            .number {
                font-size: @f18;
                font-weight: bold;
                font-family: 'alibabaBold';
                line-height: 22px;
            }
            .unit {
                font-size: 10px;
                line-height: 16px;
            }
        }
        >span {
            color: @color-c3;
            font-size: 12px;
            margin-top: 4px;
        }
    }
}
.open-vip {
    color: white;
    margin: 28px 25px 0 25px;
    line-height: 50px;
    text-align: center;
    background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
    border-radius: 25px;
    font-size: 18px;
}
.plan-contain {
    padding-bottom: 24px;
    background: #fff;
    position: relative;
    .plan-header-con {
        display: flex;
        justify-content: center;
        .plan-header {
            width: 235px;
            height:40px;
            background: url("../../themes/images/bg_title_deposit@2x.png") no-repeat;
            background-size: 100%;
            text-align: center;
            margin-top: -8px;
            .plan-title {
                margin-top: -8px;
                display: inline;
                text-align: center;
                line-height: 46px;
                font-size:16px;
                font-weight:bold;
                color:rgba(68,70,66,1);
                position: relative;
                &::after {
                    content: '';
                    height:2px;
                    background:rgba(255,255,255,1);
                    border-radius:2px;
                    opacity:0.1;
                    position: absolute;
                    bottom: 1px;
                    left: 0;
                    width: 100%;
                }
            }
        }
    }
    .plan-moneyContain {
        margin: 24px 20px 0;
        background: @color-c8;
        display: flex;
        justify-content: center;
        align-items: center;
        height:60px;
        background:rgba(249,250,252,1);
        border-radius:8px;
        p {
            display: block;
            &:nth-child(2) {
                height:25px;
                font-size:18px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(42,43,51,1);
                line-height:25px;
            }
        }
        .plan-money {
            height:18px;
            font-size:24px;
            font-family:"alibabaBold";
            font-weight:bold;
            color:@color-c1;
            line-height:18px;
            span {
                height:17px;
                font-size:12px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:@color-c1;
                line-height:17px;
            }
        }
    }
    .plan-info {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-bottom: 26px;
        p {
            padding-left: 26px;
            width: 50%;
            height:32px;
            font-size:14px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(88,91,102,1);
            line-height:32px;
            position: relative;
            &::before {
                content: "";
                width:4px;
                height:4px;
                background:rgba(42,43,51,1);
                border-radius: 2px;
                position: absolute;
                display: block;
                top: 50%;
                left: 18px;
                transform: translateY(-50%);
            }
        }
    }
}
</style>
