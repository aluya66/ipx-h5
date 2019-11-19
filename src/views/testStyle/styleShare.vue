<template>
  <layout-view>
    <c-header slot="header" :left-arrow="true"></c-header>

    <div class="panel">
      <div class="top-title">
        <p>已为您生成以下测款页面，测款商品为本次订货会的{{totalNum}}款主打商品：</p>
      </div>
      <c-list class="list-scroll">
        <div class="scale-content" ref="shareList">
          <share-list class="share-list" :productList="list"></share-list>
        </div>
      </c-list>
      <div class="bottom-dialog">
        <h4>分享给您的顾客，开始收集测款数据吧～</h4>
        <p>(测款数据在订货会页面查看)</p>
        <div class="share-logo">
          <div class="left" @click="shareWechat(1)">
            <img src="../../themes/images/app/share-wechat@2x.png" />
            <p>微信群</p>
          </div>
          <div class="left" @click="shareWechat(2)">
            <img src="../../themes/images/app/share-wefriends@2x.png" />
            <p>朋友圈</p>
          </div>
        </div>
      </div>
    </div>
  </layout-view>
</template>

<script>
import shareList from '@/views/common/shareList'
import utils from 'utils'
export default {
  components: {
    shareList
  },
  data () {
    return {
      bannerCode: '',
      participantCode: '',
      bookActivityCode: '',
      totalNum: '',
      list: [
        {
          mainPic: '',
          productAtrNumber: '124124',
          productCode: '235235hu'
        }
      ]
    }
  },
  activated () {
    this.participantCode = this.$route.query.participantCode
    this.bookActivityCode = this.$route.query.bookActivityCode
    this.getSharemeasuresList()
  },
  mounted () {
    // setTimeout(() => {
    //   console.log(document.querySelector(".van-pull-refresh"));

    //   console.log(this.$refs.shareList.offsetHeight);
    //   document.querySelector(".van-pull-refresh").style.height =
    //     this.$refs.shareList.offsetHeight + "px";
    // }, 1000);
  },
  methods: {
    getSharemeasuresList () {
      const params = {
        participantCode: this.participantCode
      }
      this.$api.book
        .getSharemeasuresList(params)
        .then(res => {
          this.list = res
          if (this.list.length > 9) {
            this.list = this.list.splice(0, 9)
            this.totalNum = this.list.length || 0
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async bookShared () {
      let params = {
        participantCode: this.participantCode
      }
      await this.$api.book
        .bookShared(params)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async shareWechat (type) {
      let url = 'http://ipx-hybrid.yosar.test'
      // type 1=好友 2=朋友圈
      let method = 'one_key_share'
      let params = {
        type: String(type),
        title: '我想邀请你一起做时尚买手',
        url: `${url}/oauth?bookActivityCode=${this.bookActivityCode}&participantCode=${this.participantCode}`,
        shareImage: 'http://media.yosar.com/19/324/1574152045660',
        description: '这一季时尚选款，就听你的！为你偏爱的原创款式代言！'
      }

      await this.bookShared()

      console.log(JSON.stringify(params) + 'params')

      utils.postMessage(method, params)
    }
  }
}
</script>

<style lang="less" scoped>
.panel {
  background-color: @color-c8;
  .top-title {
    width: 100%;
    background-color: white;
    padding: 12px 16px;
    p {
      margin: 0;
      font-family: PingFangSC;
      font-size: 14px;
      font-weight: 500;
      color: #2a2b33;
      line-height: 1.43;
    }
  }
  .list-scroll {
    height: calc(100vh - 116px);
    overflow: hidden;
  }
  .scale-content {
    width: 120%;
    margin: 16px 0;
    border-radius: 12px;
    border: solid 0.5px #e1e2e6;
    background-color: white;
    transform: scale(0.5, 0.5) translateX(-15%);
    transform-origin: top;
    padding: 10px;
    height: calc(120vh);
    overflow: auto;
  }
  .bottom-dialog {
    position: fixed;
    bottom: 0;
    background-color: white;
    border-radius: 15px 15px 0 0;
    box-shadow: 0 -1px 6px 0 rgba(33, 44, 98, 0.06);
    width: 100%;
    height: 156px;
    text-align: center;
    padding: 20px;
    h4 {
      margin: 0;
      font-family: PingFangSC;
      font-size: 14px;
      color: #2a2b33;
    }
    p {
      margin: 16px;
      font-family: PingFangSC;
      font-size: 12px;
      color: #b2b5c1;
    }
    .share-logo {
      display: flex;
      justify-content: space-around;
      .left {
        text-align: center;
        img {
          width: 40px;
          height: 40px;
        }
        p {
          margin: 3px 0;
          font-family: PingFangSC;
          font-size: 12px;
          color: #8a8c99;
        }
      }
    }
  }
}
</style>
