<template>
   <layout-view>
   <c-header slot="header" :left-arrow="true">
       <div slot="title"></div>
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
</style>
