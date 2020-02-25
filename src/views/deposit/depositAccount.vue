<template>
    <layout-view class="hall-bg" :style="handleAdjustHeaderBg()">
        <c-header
            style="z-index:2"
            slot="header"
            class="hall-header"
            :isLight="false"
            :left-arrow="true"
            :pageOutStatus="true"
        >
            <template slot="left" tag="div">
                <img class="header-img" :src="backImage" />
            </template>
            <div slot="title" >押金账户</div>
        </c-header>
        <div class="contain-view">
            <p class="account-title">授信余额(元)</p>
            <p class="account-money">{{handlePriceFormat(userData.availableAmount)}}</p>
            <div class="account-desc">
                <section class="account-time">
                    <p>剩余有效期(天)</p>
                    <p>{{userData.effectiveDays}}</p>
                </section>
                <section class="account-time">
                    <p>押金额度(元)</p>
                    <p>{{handlePriceFormat(userData.consumeAmount)}}</p>
                </section>
            </div>
            <section class="account-connect">联系客服</section>
        </div>
    </layout-view>
</template>

<script>
import utils from 'utils'
export default {
    data() {
        return {
            backImage: require('@/themes/images/app/icon_nav_back_white@3x.png'),
            userData: {}
        }
    },
    methods: {
        handleCall() {
            utils.postMessage('customer_service')
        },
        handlePriceFormat(num) {
            let numStr = utils.priceFormat(num)
            return numStr
        },
        handleAdjustHeaderBg() {
            let w = window.screen.width
            let h = w * 477 / 375 / 100
            if (this.headerAlpha > 0) {
                h = 0
            }
            return `background-size:100% ${h}rem`
        },
        handleRequest() {
            this.$api.deposit.getUserDeposit().then(res => {
                this.userData = res
                debugger
            }).catch(() => {

            })
        }
    },
    activated() {
        this.handleRequest()
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
  background-image: url("../../themes/images/app/bg_cash_pledge@3x.png");
  background-repeat: no-repeat;
  background-size: 100% 212px;
}

.hall-header {
  background: rgba(0, 0, 0, 0);
}
.contain-view {
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(33,44,98,0.06);
    border-radius:20px;
    width: calc(100vw - 32px);
    margin: 16px 16px 0;
    padding-bottom: 36px;
    .account-title {
        display: block;
        // height:22px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(88,91,102,1);
        line-height:22px;
        padding: 48px 16px 0;
        text-align: center
    }
    .account-money {
        display: block;
        // height:67px;
        font-size:56px;
        font-family:"alibabaBold";
        font-weight:bold;
        color:@color-c1;
        line-height:67px;
        margin: 8px 16px 0;
        text-align: center
    }
    .account-desc {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 48px 0 0;
        .account-time {
            flex: 1;
            p {
                &:nth-child(1) {
                    // height:20px;
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(138,140,153,1);
                    line-height:20px;
                    text-align: center;
                    padding: 0 8px;
                }
                &:nth-child(2) {
                    // height:28px;
                    font-size:24px;
                    font-family:"alibabaBold";
                    font-weight:bold;
                    color:rgba(42,43,51,1);
                    line-height:28px;
                    text-align: center;
                    padding: 0 8px;
                    margin-top: 3px;
                }
            }
        }
    }
    .account-connect {
        height:50px;
        background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
        border-radius:25px;
        margin: 40px 20px 0;
        font-size:18px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:50px;
        text-align: center;
    }
}
</style>
