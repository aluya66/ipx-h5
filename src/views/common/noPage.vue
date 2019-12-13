<template>
  <div class="no-page">
    <noPage />
    <!-- <c-icon name="failure"></c-icon>
    <div class="text">
      未找到頁面，
      <span>{{count}}s</span>後返回首頁
    </div>-->
  </div>
</template>

<script>
import noPage from '../error/emptyView'
export default {
    data() {
        return {}
    },
    components: {
        noPage
    },
    created() {},
    methods: {}
}
</script>

<style lang='less' scoped>
.no-page {
  width: 100%;
  height: calc(100vh);
  background-color: #fff;
  padding-top: 30%;
}
</style>
