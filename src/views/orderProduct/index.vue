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
        <check @onCheck="handleCheck" />
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
      <apply-popup :showPopup='showPopup' @onClose="()=>{ this.showPopup = false }" />
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
      inScroll: false,
      oldScrollTop: 0, // 记录上一次滚动结束后的滚动距离
      scrollTop: 0, // 记录当前的滚动距离
      showPopup: false,
      topImage: require('@/themes/images/app/main-name@2x.png'),
      products: [],
      listsObject: {},
      imageList: [{ title: '极简撞色翻边牛仔裤', image: require('@/themes/images/app/main-name@2x.png') },
        { title: '极简撞色翻边牛仔裤2', image: require('@/themes/images/app/main-name@2x.png') },
        { title: '极简撞色翻边牛仔裤3', image: require('@/themes/images/app/main-name@2x.png') },
        { title: '极简撞色翻边牛仔裤4', image: require('@/themes/images/app/main-name@2x.png') }]
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
    handleToOrder () {
      this.$router.push({ name: 'orderProduct' })
    },
    handleApply () {
      this.showPopup = !this.showPopup
    },
    handleCheck () {

    },
    handleScroll () {
      window.addEventListener('scroll', () => {
        this.scrollTop = document.querySelector('.content').scrollTop
      }, true)
    }
  },
  activated () {
    const params = {
      bannerCode: '1000A01',
      bookDataQueryType: '0',
      bookRankQueryType: '0',
      bookRankDispalyNum: '10'
    }
    this.$api.book.bookMainInfo(params).then((response) => {
      if (response.bookMeasureProds instanceof Array) {
        this.products = response.bookMeasureProds
      }
      if (response.bookProductRank instanceof Object) {
        this.listsObject = response.bookProductRank
      }
    }).catch(() => {

    })
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
