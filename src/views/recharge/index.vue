<template>
  <layout-view class="header-bg" >
    <c-header class="my-header" slot="header" :left-arrow="true" :isLight="false">
      <div slot="title">我的余额</div>
      <template slot="left" tag="div">
        <img class="header-img" :src="backImage" />
      </template>
      <template slot="right" tag="div" class="right">
        <span style="font-size:0.14rem;font-weight:400;color: white;line-height:0.2rem;" @click="toExplain">说明</span>
      </template>
    </c-header>
    <div class="panel" >

      <div class="account">
        <div class="account-info">
          <p class="title">余额（元）</p>
          <p class="money">{{banlance.accAvailableMoney}}</p>
          <img src="@/themes/images/app/btn_to_use@3x.png" alt="" @click="toUse"/>
        </div>
      </div>
      <div class="content">
        <div class="option">
          <div
            class="option-content"
            v-for="(option) in optionInfo"
            :key="option.index"
            @click="optionClick(option.index)"
          >
            <img :src="option.img" alt="" />
            <p>{{ option.title }}</p>
          </div>
        </div>
        <div class="data-title">
          <p>IPX充值</p>
        </div>
        <div class="data-list">
          <div class="recharge-cash" v-for="item in rechargeConfig" :key="item.rechargeConfigId" @click="rechargeMoney(item)">
            <p class="cash">{{item.chargeAmount}}<span>元</span></p>
            <p class="desc" v-show="item.giveAmount !== '0'">赠送 {{item.giveAmount}}元</p>
            <div class="discont" v-show="item.giveAmount !== '0'">
              <span>限时优惠</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout-view>
</template>

<script>
import utils from 'utils'
export default {
    components: {},
    data() {
        return {
            backImage: require('@/themes/images/app/icon_nav_back_white@3x.png'),
            optionInfo: [
                {
                    img: require('@/themes/images/app/icon_payment_record@3x.png'),
                    title: '支付记录',
                    index: 3
                },
                {
                    img: require('@/themes/images/app/icon_recharge_record@3x.png'),
                    title: '充值记录',
                    index: 1
                }
            ],
            rechargeConfig: [],
            banlance: {}
        }
    },
    activated() {
        this.rechargeConfig = []
        this.banlance = {}
        this.rechargeInfo()
        this.getBalance()
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        toExplain() {
            this.$router.push({
                path: '/recharge/explain'
            })
        },
        optionClick(index) {
            this.$router.push({
                path: '/recharge/history',
                query: {
                    type: index
                }
            })
        },
        rechargeInfo() {
            this.$api.recharge.getRechargeInfo().then(res => {
                this.rechargeConfig = res
            }).catch(err => {
                console.log(err)
            })
        },
        getBalance() {
            this.$api.recharge.getBalance().then(res => {
                this.banlance = res
            }).catch(err => {
                console.log(err)
            })
        },
        rechargeMoney(config) {
            const params = {
                jumpUrl: 'rechargePayWay://',
                rechargeConfigId: config.rechargeConfigId,
                chargeAmount: config.chargeAmount, // 充值金额
                giveAmount: config.giveAmount // 赠送总额
            }
            utils.postMessage('', params)
        },
        toUse() {
            const params = {
                jumpUrl: 'toHome://'
            }
            utils.postMessage('', params)
        }
    }
}
</script>

<style lang="less" scoped>
.header-bg {
    background-image: url('../../themes/images/app/bg_pay_balance@3x.png');
    background-repeat: no-repeat;
    background-size: 100% 284px;
    .my-header {
      background: rgba(0, 0, 0, 0);
    }
}

.panel {
  position: relative;
  height: calc(100vh - 60px);
  overflow-y: scroll;
  // top: -64px;
  .account {
    // background-image: url("../../themes/images/app/bg_pay_balance@3x.png");
    // background-repeat: no-repeat;
    // background-size: 100% 284px;
    height: 284px;
    .account-info {
        padding: 112px 20px 0 20px;
      .title {
        font-size: 16px;
        font-weight: 400;
        color: white;
        line-height: 22px;
      }
      .money {
        font-size: 40px;
        font-family: "alibabaBold";
        font-weight: bold;
        color: white;
        line-height: 48px;
        margin-top: 8px;
      }
      > img {
        width: 70px;
        height: 32px;
        margin-top: 12px;
      }
    }
  }
  .content {
    position: absolute;
    transform: translateY(-22px);
    width: 100%;
    z-index: 1;
    padding: 20px;
    background: white;
    border-radius: 20px 20px 0px 0px;
    .option {
      display: flex;
      margin-top: 4px;
      .option-content {
        width: 50%;
        height: 72px;
        background: white;
        box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.08);
        border-radius: 8px;
        padding: 20px 16px;
        margin-right: 15px;
        display: flex;
        &:last-child {
          margin-right: 0;
        }
        > img {
          width: 32px;
          height: 32px;
        }
        > p {
          font-size: 16px;
          font-weight: 500;
          color: rgba(42, 43, 51, 1);
          line-height: 22px;
          align-self: center;
          margin-left: 12px;
        }
      }
    }
    .data-title {
      > p {
        font-size: 20px;
        font-weight: 600;
        color: rgba(42, 43, 51, 1);
        line-height: 28px;
        margin-top: 32px;
      }
    }
    .data-list {
      margin-top: 16px;
      .recharge-cash {
        background: @color-c8;
        border-radius: 8px;
        padding: 16px 0 16px 20px;
        margin-bottom: 19px;
        .cash {
          font-size: 22px;
          font-family: "alibabaBold";
          font-weight: bold;
          color: @color-c1;
          line-height: 26px;
          > span {
            font-size: 14px;
            font-weight: 600;
            color: @color-c1;
            line-height: 20px;
          }
        }
        .desc {
          font-size: 12px;
          font-weight: 400;
          color: rgba(245, 48, 48, 1);
          line-height: 16px;
          margin-top: 4px;
        }
        .discont {
          width: 56px;
          height: 16px;
          background: linear-gradient(
            141deg,
            rgba(255, 105, 105, 1) 0%,
            rgba(247, 72, 110, 1) 100%
          );
          border-radius: 0px 8px 0px 8px;
          float: right;
          text-align: center;
          transform: translateY(-62px);
          > span {
            font-size: 10px;
            font-weight: 500;
            color: white;
            line-height: 12px;
          }
        }
      }
    }
  }
}
</style>
