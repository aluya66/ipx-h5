<template>
  <layout-view>
    <!-- <router-view></router-view> -->
    <div class="op-contain">
      <c-header :pageOutStatus="false" slot="header">
        <template v-slot:title>
          <span>订购会</span>
        </template>
      </c-header>
      <div class="content">
        <img class="op-topImage" :src="topImage" alt="">
        <section-header title="本期主推款预告" subTitle="更多爆款货品，敬请亲临订货会" />
        <swiper :imageData="products" />
        <check @onCheck="handleCheck" @onResult='handleCheckResult' @onDetail='handleTestDetail' @onShare='handleShareTest' :products='testProducts'/>
        <section-header class="newHeader" title="上周订货会快报" subTitle="订货会热销行情，最新市场风向标" />
        <list :allList="listsObject"/>
        <store-address />
        <div :class="['bottomBtn','applyBtn',inScroll?'applyScroll':'applyScrollStop']" @click="handleApply">
          <img src="@/themes/images/app/icon-me-apply-gray@2x.png" alt="">
          <p v-if="!inScroll">报名参会</p>
        </div>
        <div :class="['bottomBtn','testBtn',inScroll?'applyScroll':'applyScrollStop']" @click="handleCheck">
          <img src="@/themes/images/app/icon-me-survey-gray@2x.png" alt="">
          <p v-if="!inScroll">免费测款</p>
        </div>
      </div>
      <apply-popup :showPopup='showPopup' :manageTypes='managerTypes' @submit="handleApplySubmit"  @onClose="()=>{ showPopup = false }" />
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

const { CHeader } = components
export default {
  components: {
    CHeader,
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
      bannerCode: '1000A01',
      inScroll: false,
      oldScrollTop: 0, // 记录上一次滚动结束后的滚动距离
      scrollTop: 0, // 记录当前的滚动距离
      showPopup: false,
      topImage: require('@/themes/images/app/main-name@2x.png'),
      products: [],
      testProducts: [],
      managerTypes: [],
      listsObject: {}
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
      this.$router.push({ path: '/testStyle/report' })
    },
    // 查看测款页
    handleTestDetail () {
      this.$router.push({ path: '/testStyle/share', query: { bannerCode: this.bannerCode } })
    },
    // 分享测款
    handleShareTest () {
      this.$router.push({ path: '/testStyle/share', query: { bannerCode: this.bannerCode } })
    },
    // 免费测款
    handleCheck () {
      this.$router.push({ path: '/testStyle/share', query: { bannerCode: this.bannerCode } })
    },
    // 报名参加
    handleApplySubmit (info) {
      const params = {
        participantCity: info.userCity,
        participantName: info.userName,
        participantPhone: info.userPhone,
        tradeCode: info.manageCode
      }
      this.handleRequestApply(params)
    },
    // 点击报名弹框
    handleApply () {
      this.showPopup = !this.showPopup
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
        bookRankQueryType: '0',
        bookRankDispalyNum: '10'
      }
      this.$api.book.bookMainInfo(params).then((response) => {
        if (response.bookMeasureProds instanceof Array) {
          this.products = response.bookMeasureProds
        }
        if (response.lastPeriodRank instanceof Object) {
          this.listsObject = response.lastPeriodRank
        }
        if (response.selfMeasureData.selfMeasureProds instanceof Array) {
          this.testProducts = response.selfMeasureData.selfMeasureProds
        }
      }).catch(() => {

      })
    },
    // 提交报名
    handleRequestApply (params) {
      this.$api.book.bookApply(params).then((response) => {
        this.$toast.success('报名成功')
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
    this.handleRequestMain()
    this.handleRequestUserManagers()
  },
  mounted () {
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
    height: calc(100vh - 40px);
    overflow: auto;
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
  }
}

</style>
