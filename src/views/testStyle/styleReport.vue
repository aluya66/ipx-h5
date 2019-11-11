<template>
  <layout-view>
    <c-list class="list-scroll">
      <div class="panel">
        <div class="head">
          <img
            src="../../themes/images/app/invalid-name@2x.png"
            alt=""
          >
          <c-header
            slot="header"
            :left-arrow="true"
          >
          </c-header>
          <div class="content">
            <p>测款数据</p>
            <span>数据持续更新中</span>
          </div>
        </div>
        <div class="tab-raduis">
          <c-tabs
            :tabs="tabs"
            :line-width="8/100+'rem'"
            :title-active-color="'#2a2b33'"
            :title-inactive-color="'#8a8c99'"
            :border="false"
            @change="changeActive"
          ></c-tabs>
        </div>
        <reportList :list="testStyleList" />
      </div>
    </c-list>
  </layout-view>
</template>

<script>
import reportList from '@/views/common/reportList.vue'
import components from 'components'
const { CTabs } = components
export default {
  components: {
    CTabs,
    reportList
  },
  data () {
    return {
      tabs: [
        {
          name: 0,
          title: '我的测款数据'
        },
        {
          name: 1,
          title: '平台测款数据'
        }
      ],
      curType: 0,
      testStyleList: []
    }
  },
  created () {
    this.getRankList()
  },
  methods: {
    getRankList () {
      const params = {
        bookRankDispalyNum: 10,
        bookVoteSearchType: this.curType
      }
      this.$api.book
        .bookRankList(params)
        .then(res => {
          res.map((item, index) => {
            if (index < 3) {
              item.topNumUrl =
                'url(' +
                require('../../themes/images/app/rank' + index + '@2x.png') +
                ')'
            }
          })
          this.testStyleList = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeActive (val) {
      this.curType = val
      this.getRankList()
    }
  }
}
</script>

<style lang="less">
.panel {
  .c-header {
    position: fixed;
    top: 0;
  }
  .tab-raduis {
    background-color: white;
    border-radius: 8px;
    transform: translateY(-8px);
    .van-tabs__line {
      border-radius: 10px;
      background-color: #2a2b33;
      margin-bottom: 4px;
    }
    .van-tabs {
      padding-top: 8px;
      border-bottom: 1px solid #e1e2e6;
    }
  }
}
</style>

<style lang="less" scoped>
.list-scroll {
  height: calc(100vh - 1px);
}
.panel {
  position: relative;
  background-color: white;
  .head {
    img {
      width: 100%;
      height: auto;
    }
    .content {
      position: absolute;
      left: 20px;
      transform: translateY(-104px);
      p {
        margin: 0;
        font-family: PingFangSC;
        margin-bottom: 15px;
        font-size: 28px;
        font-weight: 600;
        color: #ffffff;
      }
      span {
        opacity: 0.8;
        font-family: PingFangSC;
        font-size: 12px;
        color: #ffffff;
      }
    }
  }
  .tab-raduis {
    background-color: white;
    border-radius: 8px;
    transform: translateY(-8px);
  }
}
</style>
