<template>
   <layout-view>
   <c-header slot="header" :left-arrow="true">
       <div slot="title">我的展厅</div>
       <template slot="right" tag="div">
           <img class="header-img" :src="headerSearchImg" />
       </template>
   </c-header>
   </layout-view>
</template>

<script>
export default {
    components: {

    },
    props: {

    },
    data () {
        return {

        }
    }
}
</script>

<style lang='less' scoped>
.header-img {
  display: inline-block;
  vertical-align: middle;
  width: 26px;
  height: 26px;
}
</style>
