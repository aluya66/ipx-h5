<template>
  <layout-view>
    <c-header
      slot="header"
      :left-arrow="true"
    ></c-header>
    <c-list class="list-scroll">
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
      bannerCode: '', //banner图片code
      list: [],
      selectedNum: 0,
      isCommit: false
    }
  },
  created () {
    this.code = this.$route.query.code
    this.bannerCode = this.$route.query.bannerCode
    if (this.code) {
      this.getOauth()
    }
    this.getTestStyleList()
  },
  methods: {
    getTestStyleList () {
      const params = {
        bannerCode: this.bannerCode,
        bookDataQueryType: 0,
        bookRankDispalyNum: 9
      }

      //http://ipx-hybrid.yosar.develop/api-ipx/v1/bookactivity/list?bannerCode=BN6971899666906500&bookDataQueryType=1&bookRankDispalyNum=9
      //http://ipx-hybrid.yosar.develop/api-ipx/v1/bookactivity/list?bannerCode=BN6971899666906500&bookDataQueryType=0&bookRankQueryType=0&bookRankDispalyNum=10
      this.$api.book
        .bookMainInfo(params)
        .then(res => {
          console.log(res)
          let data = res.bookMeasureProds
          data.forEach((item, index) => {
            item.isSelect = false
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
          bookActivityCode: '1000A01',
          voteProductCodes: arr,
          participantCode: this.openid
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
    getOauth () {
      // alert(123213)
      let params = {
        code: this.code
      }
      // alert(JSON.stringify(params))
      this.$api.oauth
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
    }
    // https://openapi.yosar.com/oauth
  }
}
</script>

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
