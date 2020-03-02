<template>
    <div class="input-contain">
        <input class="price-input" v-model="value" type="text" @input="handleInput" @focus="()=>{ isFocus = true }" @blur="()=>{ isFocus = false }">
        <div @click.stop="handleClear" class="clear-icon">
            <img v-show="value.length > 0 && isFocus && !hiddenClear" :src="deleteIcon" alt="">
        </div>

    </div>
</template>

<script>
export default {
    props: {
        value: String,
        hiddenClear: {
            type: Boolean,
            default: false
        },
        formart: {
            type: String,
            default: ''
        }
    },
    // watch: {
    //     value(val) {
    //         this.inputVal = val
    //     }
    // },
    data() {
        return {
            deleteIcon: require('@/themes/images/app/control_delete@3x.png'),
            isFocus: false
        }
    },
    methods: {
        handleInput(val) {
            if (this.formart !== '') {
                this.inputFormat(val.target.value)
            } else {
                this.$emit('input', val.target.value)
            }
        },
        inputFormat(obj) {
            if (this.formart === 'digit') { // 小数 默认两位
                obj = this.digit(obj)
            } else if (this.formart === 'number') {
                obj = obj.replace(/[^\d]/g, '') // 清除“数字”以外的字符
            }
            this.value = obj
            // this.inputVal = obj
            this.$emit('input', this.value)
        },

        // 最多两位小数
        digit(obj) {
            obj = obj.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
            obj = obj.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
            obj = obj.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
            obj = obj.replace(/^(\\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
            if (obj.indexOf('.') < 0 && obj !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                // obj = parseFloat(obj)
            }
            return obj
        },
        handleClear() {
            this.value = '0'
            this.$emit('input', this.value)
        }
    }
}
</script>

<style lang="less" scoped>
.input-contain {
    width: 100%;
    height: 32px;
    background:rgba(244,245,247,0);
    position: relative;
    margin-left: 8px;
    border-radius:8px;
}
.clear-icon {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 6px;
    z-index: 999999;
    right: 12px;
    img {
        width: 100%;
    }
}
.price-input {
    outline: 0;
    width: 100%;
    height: 32px;
    font-size:16px;
    font-weight:500;
    font-family: "alibabaBold";
    color:rgba(42,43,51,1);
    background:rgba(244,245,247,0);
    border-radius:8px;
}
</style>
