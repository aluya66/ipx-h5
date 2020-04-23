<template>
   <layout-view>
   <c-header slot="header" :left-arrow="true" :showBorderBottom='true'>
       <div slot="title">海报保存成功</div>
   </c-header>
   <div class="save_content">
       <img :src="saveSuccess" alt="">
       <p class="title_content">海报保存成功</p>
       <p class="describ_content">海报已保存至相册，可分享到微信和朋友圈</p>
       <button @click="commit">完成</button>
   </div>

   </layout-view>
</template>

<script>
import utils from 'utils'
export default {
    components: {

    },
    props: {

    },
    data () {
        return {
            saveSuccess: require('@/themes/images/groupGoods/icon_save_success@3x.png')
        }
    },
    methods: {
        commit() {
            let isFromGroup = utils.getStore('isFromGroupDetail')
            if (isFromGroup === 'true') {
                // 跳到组货详情
                this.$router.push({
                    path: '/groupDetail',
                    query: {
                        groupCode: this.$route.query.groupCode
                    }
                })
            } else {
                const params = {
                    jumpUrl: 'savePostSuccess://'
                }
                utils.postMessage('', params)
            }
        }
    }
}
</script>

<style lang='less' scoped>
.save_content {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    > img {
        width: 103px;
        height: 103px;
        margin-top: 52px;
    }
    .title_content {
        margin-top: 8px;
        font-size:20px;
        font-weight:bold;
        color: @color-c1;
        line-height:28px;
    }
    .describ_content {
        margin-top: 8px;
        font-size:12px;
        font-weight:400;
        color: @color-c3;
        line-height:16px;
    }
    > button {
        position: absolute;
        width: 164px;
        height:50px;
        background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
        border-radius:25px;
        font-size:18px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        bottom: 0;
        margin-bottom: 76px;
    }
}
</style>
