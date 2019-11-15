<template>
  <div class="op-contain">
    <c-header slot="header" :pageOutStatus="true" >
      <template v-slot:title>
        <span>订购会</span>
      </template>
    </c-header>
    <div @click="handleToOrder">跳转订购会</div>
  </div>
</template>

<script>

import components from 'components'

const { CHeader } = components
export default {
    components: {
        CHeader
    },
    props: {

    },
    data () {
        return {
            topImage: require('@/themes/images/app/main-name@2x.png')
        }
    },
    methods: {
        handleToOrder () {
            this.$router.push({ name: 'orderProduct' })
        }
    }
}
</script>

<style lang="less" scoped>
.op-product {
  background: #fff;
  height: 100%;
  .topImage {
    display: block;
    width: 100%;
    object-fit: cover;
  }
}

</style>
