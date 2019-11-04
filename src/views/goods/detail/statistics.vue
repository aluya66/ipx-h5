<template>
  <div class="statistics">统计数据</div>
</template>

<script>

export default {
  data() {
    return {};
  },
  created(){

  },

  methods: {
    getDetail(){
      this.$api.goods.getStatistics().then(res => {

      })
    }

  },

  components: {
  }
};
</script>

<style lang='less' scoped>
.statistics{
  background-color: @white;
  height: 100%;
}
</style>
