<template>
  <div class="op-section">
    <p>{{title}}</p>
    <p>{{subTitle}}</p>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang='less' scoped>
.op-section {
  height: 152px;
  position: relative;
  p {
    position: absolute;
    text-align: center;
    margin: 0;
    width: 100%;
    &:first-child {
      font-size:28px;
      color:#2a2b33;
      line-height: 40px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      bottom: 48px;
    }
    &:last-child {
      font-size:14px;
      color:#585b66;
      line-height: 20px;
      bottom: 24px;
    }
  }
}
</style>
