<template>
   <layout-view>
   <c-header class="my-header" slot="header" :left-arrow="true">
       <div slot="title">选择采购用途</div>
   </c-header>

    <div class="content">

    <van-cell v-for="(item,index) in useList" :key="index" @click="choose(item)" :value=item size="large" />

    </div>

   </layout-view>
</template>

<script>
import { Cell } from 'vant'
import utils from 'utils'
export default {
    components: {
        [Cell.name]: Cell
    },
    data () {
        return {
            useList: [
                '企业自用',
                '礼品定制',
                '线上销售',
                '实体店销售',
                '海外出口'
            ]
        }
    },
    created() {
        // this.getBusinesStyle()
    },
    methods: {
        choose(value) {
            this.$router.go(-1)
            utils.setStore('purchaseUse', value)
        }
    }
}
</script>

<style lang='less' scoped>
.my-header {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: @color-c7;
  }
}
.content {
    height: calc(100vh - 65px);
    overflow-y: scroll;
}
</style>
