<template>
  <layout-view>
    <!-- <router-view></router-view> -->
    <div class="op-contain">
      <c-header :pageOutStatus="true" slot="header">
        <template v-slot:title>
          <span>订货会</span>
        </template>
      </c-header>
      <div class="content" :class="footerHeight ? 'contents' : ''">
        <img class="op-topImage" :src="topImage" alt="">
        <section-header title="本期主推款预告" subTitle="更多爆款货品，敬请亲临订货会" v-if="products && products.length > 0"/>
        <swiper :imageData="products" v-if="products && products.length > 0"/>
        <check @onCheck="handleCheck" @onResult='handleCheckResult' @onDetail='handleTestDetail' @onShare='handleShareTest' :products='testProducts' v-if="products && products.length > 0"/>
        <section-header class="newHeader" title="上期订货会快报" subTitle="订货会热销行情，最新市场风向标" v-if="lastPeriodRankStatus" />
        <list :allList="listsObject" v-if="lastPeriodRankStatus"/>
        <store-address />
        <div :class="['bottomBtn','applyBtn',inScroll?'applyScroll':'applyScrollStop']" @click="handleApply" v-if="delayedStatus">
          <img src="@/themes/images/app/icon-me-apply-gray@3x.png" alt="">
          <p v-if="!inScroll">报名参会</p>
        </div>
        <div :class="['bottomBtn','testBtn',inScroll?'applyScroll':'applyScrollStop']" @click="handleCheck" v-if="testProductsStatus && products && products.length > 0">
          <img src="@/themes/images/app/icon-me-survey-gray@3x.png" alt="">
          <p v-if="!inScroll">免费测款</p>
        </div>
        <div :class="['bottomBtn','testBtn',inScroll?'applyScroll':'applyScrollStop']" @click="handleCheckResult" v-if="!testProductsStatus && haveSharedStatus === 1">
          <img src="@/themes/images/app/icon-me-survey-gray@3x.png" alt="">
          <p v-if="!inScroll">测款报告</p>
        </div>
        <c-footer></c-footer>
      </div>
      <apply-popup :showPopup='showPopup' :bookActivityCode="bookActivityCode" :manageTypes='managerTypes' :phoneNumber="baseParams.phoneNumber" @submit="handleApplySubmit"  @onClose="()=>{ showPopup = false }" />
    </div>
  </layout-view>
</template>

<script>

import components from 'components'
import SectionHeader from './components/orderSectionHeader.vue'
import Swiper from './components/orderProductSwiper.vue'
import Check from './components/orderProdctCheck.vue'
import List from './components/orderRankingList.vue'
import StoreAddress from './components/orderProductAddress.vue'
import ApplyPopup from './components/applyPopup.vue'
import CFooter from '../common/cfooter'
import utils from 'utils'

