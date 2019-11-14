<template>
  <layout-view>
    <c-header
      slot="header"
      :left-arrow="true"
    ></c-header>
    <c-list class="list-scroll test-style-list">
      <share-list
        :productList="list"
        :disableClick="isCommit"
        @selectClick="selected"
      ></share-list>
    </c-list>
    <button
      class="submit"
      @click="commit"
    >{{isCommit?'分享好友':'提交投票'}}</button>
  </layout-view>
</template>

<script>
import wx from 'weixin-js-sdk'

import shareList from '@/views/common/shareList'
import components from 'components'
import { Dialog, Toast } from 'vant'
const { CHeader } = components
export default {
  components: {
    CHeader,
    shareList
  },
  data () {
    return {
      code: '', // 微信授权code
      openId: '', // 微信openId
      participantCode: '', // banner图片code
      bookActivityCode: '',
      list: [],
      wxConig: {}, // 微信基本配置
      selectedNum: 0,
      isCommit: false
    }
  },
  async created () {
    this.code = this.$route.query.code
    this.participantCode = this.$route.query.participantCode
    this.bookActivityCode = this.$route.query.bookActivityCode
    if (this.code) {
      await this.getOauth()
    }
    await this.getTestStyleList()
  },
  mounted () {
    if (this.code) {
      this.$nextTick(function () {
        this.getTicket()
      })
    }
  },
  methods: {
    async getTestStyleList () {
      let params = {}
      if (this.code) {
        params = {
          participantCode: this.participantCode,
          weChatOpenId: this.openId || 'oQB0T1bPzZ6M33fHozD19bxAUA4s'
        }
      } else {
        params = {
          participantCode: this.participantCode
        }
      }

      this.$api.book
        .getSharemeasuresList(params)
        .then(res => {
          let data = res
          data.forEach((item, index) => {
            if (item.hasVotedFlag === 1) {
              this.isCommit = true
              item.isSelect = true
            } else {
              item.isSelect = false
            }
          })
          this.list = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    selected (product) {
      if (!product.isSelect && this.selectedNum > 2) {
        Dialog.alert({
          title: '提示',
          message: '每人限投3票'
        })
        return
      }
      product.isSelect = !product.isSelect
      if (product.isSelect) {
        this.selectedNum += 1
      } else {
        this.selectedNum -= 1
      }
    },
    commit () {
      if (this.isCommit) {
        /// 分享
        Toast('点击右上角分享给好友')
        return
      }
      if (this.selectedNum === 0) {
        Dialog.alert({
          title: '提示',
          message: '请选择投票商品'
        })
      } else {
        const arr = []
        this.list.map(item => {
          if (item.isSelect === true) {
            arr.push(item.productCode)
          }
        })
        const params = {
          bookActivityCode: this.bookActivityCode,
          voteProductCodes: arr,
          participantCode: this.participantCode,
          weChatOpenId: this.openId || 'oQB0T1bPzZ6M33fHozD19bxAUA4s'
        }
        this.$api.book
          .bookGoodsVote(params)
          .then(res => {
            if (res.code === 0) {
              Toast.success('投票成功')
              this.isCommit = true
            } else {

            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    async getOauth () {
      // alert(123213)
      let params = {
        code: this.code
      }
      // alert(JSON.stringify(params))
      await this.$api.oauth
        .getOauth(params)
        .then(res => {
          this.openId = res.data
          // alert(JSON.stringify(res))
          // oQB0T1bPzZ6M33fHozD19bxAUA4s
        })
        .catch(err => {
          // alert(JSON.stringify(err))
          console.log(err)
        })
    },
    async getTicket () {
      // alert(JSON.stringify(params))
      await this.$api.oauth
        .getTicket('')
        .then(res => {
          this.wxConig = res.data
          this.wxInit()
        })
        .catch(err => {
          // alert(JSON.stringify(err))
          console.log(err)
        })
    },
    wxInit () {
      let { appId, timestamp, nonceStr, signature } = this.wxConig
      let params = {
        title: '我想邀请你一起做时尚买手',
        url: `/oauth?bannerCode=${this.bannerCode}`,
        shareImage: '../../themes/images/app/logo.png',
        description: '这一季时尚选款，就听你的！为你偏爱的原创款式代言！'
      }
      wx.config({
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
      })
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: params.title, // 分享标题
          desc: params.description,
          link: params.url, // 分享链接
          imgUrl: params.shareImage, // 分享图标
          success: function () {
            Toast.success('分享成功')
          },
          cancel: function () {
            Toast.fail('取消分享')
          }
        })
        wx.onMenuShareAppMessage({
          title: params.title, // 分享标题
          desc: params.description,
          link: params.url, // 分享链接
          imgUrl: params.shareImage, // 分享图标
          success: function () {
            Toast.success('分享成功')
          },
          cancel: function () {
            Toast.fail('取消分享')
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.test-style-list{
  .van-list__loading{
    .van-loading__text{
      display: none
    }
  }
}
</style>
<style lang="less" scoped>
.list-scroll {
  height: calc(100vh - 55px);
}
.submit {
  width: 160px;
  height: 50px;
  border-radius: 36px;
  box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
  background-image: linear-gradient(to bottom, #557af4, #724fff);
  font-family: PingFangSC;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
