<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative" :showBorderBottom='true'>
            <div slot="title">请选择购买方案</div>
        </c-header>
        <div class="plan-list" :style="getBottomOffset(84)">
            <div :class="['item-shape', selectIndex===key?'item-shape-select':'']" v-for="(item, key) in plans"
                 :key="key" v-on:click="selectIndex=key">
                <div :class="['item-title', selectIndex===key?'item-title-select':'']">
                    <span class="text-size-18">{{item.remark}}：</span><span class="text-size-16">付</span><span
                    class="text-size-24">{{item.depositAmount}}</span><span
                    class="text-size-16">元押金</span>
                </div>
                <div :class="['item-content', selectIndex===key?'item-content-select':'']">
                    <p>{{item.consumeAmount}}元消费额度</p>
                    <p>{{item.effectiveDays}}天押金有效期</p>
                    <p>{{item.refundTimes}}天退货周期</p>
                    <p>{{item.refundRate}}%受理退货</p>
                </div>
            </div>
        </div>
        <!--<fixed-view class="plan-footer">
            <template slot="footerContain">
                <button class="pay-button" :disabled="!userData || userData.status < 4" v-on:click="goPay()">去支付</button>
            </template>
        </fixed-view>-->
        <div class="plan-footer">
            <button class="pay-button" :disabled="!userData || userData.status < 4" v-on:click="goPay()">去支付</button>
        </div>
    </layout-view>
</template>

<script>
import utils from 'utils'
// import FixedView from '../common/bottomFixedView.vue'

export default {
    // components: {
    //     FixedView
    // },
    data() {
        return {
            isNative: false,
            plans: [],
            selectIndex: 0,
            userData: {}
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleRequest() {
            this.$api.deposit.getDepositConfig().then(res => {
                if (res instanceof Array) {
                    this.plans = res
                }
            }).catch(() => {

            })
        },
        getAccountInfo() {
            this.$api.deposit.getUserDeposit().then(res => {
                if (res instanceof Object) {
                    this.userData = res
                }
            }).catch(() => {

            })
        },
        goPay() {
            const item = this.plans[this.selectIndex]
            const params = {
                jumpUrl: 'depositPayWay://',
                depositConfigId: item.depositConfigId === undefined ? '' : item.depositConfigId + '', // 押金配置id
                depositAmount: item.depositAmount + '', // 押金总额
                consumeAmount: item.consumeAmount + '' // 消费额度
            }
            utils.postMessage('', params)
        }
    },
    activated() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        this.handleRequest()
        this.getAccountInfo()
    }
}
</script>

<style lang="less" scoped>
    .plan-header {
        background: white;
    }

    .plan-list {
        padding: 20px;
        overflow: scroll;
        height: 100%;
    }

    .item-shape {
        border-radius: 8px;
        box-shadow: 0px 3px 20px 0px rgba(33, 44, 98, 0.12);
        background: white;
        overflow: hidden;
        margin-bottom: 20px;
    }

    .text-size-24 {
        font-size: 24px;
        font-family: 'alibabaBold';
    }

    .text-size-18 {
        font-size: 18px;
    }

    .text-size-16 {
        font-size: 16px;
    }

    .item-title {
        height: 66px;
        color: @color-c1;
        line-height: 66px;
        padding-left: 20px;
        display: flex;
        font-size: 18px;
        justify-content: flex-start;
        align-items: center;
        font-weight: bold;
    }

    .item-content {
        border-radius: 0px 0px 8px 8px;
        background: rgba(249, 250, 252, 1);
        display: flex;
        padding: 20px;
        flex-wrap: wrap;

        p {
            width: 50%;
            height: 32px;
            font-size: 14px;
            font-weight: 500;
            color: @color-c2;
            line-height: 32px;
            position: relative;
            padding-left: 8px;
            font-family:PingFangSC-Medium,PingFang SC;
            &::before {
                content: "";
                width:4px;
                height:4px;
                background:rgba(42,43,51,1);
                border-radius: 2px;
                position: absolute;
                display: block;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
            }
        }
    }

    .item-content-select {
        background: rgba(235, 238, 255, 1);
    }

    .item-shape-select {
        border: 1px solid rgba(60, 92, 246, 1);
        margin: -1px -1px 19px -1px;
    }

    .item-title-select {
        color: @color-ec;
    }

    .pay-button {
        height: 50px;
        line-height: 50px;
        width: calc(100vw - 32px);
        font-weight: bold;
        background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
        border-radius: 25px;
        font-size: 18px;
        margin: 0px 16px 34px 16px;
        color: white;
    }
    .pay-button[disabled] {
        background: @color-c5;
    }

    .plan-footer {
        color: #2A2B33;
        position: fixed;
        background: white;
        bottom: 0;
        width: 100%;
    }
</style>
