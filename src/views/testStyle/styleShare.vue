<template>
  <layout-view>
    <c-header
      slot="header"
      :left-arrow="true"
    ></c-header>

    <div class="panel">
      <div class="top-title">
        <p>已为您生成以下测款页面，测款商品为本次订货会的9款主打商品：</p>
      </div>
      <c-list class="list-scroll">
        <div class="scale-content">
          <share-list
            class="share-list"
            :productList="list"
          ></share-list>
        </div>
      </c-list>
      <div class="bottom-dialog">
        <h4>分享给您的顾客，开始收集测款数据吧～</h4>
        <p>(测款数据在订货会页面查看)</p>
        <div class="share-logo">
          <div class="left">
            <img src="../../themes/images/app/share-wechat@2x.png">
            <p>微信群</p>
          </div>
          <div class="left">
            <img src="../../themes/images/app/share-wefriends@2x.png">
            <p>朋友圈</p>
          </div>
        </div>
      </div>
    </div>

  </layout-view>
</template>

<script>
import shareList from '@/views/common/shareList'
export default {
  components: {
    shareList
  },
  data () {
    return {
      list: [
        {
          mainPic: '',
          title: '针织拼接外套',
          isSelect: false
        },
        {
          mainPic: '',
          title: '针织拼接外套',
          isSelect: false
        },
        {
          mainPic: '',
          title: '针织拼接外套',
          isSelect: false
        },
        {
          mainPic: '',
          title: '发发发斤斤计较京津冀',
          isSelect: false
        },
        {
          mainPic: '',
          title: '韩版毛领连帽大衣冒烟哈哈哈',
          isSelect: false
        },
        {
          mainPic: '',
          title: '针织拼接外套',
          isSelect: false
        },
        {
          mainPic: '',
          title: '发发发斤斤计较京津冀',
          isSelect: false
        },
        {
          mainPic: '',
          title: '韩版毛领连帽大衣冒烟哈哈哈',
          isSelect: false
        },
        {
          mainPic: '',
          title: '韩版毛领连帽大衣冒烟哈哈哈',
          isSelect: false
        }
      ]
    }
  },
  created () {
    this.getTestStyleList()
  },
  methods: {
    getTestStyleList () {
      const params = {
        bannerCode: '1000A01',
        bookDataQueryType: 1,
        bookRankDispalyNum: 9
      }
      this.$api.book.bookMainInfo(params).then(res => {
        console.log(res)
        debugger
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.panel {
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
    height: calc(150vh - 150px);
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
