<template>
    <div class="dialog-count-container">
        <div class="dialog-count-content" :class="{'dialog-count-content-hide': showDialog}">
            <div class="dialog-count-title">
                <img src="../../themes/images/app/icon_close24_gray_def@3x.png" @click="close"/>
                <span class="title">选择预定数量</span>
            </div>
            <div class="count-item" v-for="(item, index) in numberList" :key="index" @click="itemClick(item)">
                {{item}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showDialog: { // 是否显示对话框，默认不显示
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            numberList: [
                '3000',
                '5000',
                '10000',
                '10000以上'
            ]
        }
    },
    methods: {
        /**
         * 关闭对话框事件
         */
        close() {
            this.$emit('onClose')
        },
        /**
         * 选择数量事件
         */
        itemClick(item) {
            this.$emit('onSelectedCount', item)
            this.close()
            console.log(item)
        }
    }
}
</script>

<style lang="less" scoped>
    .dialog-count-container {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        position: fixed;
        bottom: 0;
        z-index: 10;
        .dialog-count-content {
            width: 100%;
            position: absolute;
            bottom: 0;
            background-color: white;
            border-radius: 12px 12px 0 0;
            display: flex;
            flex-direction: column;
            padding-bottom: 20px;
            transition: all 0.3s ease;
            transform: translateY(100%);

            .dialog-count-title {
                border-bottom: solid #E1E2E6 0.002rem;
                height: 58px;
                line-height: 58px;
                align-items: center;
                flex-direction: row-reverse;
                display: flex;
                > span {
                    margin-left: 40px;
                    text-align: center;
                    width: calc(100vw - 80px);
                    font-size: 18px;
                    font-weight: bold;
                    color: @color-c1;
                }
                > img {
                    width: 24px;
                    height: 24px;
                    margin-right: 16px;
                }
            }
        }
        .dialog-count-content-hide {
            transform: translateY(0);
        }
        .count-item {
            height: 50px;
            margin-left: 16px;
            border-bottom: solid #E1E2E6 0.002rem;
            color: @color-c1;
            font-size: @f16;
            line-height: 50px;
        }
    }
</style>
