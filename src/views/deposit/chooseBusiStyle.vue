<template>
   <layout-view>
   <c-header class="my-header" slot="header" :left-arrow="true">
       <div slot="title">经营风格</div>
   </c-header>

    <div class="content">

    <van-cell value="英伦风" size="large" />
    <van-cell value="小清新" size="large" />
    <van-cell value="学院风" size="large" />

    </div>

   </layout-view>
</template>

<script>
import { Cell } from 'vant';
export default {
    components: {
        [Cell.name]: Cell
    },
    data () {
        return {

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
</style>
