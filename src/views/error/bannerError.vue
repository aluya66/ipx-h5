<template>
  <div class="error-imgs">
    <img :src="errorImg" />
    <p>当前链接已失效</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorImg: ""
    };
  },
  created() {
    this.errorImg = require("../../themes/images/app/default_no search copy@2x.png");
  }
};
</script>

<style lang="less" scoped>
.error-imgs {
  text-align: center;
  margin-top: 118px;
  img {
    width: 184px;
    height: 184px;
  }
  p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(138, 140, 153, 1);
    line-height: 20px;
  }
}
</style>