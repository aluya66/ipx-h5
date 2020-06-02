<template>
<div class="panel">
    <div class="info-tab-container">
        <div class="info-tab-item" :class="{'info-tab-item-selected' : selectedIndex===0}" @click="switchTab(0)">
            <p>1</p>
            <span>基本信息</span>
        </div>
        <i class="info-line" :class="{'info-line-selected': selectedIndex === 1}"/>
        <div class="info-tab-item" :class="[{'info-tab-item-selected' : selectedIndex===1}, {'info-tab-container-disable' : selectedIndex<1}]" @click="switchTab(1)">
            <p>2</p>
            <span>口罩信息</span>
        </div>
        <i class="info-line" :class="{'info-line-selected': selectedIndex === 2}"/>
        <div class="info-tab-item" :class="[{'info-tab-item-selected' : selectedIndex===2}, {'info-tab-container-disable' : selectedIndex<2}]" @click="switchTab(2)">
            <p>3</p>
            <span>其他信息</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        selectedIndex: { // 选中tab的索引
            type: Number,
            default: 0
        }
    },
    data() {
        return {}
    },
    methods: {
        /**
         * 小于当前索引的才能通过点击切换tab，大于当前索引的要点击"下一步"切换
         *
         * @param index
         */
        switchTab(index) {
            // if (Number(index) < this.selectedIndex) {
            this.$emit('onSwitchTab', Number(index))
            // }
        }
    }
}
</script>

<style lang="less" scoped>
.panel {
    position: relative;
    padding-bottom: 16px;
    .bag_view {
        position: absolute;
        height: 55px;
        width: 100%;
        bottom: 0;
        background: white;
        z-index: 100;
    }
}
    .info-tab-container {
        position: relative;
        width: calc(100vw - 32px);
        height: 96px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.12);
        border-radius: 12px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-left: 16px;
        margin-right: 16px;

        .info-line {
            height: 1px;
            width: 58px;
            background-color: @color-c7;
            margin-top: 36px;
        }

        .info-line-selected {
            background-color: @color-ec;
        }

        .info-tab-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 24px;

            > p {
                width: 24px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                background-color: @color-c2;
                border-radius: 12px;
                font-size: 10px;
                font-weight: bold;
                color: white;
            }

            > span {
                color: @color-c2;
                line-height: 20px;
                font-size: 14px;
                margin-top: 8px;
            }
        }

        .info-tab-item-selected {
            > p {
                background-color: @color-ec;
            }

            > span {
                color: @color-ec;
                font-weight: bold;
            }
        }

        .info-tab-container-disable {
            > p {
                color: @color-c3;
                background-color: @color-c7;
            }

            > span {
                color: @color-c2;
            }
        }
    }

</style>
