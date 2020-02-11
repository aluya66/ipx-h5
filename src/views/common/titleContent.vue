<template>
    <div class="contain-view">
        <p class="title">{{title}}<span class="subTitle">{{subTitle}}</span></p>
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        }
    },
    data() {

    }
}
</script>
<style lang="less" scoped>
.contain-view {
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(33,44,98,0.06);
    border-radius:12px;
    padding: 16px 0;
    margin: 12px 0;
    .title {
        font-size:16px;
        font-weight:600;
        color:@color-c1;
        line-height:22px;
        vertical-align: middle;
        margin-left: 16px;
        margin-top: 16px;
    }
    .subTitle {
        font-size:12px;
        font-weight:400;
        color:@color-c3;
        line-height:16px;
        padding-left: 12px;
        margin-right: 16px;
    }
}
</style>
