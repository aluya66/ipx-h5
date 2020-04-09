<template>
   <!-- <div class="empty">
       <img :src="getImage" alt="">
       <p>{{emptyDesc}}</p>
   </div> -->
    <div class="loading_contain">
        <div class="loadding_anim" ref="loadding_anim"></div>
        <p>{{loaddingDesc}}</p>
    </div>
</template>

<script>
import lottie from 'lottie-web'
import favAnmData from '@/utils/IPX_loading.json'
export default {
    components: {

    },
    props: {
        loaddingDesc: {
            type: String,
            default: '加载中...'
        }
    },
    data () {
        return {

        }
    },
    computed: {
    },
    mounted() {
        lottie.loadAnimation({
            container: this.$refs.loadding_anim, // 包含动画的dom元素
            renderer: 'svg', // 渲染出来的是什么格式
            loop: true, // 循环播放
            autoplay: true, // 自动播放
            animationData: favAnmData // 动画json的路径
        })
    }
}
</script>

<style lang='less' scoped>
.loading_contain {
    background:rgba(255,255,255,1);
    // text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .loadding_anim {
        width: 50px;
        height: 40px;
        margin-top: 0;
    }
    > p {
        font-size: 14px;
        line-height: 20px;
        color: @color-c3;
        margin-top: 10px;
    }
}
</style>