const { CHeader } = components
export default {
    components: {
        CHeader,
        CFooter,
        SectionHeader,
        Swiper,
        Check,
        List,
        StoreAddress,
        ApplyPopup
    },
    props: {

    },
    data () {
        return {
            token: '',
            baseParams: '', // 基础配置
            footerHeight: 0,
            bannerCode: '',
            participantCode: '', // 参会编号
            inScroll: false,
            oldScrollTop: 0, // 记录上一次滚动结束后的滚动距离
            scrollTop: 0, // 记录当前的滚动距离
            enableToTakePart: '1', // 订货会，是否能够参加，本期订货会（0：不能，已经参加过本期，1：可以，没有参加过本期）
            haveSharedStatus: 0,
            showPopup: false,
            testProductsStatus: true,
            delayedStatus: false,
            lastPeriodRankStatus: false,
            topImage: require('@/themes/images/app/main-name@3x.png'),
            products: [], // 测款商品数据
            testProducts: [], // 一键测款后的数据列表
            managerTypes: [],
            listsObject: {},
            bookActivityCode: '' // 订货会数据编码
        }
    },
    watch: {
        scrollTop (newValue, oldValue) {
            setTimeout(() => {
                if (newValue === document.querySelector('.content').scrollTop) { // 延时执行后当newValue等于window.scrollY，代表滚动结束
                    this.oldScrollTop = newValue // 每次滚动结束后都要给oldScrollTop赋值
                    this.inScroll = false
                };
            }, 300) // 必须使用延时器，否则每次newValue和window.scrollY都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
            if (this.oldScrollTop === oldValue) { // 每次滚动开始时oldScrollTop与oldValue相等
                this.inScroll = true
            }
        }
    },
    methods: {
    // 查看测款报告
        handleCheckResult () {
            this.$router.push({ path: '/testStyle/report', query: { participantCode: this.participantCode, bookActivityCode: this.bookActivityCode } })
        },
        // 查看测款页
        handleTestDetail () {
            this.$router.push({ path: '/', query: { bookActivityCode: this.bookActivityCode, participantCode: this.participantCode } })
        },
        // 分享测款
        handleShareTest () {
            this.$router.push({ path: '/testStyle/share', query: { bookActivityCode: this.bookActivityCode, participantCode: this.participantCode } })
        },
        // 免费测款
        handleCheck () {
            // 上报按钮事件
            window.sa.track('IPX_WEB', {
                page: 'orderProduct',
                type: 'click',
                event: 'freeCheckStyle'
            })
            this.token = utils.getStore('token') || ''
            if (this.token) {
                this.$router.push({ path: '/testStyle/share', query: { bookActivityCode: this.bookActivityCode, participantCode: this.participantCode } })
            } else {
                let method = 'user_authentication'
                utils.postMessage(method, '')
            }
        },
        // 报名参加
        handleApplySubmit (info) {
            const params = {
                participantCity: info.userCity,
                participantName: info.userName,
                participantPhone: info.userPhone,
                tradeCode: info.manageCode,
                bookActivityCode: this.bookActivityCode
            }

            console.log(params, 'params')
            this.handleRequestApply(params)
        },
        // 点击报名弹框
        handleApply () {
            // 上报按钮事件
            window.sa.track('IPX_WEB', {
                page: 'orderProduct',
                type: 'click',
                event: 'enrollInMeeting'
            })
            if (this.token) {
                if (this.enableToTakePart === 0) {
                    this.$toast('已提交过报名信息，请勿重复提交')
                } else {
                    this.showPopup = !this.showPopup
                }
            } else {
                let method = 'user_authentication'
                utils.postMessage(method, '')
            }
        },
        // 监听滚动
        handleScroll () {
            window.addEventListener('scroll', () => {
                this.scrollTop = document.querySelector('.content').scrollTop
            }, true)
        },
        // 请求订购会主页
        handleRequestMain () {
            this.bannerCode = this.$route.query.bannerCode
            const params = {
                bannerCode: this.bannerCode,
                bookDataQueryType: '0',
                bookRankQueryType: '0'
            }
            this.$api.book.bookMainInfo(params).then((response) => {
                this.participantCode = response.participantCode
                this.enableToTakePart = response.enableToTakePart
                this.bookActivityCode = response.bookActivityCode
                this.haveSharedStatus = response.haveSharedStatus
                // console.log(this.bookActivityCode, 'this.bookActivityCode')
                // console.log(response.bookMeasureProds)
                if (response.bookMeasureProds instanceof Array) {
                    this.products = response.bookMeasureProds
                    console.log(this.products)
                    // this.products = JSON.parse(JSON.stringify(response.bookMeasureProds))
                }
                if (response.lastPeriodRank instanceof Object) {
                    this.listsObject = response.lastPeriodRank

                    if (this.listsObject.singleMeasureRankList.length > 0 || this.listsObject.categorySalesRankList.length > 0 || this.listsObject.singleSalesRankList.length > 0) {
                        this.lastPeriodRankStatus = true
                    }
                }
                if (response.mySharedProds instanceof Array) {
                    this.testProducts = response.mySharedProds
                    if (this.testProducts && this.testProducts.length > 0) {
                        this.testProductsStatus = false
                    }
                }

                this.delayedStatus = true
            }).catch(() => {

            })
        },
        // 提交报名
        handleRequestApply (params) {
            // 13632540770
            this.$api.book.bookApply(params).then((response) => {
                this.$toast.success('报名成功')
                this.handleRequestMain()
                this.showPopup = false
            }).catch(() => {

            })
        },
        // 请求经营类型
        handleRequestUserManagers () {
            this.$api.book.bookApplyManagers().then((response) => {
                if (response instanceof Array) {
                    this.managerTypes = response
                }
            }).catch(() => {

            })
        }
    },
    activated () {
        this.baseParams = utils.getStore('baseParams') || {}
        this.token = utils.getStore('token') || ''
        if (this.baseParams.platform === 'ios') {
            if (Number(this.baseParams.statusBarHeight) >= 40) {
                this.footerHeight = (Number(37) / 100) + 'rem'
            }
        }
        this.handleRequestMain()
        this.handleRequestUserManagers()
    },
    mounted () {
        // 上报页面事件
        window.sa.track('pageView', {
            // String 类型
            pagename: 'orderProduct'
        })
        this.handleScroll()
    },
    destroyed () {
        window.removeEventListener('scroll') // 离开当前组件别忘记移除事件监听哦
    }
}
</script>

<style lang="less">

.op-contain {
  background: @color-c8;
  // height: 100%;
  .content {
    height: calc(100vh - 50px);
    overflow: auto;
    &.contents  {
      height: calc(100vh - 94px);
    }
    .bottomBtn {
      position: fixed;
      width: 106px;
      height: 40px;
      border-radius: 20px;
      box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
      background-color: #ffffff;
      right: 16px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      z-index: 11;
      >img {
        width: 24px;
        height: 24px;
        object-fit: cover;
      }
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-left: 2px;
      }
    }
    .applyBtn {
      bottom: 46px;
      transition: width 0.3s;
    }
    .applyScroll {
      width: 40px;
    }
    .applyScrollStop {
      width: 106px
    }
    .testBtn {
      bottom: 102px;
      transition: width 0.3s;
    }
  }

  .op-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .newHeader {
    margin-top:64px;
    background: #fff;
  }
  .op-topImage {
    display: block;
    width: 100%;
    object-fit: cover;
    background-color: #fff;
  }
}

</style>
