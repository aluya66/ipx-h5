<template>
   <div class="empty">
       <img src="@/themes/images/app/default_empty.png" alt="">
       <p>业务建设中，敬请期待</p>
   </div>
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
.empty {
    background:rgba(255,255,255,1);
    border-radius:12px 12px 0px 0px;
    padding-top: 112px;
    text-align: center;
    p {
        font-size:14px;
        font-weight:400;
        color:rgba(138,140,153,1);
        line-height:20px;
        text-align: center;
        margin-top: 12px;
    }
    img {
        height: 184px;
        object-fit: cover;
    }
}
</style>
