<template>
  <div class="no-page">
    <c-icon name="failure"></c-icon>
    <div class="text">
      未找到頁面，
      <span>{{count}}s</span>後返回首頁
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      delayTime: null,
      count: 5
    }
  },
  created () {
    this.setTime()
  },
  methods: {
    setTime () {
      const that = this
      setTimeout(() => {
        that.count -= 1
        if (that.count === 0) {
          this.$router.replace('/login')
        } else {
          that.setTime()
        }
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.no-page {
  width: 100%;
  height: 100vh;
  font-size: 0.2rem;
  text-align: center;
  background-color: @background-sub-color;
  min-height: 600px;
  margin-top: 30%;
  .text {
    margin-top: 30px;
    color: @text-sub-color;
    span {
      color: @text-red;
    }
  }
}
</style>
