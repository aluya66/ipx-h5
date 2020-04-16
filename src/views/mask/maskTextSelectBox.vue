<template>
    <div class="panel">
        <title-content style="padding: 0;border-radius:0;" :title="title" titleFont="14">
            <template slot="content">
                <van-grid class="component_content" :border="false" :column-num="columnNum" >
                    <van-grid-item v-for="(item,index) in resourceData" :key="index" >
                        <div :style="titleTop" :class="['component_item', item.isSelect ? 'select_item' : '']" @click="itemClick(item)">
                            <p :class="['component_text', item.isSelect ? 'select_color' : '']" >{{item.title}}</p>
                        </div>
                    </van-grid-item>
                </van-grid>
            </template>
        </title-content>
    </div>
</template>

<script>
import { Grid, GridItem } from 'vant'
import TitleContent from '../common/titleContent.vue'
export default {
    components: {
        TitleContent,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        resourceData: {
            type: Array,
            default () {
                return []
            }
        },
        columnNum: {
            type: Number,
            default: 1
        },
        gutter: {
            type: Number,
            default: 12
        }
    },
    data () {
        return {

        }
    },
    computed: {
        titleTop() {
            if (this.columnNum > 0) {
                return 'width: calc(' + 100 / parseFloat(this.columnNum) + 'vw - ' + parseFloat(this.gutter) / 100 + 'rem);'
            }
            return ''
        }
    },
    methods: {
        itemClick(item) {
            this.$emit('onSelectItem', item)
        }
    }
}
</script>

<style lang='less' scoped>
.panel {
    .component_content {
        margin-top: 12px;
        padding: 0 10px 4px 10px;
        .component_item {
            height:32px;
            background:@color-c8;
            border-radius:8px;
            margin-bottom: 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            .component_text {
                font-size:12px;
                font-weight:bold;
                color: @color-c1;
                line-height:16px;
            }
            .select_color {
                color: @color-ec;
            }
        }
        .select_item {
            background:rgba(235,238,255,1);
            border:1px solid rgba(60,92,246,1);
        }
    }
}
</style>
