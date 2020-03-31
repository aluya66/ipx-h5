<template>
   <layout-view>
   <c-header class="my-header" slot="header" :left-arrow="true">
       <div slot="title">选择采购数量</div>
   </c-header>

    <div class="content">

    <van-cell v-for="(item,index) in numberList" :key="index" @click="choose(item)" :value=item size="large" />

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
            numberList: [
                "1万以下",
                "1～5万件",
                "5～10万件",
                "10～50万件",
                "50～100万件",
                "100万件以上"
            ]
        }
    },
    created() {
        // this.getBusinesStyle()
    },
    methods: {
        choose(value) {
            this.$router.go(-1)
            utils.setStore('purchaseNumber', value)
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
