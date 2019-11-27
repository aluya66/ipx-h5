<template>
  <div class="allContain">
    <tabs
      v-model="active"
      title-active-color="#3c5cf6"
      :line-width="getLineWidth"
      title-inactive-color="#8a8c99"
      class="customTab"
    >
      <tab :title="item" v-for="(item ,index) in getMenuItems" :key="index" :name="item">
        <div class="r-contain" v-for="(listItem ,index) in getLists" :key="index">
          <div class="r-leftContain">
            <section :class="handleRankIcon(index)">{{index > 2 ? (index + 1) >= 10  ? index + 1 : '0' + (index + 1) : ''}}</section>
            <img :src="listItem.mainPic + '?imageView2/1/w/288/h/288'" alt />
            <h3>{{listItem.productName}}</h3>
          </div>
          <div class="r-rightContain">
            <p>{{active === '单品排行榜' ? listItem.singleSalesVolume : active === '品类排行榜' ? listItem.categorySalesVolume : active === '测款排行榜' ? listItem.measureVoteNum : 0}}</p>
            <span>{{getMenuItems[active] === '测款排行榜' ? '票' : '件'}}</span>
          </div>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'

export default {
  components: {
    Tab,
    Tabs
  },
  props: {
    allList: {
      type: Object,
      default () {
        return {}
      }
    },
    lists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
    getLineWidth () {
      let arr = this.getMenuItems
      if (arr.length <= 1) {
        return 0
      }
      return 84 * window.devicePixelRatio
    },
    getLists () {
      switch (this.active) {
        case '单品排行榜':
          return this.allList.singleSalesRankList
        case '品类排行榜':
          return this.allList.categorySalesRankList
        default:
          return this.allList.singleMeasureRankList
      }
    },
    getMenuItems () {
      let menuItems = []
      if (
        this.allList.singleSalesRankList instanceof Array &&
        this.allList.singleSalesRankList.length > 0
      ) {
        menuItems.push('单品排行榜')
      }
      if (
        this.allList.categorySalesRankList instanceof Array &&
        this.allList.categorySalesRankList.length > 0
      ) {
        menuItems.push('品类排行榜')
      }
      if (
        this.allList.singleMeasureRankList instanceof Array &&
        this.allList.singleMeasureRankList.length > 0
      ) {
        menuItems.push('测款排行榜')
      }
      return menuItems
    }
  },
  methods: {
    handleRankIcon (index) {
      if (index === 0) {
        return 'firstClass'
      } else if (index === 1) {
        return 'secondClass'
      } else if (index === 2) {
        return 'thridClass'
      }
    }
  },
  mounted () {}
}
</script>

<style lang="less">
.customTab {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
  margin: 0 16px;
  .van-tabs__wrap{
    border-radius: 8px;
    &::after{
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border:0;
      border-bottom: 0 solid#ebedf0;;
      -webkit-transform: scale(.5);
      transform: scale(.5);
      border-width: 0.01rem 0;
    }
  }
  .van-tabs__line {
    position: absolute;
    bottom: 26px;
    left: 0;
    z-index: 0;
    height: 5px;
    background-color: #ebeeff;
    min-width: 85px;
    border-radius: initial;
  }
  .van-tab {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    box-sizing: border-box;
    min-width: 0;
    padding: 0 0.05rem;
    color: #7d7e80;
    font-size: 0.14rem;
    line-height: 0.44rem;
    text-align: center;
    cursor: pointer;
    z-index: 10;
    &.van-tab--active {
      span {
        font-size: 16px;
        font-weight: 600;
        color: #3c5cf6;
      }
    }
    span {
      // font-family: PingFangSC;
      font-size: 14px;
      color: #8a8c99;
    }
  }
  .van-tab__pane {
    padding-bottom: 12px;
  }
}
</style>

<style lang='less' scoped>
.allContain {
  background-color: #ffffff;
  padding-bottom: 64px;
  .r-contain {
    height: 72px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &:last-child {
      margin-bottom: 12ox;
    }
    .r-rightContain {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      margin-right: 12px;
      p {
        font-family: 'alibabaBold';
        font-size: 18px;
        font-weight: bold;
        color: #f53030;
        margin-right: 12px;
        margin: 0;
      }
      span {
        margin: 0;
        font-size: 12px;
        color: #8a8c99;
        font-weight: normal;
        padding-left: 4px;
      }
    }
    .r-leftContain {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .firstClass {
        background-image: url("../../../themes/images/app/rank-one@3x.png");
        // background-position: right bottom, left top;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
      .secondClass {
        background-image: url("../../../themes/images/app/rank-two@3x.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
      .thridClass {
        background-image: url("../../../themes/images/app/rank-three@3x.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
      section {
        width: 26px;
        height: 26px;
        line-height: 26px;
        margin: 0 8px 0;
        font-size: 10px;
        color: #8a8c99;
        font-weight: 600;
        text-align: center;
      }
      img {
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 8px;
      }
      h3 {
        // height: 20px;
        // line-height: 20px;
        margin: 0 0 0 12px;
        font-size: 14px;
        font-weight: 600;
        color: @color-c1;
        width: 120px;
        // max-width: 200px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
