<template>
  <div class="flex install-bottom" :style="{ bottom: footerHeight }">
    <div class="flex-left">
      <div class="logo">
        <img src="../../../themes/images/app/logo.png" alt="" srcset="">
      </div>
      <div class="name">
        <h5>IPX</h5>
        <em>·</em>
        <span>原创设计师服装集中地</span>
      </div>
    </div>
    <div class="flex-right flex-btn" @click="download">
      <span>立即下载</span>
      <i class="icon icon-next"></i>
    </div>
  </div>
</template>

<script>
import utils from 'utils'
export default {
  data () {
    return {
      footerHeight: 0
    }
  },
  methods: {
    download () {
      window.location.href = 'https://h5.yosar.com/pages/downLoad/'
    }
  },
  created () {
    this.baseParams = utils.getStore('baseParams')
    if (this.baseParams.platform === 'ios') {
      if (Number(this.baseParams.statusBarHeight) >= 40) {
        this.footerHeight = (Number(37) / 100) + 'rem'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.install-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  font-family: PingFangSC-Regular, PingFang SC;
  height: 56px;
  background: rgba(255, 255, 255, 1);
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  .flex-left {
    display: flex;
    align-items: center;
    .logo {
      width: 26px;
      height: 26px;
      background: rgba(0, 0, 0, 1);
      border-radius: 50%;
      img{
        width: 26px;
        height: 26px;
        border-radius: 8px;
      }
    }
    .name {
      margin-left: 8px;
      display: flex;
      align-items: center;
      h5 {
        font-size: 16px;
        color: rgba(42, 43, 51, 1);
        line-height: 22px;
        margin: 0;
        padding: 0;
      }
      em {
        color: rgba(42, 43, 51, 1);
        line-height: 20px;
        margin: 0 4px;
      }
      span {
        font-size: 12px;
        color: rgba(138, 140, 153, 1);
        line-height: 16px;
      }
    }
  }
  .flex-right {
    &.flex-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      // width: 82px;
      height: 34px;
      background: rgba(228, 233, 255, 1);
      border-radius: 24px;
      padding: 0 12px;
      span {
        color: rgba(6, 48, 254, 1);
        line-height: 20px;
      }
      .icon {
        &.icon-next {
          width: 12px;
          height: 12px;
          background: url("../../../themes/images/app/icon_next_blue@2x.png")
            no-repeat center;
          background-size: cover;
        }
      }
    }
  }
}
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91c95befdc3e2166&redirect_uri=http%3a%2f%2f27684m4p64.wicp.vip%2ftestStyle%2fvote&response_type=code&scope=snsapi_userinfo&state=12&uin=MTMwODk0NDc4Mg%3D%3D&key=9d288677f073f000f76c3b9ad78250a6503c432017ceb524057f3aa85377706d845400c8462afc59ec8b988f0431f2e0&pass_ticket=rap/90AY4bb/Y5c9bX57dQvF5VgyflUIt/+dYHUmBziUmA9ie2gG0VO8ixl+uPDsZYmh2YrSxUOE31X8l5yjQA==
// https://openapi.yosar.com/ticket  获取appid信息
// https://openapi.yosar.com/oauth   获取授权
// https://openapi.yosar.com/oauth?code=011rLV0G0ft89d2DlX3G0ugK0G0rLV0q&state=12
</style>
