<template>
    <div class="plan-contain">
        <div class="plan-shadow">
            <section class="plan-header">
                <p class="plan-title">{{data.remark}}</p>
            </section>
            <div class="plan-moneyContain">
                <p class="plan-money">{{data.depositAmount}}<span> 元押金</span></p>
                <p style="padding:0 0.1rem">=</p>
                <p class="plan-money">{{data.consumeAmount}}<span> 元消费额度</span></p>
            </div>
            <div class="plan-info">
                <p>{{data.effectiveDays}}天押金有效期</p>
                <p>{{data.refundTimes}}次免费全场换货</p>
                <p>{{data.refundRate}}%退货退款</p>
            </div>
        </div>
        <div class="out-side-left" v-show="showConnectIcon">
            <img :src="connetImg" alt="">
        </div>
        <div class="out-side-right" v-show="showConnectIcon">
            <img :src="connetImg" alt="">
        </div>
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
    box-shadow:0px 3px 20px 0px rgba(33,44,98,0.12);
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
}
.plan-contain {
    padding: 2px 0px 10px;
    background: #fff;
    position: relative;
    .plan-header {
        height:46px;
        background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
        text-align: center;
        .plan-title {
            display: inline;
            margin: 0 auto;
            text-align: center;
            line-height: 46px;
            font-size:16px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
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
