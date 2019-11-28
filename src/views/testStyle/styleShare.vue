<template>
  <layout-view>
    <!-- <div> -->
    <c-header slot="header" :left-arrow="true"></c-header>

    <div class="panel share-panel">
      <div class="top-title">
        <p>已为您生成以下测款页面，测款商品为本次订货会的{{totalNum}}款主打商品：</p>
      </div>
      <c-list class="list-scroll">
        <div class="scale-content" ref="shareList">
          <share-list class="share-list" :productList="list"></share-list>
        </div>
      </c-list>
    </div>
    <div class="bottom-dialog" :style="{'padding-bottom':paddingTop}">
      <h4>分享给您的顾客，开始收集测款数据吧～</h4>
      <p>(测款数据在订货会页面查看)</p>
      <div class="share-logo">
        <div class="left" @click="shareWechat(1)">
          <img src="../../themes/images/app/share-wechat@3x.png" />
          <p>微信群</p>
        </div>
        <div class="left" @click="shareWechat(2)">
          <img src="../../themes/images/app/share-wefriends@3x.png" />
          <p>朋友圈</p>
        </div>
      </div>
    </div>
    <!-- </div> -->
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
            paddingTop: '',
            list: [
                {
                    mainPic: '',
                    productAtrNumber: '',
                    productCode: ''
                }
            ]
        }
    },
    activated () {
        this.participantCode = this.$route.query.participantCode
        this.bookActivityCode = this.$route.query.bookActivityCode
        this.getSharemeasuresList()

        this.baseParams = utils.getStore('baseParams')
        let statusBarHeight = this.baseParams.statusBarHeight || 0
        let statusBarHeightSum = Number(statusBarHeight) / 100
        if (this.baseParams.platform === 'ios') {
            if (Number(this.baseParams.statusBarHeight) > 20) {
                this.paddingTop = (Number(statusBarHeightSum)) + 'rem'
            }
        }
    },
    mounted () {
        // 上报页面事件
        window.sensors.track('pageView', {
            // String 类型
            pagename: 'styleShare'
        })
        setTimeout(() => {
            console.log(document.querySelector('.van-pull-refresh'))

            console.log(this.$refs.shareList.offsetHeight)
            // document.querySelector('.list-scroll').style.height =
            //   (this.$refs.shareList.offsetHeight - 880) + 'px'
            if (this.$refs.shareList.offsetHeight > 3000) {
                document.querySelector('.van-pull-refresh').style.height =
        (this.$refs.shareList.offsetHeight - 860) + 'px'
            } else {
                document.querySelector('.van-pull-refresh').style.height =
        (this.$refs.shareList.offsetHeight - 650) + 'px'
            }

            // document.querySelector('.van-list').style.height =
            // (this.$refs.shareList.offsetHeight - 600) + 'px'
            // document.querySelector('.van-pull-refresh__track').style.height =
            // (this.$refs.shareList.offsetHeight - 1000) + 'px'
        }, 500)
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
                    this.totalNum = res.length || 0
                    if (this.list.length > 9) {
                        this.list = this.list.splice(0, 9)
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
            // type 1=好友
            if (type === 1) {
                // 上报按钮事件
                window.sensors.track('click', {
                    // String 类型
                    pagename: 'shareGoodFriends'
                })
            } else {
                // 2=朋友圈
                // 上报按钮事件
                window.sensors.track('click', {
                    // String 类型
                    pagename: 'shareWechatMoments'
                })
            }
            // let url = window.location.host
            let url = 'h5.yosar.com'
            // type 1=好友 2=朋友圈
            let method = 'one_key_share'
            let params = {
                type: String(type),
                title: '我想邀请你一起做时尚买手',
                url: `https://${url}/ipxhybrid/oauth?bookActivityCode=${this.bookActivityCode}&participantCode=${this.participantCode}`,
                // shareImage: 'http://media.yosar.com/19/324/1574152045660',
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
.share-panel{
  // height: calc(89vh);
  // overflow: auto;
}
.panel {
  background-color: @color-c8;

  .top-title {
    width: 100%;
    background-color: white;
    padding: 12px 16px;
    p {
      margin: 0;
      // font-family: PingFangSC;
      font-size: 14px;
      font-weight: 600;
      color: #2a2b33;
      line-height: 1.43;
    }
  }
  .list-scroll {
    height: calc(100vh - 200px);
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
    // height: calc(120vh);
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

}

.bottom-dialog {
    position: fixed;
    bottom: 0;
    background-color: white;
    border-radius: 15px 15px 0 0;
    box-shadow: 0 -1px 6px 0 rgba(33, 44, 98, 0.06);
    width: 100%;
    // height: 156px;
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
</style>
