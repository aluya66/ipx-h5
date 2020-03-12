<template>
   <layout-view>
   <c-header class="my-header" slot="header" :left-arrow="true">
       <div slot="title">
           预览海报
       </div>
       <template slot="right" tag="div">
           保存
       </template>
   </c-header>

    <div class="panel_content">
        <div class="content">
            <div class="product_content">
                <img :src="selected_logo" alt="">
                <div class="product_info">
                    <img src="" alt="">
                    
                </div>
            </div>
            <div class="designer_content">

            </div>
            <div class="product_image">

            </div>
        </div>
    </div>

   </layout-view>
</template>

<script>
export default {
    components: {

    },
    data () {
        return {
            selected_logo: require('../../../themes/images/groupGoods/icon_choose_camera@3x.png'),
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
.panel_content {
    background:rgba(244,245,247,1);
    height: calc(100vh - 65px);
    overflow-y: scroll;
}
.content {
    margin: 16px;
    height:600px;
    background: white;
    border-radius:12px;
    .product_content {
        height:245px;
        background:linear-gradient(360deg,rgba(255,255,255,1) 0%,rgba(235,238,255,1) 100%);
        border-radius:12px 12px 0px 0px;
        text-align: center;
        > img {
            margin-top: 16px;
        }
        .product_info {
            margin: 8px 16px 0;
            height:156px;
            background:rgba(255,255,255,1);
            border-radius:12px;
            display: flex;
            > img {
                width:93px;
                height:124px;
                background:rgba(249,250,252,1);
                border-radius:8px;
                margin: 16px 12px 16px 16px;
            }
        }
    }
}
</style>
