<template>
    <div v-if="showSelf" class="dialog" :style="{'z-index': zIndex}">
        <div class="dialog-mark" @click.self="closeMyself" :style="{'z-index': zIndex + 1}"></div>
        <transition name="dialog">
            <div class="dialog-sprite" :style="handleBodySafeArea()">
                <section class="body">
                    <slot></slot>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
import utils from 'utils'

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
            required: true
        },
        safeArea: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            name: 'dialog',
            showSelf: false,
            zIndex: 9999, // this.getZIndex(),
            bodyOverflow: ''
        }
    },
    watch: {
        show(val) {
            if (!val) {
                this.closeMyself()
            } else {
                this.showSelf = val
            }
        }
    },
    created() {
        this.showSelf = this.show
    },
    mounted() {
        // this.forbidScroll()
    },
    methods: {
        handleBodySafeArea() {
            if (this.safeArea) {
                let width = (window.screen.width - 32) / 100
                let baseparams = utils.getStore('baseParams')
                let top = 64
                let bottom = 50
                if (baseparams.isIphoneX) {
                    top = 88
                    bottom = 84
                }
                let height = (window.screen.height - top - bottom) / 100
                return `width:${width}rem;height:${height}rem;top:${top / 100}rem;z-index:${this.zIndex + 2};overflow:scroll`
            }
            return `z-index:${this.zIndex}`
        },
        /** 禁止页面滚动 */
        forbidScroll() {
            this.bodyOverflow = document.body.style.overflow
            document.body.style.overflow = 'hidden'
        },

        /**  每次获取之后 zindex 自动增加 */
        getZIndex() {
            let zIndexInit = 20190315
            return zIndexInit++
        },
        /** 点击遮罩关闭弹窗 */
        closeMyself(event) {
            this.showSelf = false
            this.sloveBodyOverflow()
            this.$emit('close')
        },

        /** 恢复页面的滚动 */
        sloveBodyOverflow() {
            document.body.style.overflow = this.bodyOverflow
        }
    }
}
</script>

<style lang="less" scoped>
    // 弹窗动画
    .dialog-enter-active,
    .dialog-leave-active {
        transition: opacity .5s;
    }
    .dialog-enter,
    .dialog-leave-to {
        opacity: 0;
    }
    // 最外层 设置position定位
    // 遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
    .dialog {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        // 内容层 z-index要比遮罩大，否则会被遮盖
        .dialog-mark {
            position: absolute;
            top: 0;
            height: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .6);
        }
    }
    .dialog-sprite::-webkit-scrollbar {
        display:none
    }
    .dialog-sprite {
        // 移动端使用felx布局
        position: absolute;
        // top: 10%;
        left: 16px;
        right: 16px;
        // bottom: 25%;
        // display: flex;
        // flex-direction: column;
        // max-height: 75%;
        // min-height: 180px;
        // overflow: hidden;
        z-index: 11111;
        background: #fff;
        border-radius: 12px;
    }
</style>
