<template>
  <div class="panel">
    <div class="report-list">
      <div class="report" v-for="(item,index) in list" :key="index">
        <div class="left">
          <div class="rank" :style="{'backgroundImage': item.topNumUrl}">
            <p v-if="index > 2">{{index | numStr}}</p>
          </div>
          <img :src="item.mainPic" />
          <span>{{item.productName}}</span>
        </div>
        <div class="price">
          <p>{{item.measureVoteNum}}</p>&nbsp;
          <span>票</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            topNumUrl: ''
        }
    },
    // created () {
    //   this.list = this.list.map((item,index) =>{
    //       item.topNumUrl = 'url(' + require('../../themes/images/app/rank'+index+'@3x.png') + ')'
    //   })
    // },
    filters: {
        numStr (val) {
            let num = val + 1
            return num < 10 ? '0' + num.toString() : num
        }
    }
}
</script>

<style lang="less" scoped>
.panel {
  .report-list {
    height: calc(100vh - 240px);
    padding-bottom: 2px;
    overflow: auto;
    .report {
      display: flex;
      justify-content: space-between;
      margin: 16px 16px;
      margin-bottom: 32px;
      align-items: center;
      .left {
        display: flex;
        width: 80%;
        .rank {
          width: 32px;
          height: 32px;
          text-align: center;
          margin-top: 12px;
          background-repeat: no-repeat;
          background-size: 100%;
          p {
            // font-family: 'PingFangSC';
            font-size: 12px;
            font-weight: 600;
            color: #8a8c99;
          }
        }
        img {
          width: 56px;
          height: 56px;
          margin: 0 12px;
          border-radius: 4px;
          object-fit: cover;
        }
        span {
          // font-family: 'PingFangSC';
          font-size: 14px;
          font-weight: bold;
          color: #2a2b33;
          line-height: 56px;
          width: 140px;
          .ellipsis();
        }
      }
      .price {
        // font-family: 'PingFangSC';
        font-size: 12px;
        color: #8a8c99;
        // line-height: 56px;
        width: 30%;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        p {
          font-family: 'alibabaBold';
          font-size: 20px;
          font-weight: bold;
          color: #f53030;
          width: 80%;
          margin: 0;
          /* display: inline-block; */
          text-align: right;
          display: inline-block;
          .ellipsis();
        }
      }
    }
  }
}
</style>
