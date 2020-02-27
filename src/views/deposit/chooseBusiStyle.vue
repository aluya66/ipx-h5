<template>
   <layout-view>
   <c-header class="my-header" slot="header" :left-arrow="true">
       <div slot="title">经营风格</div>
   </c-header>

    <div class="content">

    <van-cell v-for="(item,index) in styleList" :key="index" @click="choose(item.labelName)" :value=item.labelName size="large" />

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
            styleList: []
        }
    },
    created() {
        this.getBusinesStyle()
    },
    methods: {
        choose(value) {
            this.$router.go(-1)
            utils.setStore('businStyle', value)
        },
        getBusinesStyle() {
            this.$api.deposit.getIntentionStyle().then(res => {
                this.styleList = res
            }).catch(err => {
                console.log(err)
            })
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
