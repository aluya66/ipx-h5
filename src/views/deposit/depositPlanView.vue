<template>
    <div class="plan-contain">
        <div class="plan-shadow">
            <section class="plan-header">
            方案一
            </section>
            <div class="plan-moneyContain">
                <p class="plan-money">{{data.depositAmount}}<span>元押金</span></p>
                <p style="padding:0 0.1rem">=</p>
                <p class="plan-money">{{data.consumeAmount}}<span>元消费额度</span></p>
            </div>
            <div class="plan-info">
                <p>·{{data.effectiveDays}}天押金有效期</p>
                <p>·{{data.refundTimes}}次免费全场换货</p>
                <p>·{{data.refundRate}}%退货退款</p>
            </div>
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
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.plan-shadow {
    box-shadow:0px 3px 20px 0px rgba(33,44,98,0.12);
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
}
.plan-contain {
    padding: 2px 0px 10px;
    background: #fff;
    .plan-header {
        text-align: center;
        height:46px;
        background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
        line-height: 46px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
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
            font-family:ALIBABAFont-Bold,ALIBABAFont;
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
            padding-left: 20px;
            width: 50%;
            height:32px;
            font-size:14px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(88,91,102,1);
            line-height:32px;
        }
    }
}
</style>
