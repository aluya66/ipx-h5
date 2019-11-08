<template>
  <div class="allContain">
    <tabs v-model="active" title-active-color='#3c5cf6' :line-width='getLineWidth' title-inactive-color='#8a8c99' class="customTab">
      <tab :title="item" v-for="(item ,index) in getMenuItems" :key="index">
        <div class="r-contain" v-for="(listItem ,index) in getLists" :key="index">
          <div class="r-leftContain">
            <section :class="handleRankIcon(index)" >{{index > 2 ? index :''}}</section>
            <img :src="listItem.mainPic" alt="">
            <h3>{{listItem.productName}}</h3>
          </div>
          <div class="r-rightContain">
            <p>{{listItem.categorySalesVolume || 0}}</p><span>{{getMenuItems[active] === '测款排行榜' ? '票' : '件'}}</span>
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
        case 1 :
          return this.allList.singleSalesRankList
        case 2:
          return this.allList.categorySalesRankList
        default:
          return this.allList.singleMeasureRankList
      }
    },
    getMenuItems () {
      let menuItems = []
      if (this.allList.singleSalesRankList instanceof Array && this.allList.singleSalesRankList.length > 0) {
        menuItems.push('单品排行榜')
      } else if (this.allList.categorySalesRankList instanceof Array && this.allList.categorySalesRankList.length > 0) {
        menuItems.push('品类排行榜')
      } else if (this.allList.singleMeasureRankList instanceof Array && this.allList.singleMeasureRankList.length > 0) {
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
  mounted () {

  }
}
</script>

<style lang="less">
  .customTab {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
    margin: 0 16px;
    .van-tabs__line {
        position: absolute;
        bottom: 27px;
        left: 0;
        z-index: 0;
        height: 5px;
        background-color: #ebeeff;
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
  justify-content:space-between;
  align-items: center;
  &:last-child {
    margin-bottom: 12ox
  }
  .r-rightContain {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 12px;
    p {
    // font-family: ALIBABAFont;
    font-size: 18px;
    font-weight: bold;
    color: #f53030;
    margin-right: 12px;
    margin: 0
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
    justify-content:space-around;
    align-items: center;
    .firstClass {
      background-image: url('../../../themes/images/app/rank-one@2x.png');
      // background-position: right bottom, left top;
      background-repeat: no-repeat;
      background-position:center;

    }
    .secondClass {
      background-image: url('../../../themes/images/app/rank-two@2x.png');
      background-repeat: no-repeat;
      background-position:center;
    }
    .thridClass {
      background-image: url('../../../themes/images/app/rank-three@2x.png');
      background-repeat: no-repeat;
      background-position:center;
    }
    section {
      width: 26px;
      height: 26px;

      line-height: 26px;
      margin: 0 8px 0;
      font-size: 10px;
      color: #8a8c99;
      text-align: center;
    }
    img {
      width: 48px;
      height: 48px;
      object-fit: cover;
    }
    h3 {
      // height: 20px;
      // line-height: 20px;
      margin: 0 0 0 12px;
      font-size: 14px;
      font-weight: 500;
      color: @color-c1;
      max-width: 200px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

}

</style>
