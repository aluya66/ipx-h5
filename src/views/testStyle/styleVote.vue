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
        :isWxStatus="isWxStatus"
      ></share-list>
    </c-list>
    <button
      class="submit"
      @click="commit"
    >{{isCommit?'邀请好友投票':'提交投票'}}</button>
  </layout-view>
</template>

<script>
import wx from 'weixin-js-sdk'
import shareList from '@/views/common/shareList'
import components from 'components'
import { Dialog, Toast } from 'vant'
import utils from 'utils'
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
      isWxStatus: false,
      list: [],
      wxConig: {}, // 微信基本配置
      selectedNum: 0,
      isCommit: false
    }
  },
  async activated () {
    this.code = this.$route.query.code
    let isWx = this.$route.query.isWx
    this.participantCode = this.$route.query.participantCode
    this.bookActivityCode = this.$route.query.bookActivityCode
    if (this.code || isWx === 'wx') {
      this.isWxStatus = true
      let openid = utils.getSessionStore('openId') || ''
      if (!openid) {
        alert(JSON.stringify(124214))
        await this.getOauth()
      } else {
        this.openId = openid
      }
    }
    await this.getTestStyleList()
  },
  mounted () {
    setTimeout(() => {
      if (this.code) {
        this.getTicket()
      }
    }, 500)
    // if (this.code) {
    //   this.$nextTick(function () {
    //     this.getTicket()
    //   })
    // }
  },
  methods: {
    async getTestStyleList () {
      let params = {}
      if (this.code) {
        params = {
          participantCode: this.participantCode,
          weChatOpenId: this.openId
        }
      } else {
        params = {
          participantCode: this.participantCode
        }
      }

      this.$api.book
        .getSharemeasuresList(params)
        .then(res => {
          alert(JSON.stringify(res) + 'res')
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
      if (!this.isWxStatus) {
        this.$toast('仅支持分享后在微信中投票哦')
        return
      }
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
          weChatOpenId: this.openId
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
      let params = {
        code: this.code
      }
      // alert(JSON.stringify(params))
      await this.$api.oauth
        .getOauth(params)
        .then(res => {
          alert(JSON.stringify(res))
          if (res.code === 1) {
            let appid = 'wxc2d190b40fb12b9d'
            let redirectUri = 'http%3A%2F%2Fh5.yosar.com%2F'
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}%3FparticipantCode%3D${this.participantCode}%26bookActivityCode%3d${this.bookActivityCode}&response_type=code&scope=snsapi_userinfo&state=12`
          } else {
            this.openId = res.data
            utils.setSessionStore('openId', this.openId)
          }
          alert(JSON.stringify(res) + 'getOauth')
          // oQB0T1bPzZ6M33fHozD19bxAUA4s
        })
        .catch(err => {
          // alert(JSON.stringify(err))
          console.log(err)
        })
    },
    getTicket () {
      let params = {
        url: location.href
      }
      this.$api.oauth
        .getTicket(params)
        .then(res => {
          alert(12313)
          this.wxConig = res.data
          alert(JSON.stringify(this.wxConig) + 'this.wxConig')
          this.wxInit()
        })
        .catch(err => {
          // alert(JSON.stringify(err))
          console.log(err)
        })
    },
    wxInit () {
      let { appId, timestamp, nonceStr, signature } = this.wxConig
      // alert(JSON.stringify(this.wxConig))
      let url = 'http://h5.yosar.com'
      let isWx = 'wx'
      // let url = 'http://ipx-hybrid.yosar.test'
      let params = {
        title: '我想邀请你一起做时尚买手',
        link: `${url}/?isWx=${isWx}&bookActivityCode=${this.bookActivityCode}&participantCode=${this.participantCode}`,
        imgUrl: '../../themes/images/app/logo.png',
        desc: '这一季时尚选款，就听你的！为你偏爱的原创款式代言！'
      }

      // "appId":"wxc2d190b40fb12b9d","timestamp":"1574084855","nonceStr":"aea6292f-7df0-4f87-b4dc-3accc62042cc","signature":"06772ec88cb0cc54933d7b27ed358f19b696c21a
      // alert(JSON.stringify(params) + 'params')
      wx.config({
        debug: true,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
      })
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: '我想邀请你一起做时尚买手', // 分享标题
          link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            Toast.success('分享成功')
          },
          cancel: function () {
            Toast.fail('取消分享')
          }
        })
        wx.onMenuShareAppMessage({
          title: '我想邀请你一起做时尚买手', // 分享标题
          desc: '这一季时尚选款，就听你的！为你偏爱的原创款式代言！', // 分享描述
          link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标,
          success: function () {
            Toast.success('分享成功')
          },
          cancel: function () {
            Toast.fail('取消分享')
          }
        })
      })
      wx.error(function (res) {
        alert(JSON.stringify(res))
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
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
