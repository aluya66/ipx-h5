<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :showBorderBottom="true">
            <div slot="title">门店热采组货</div>
        </c-header>
        <div class="group-list">
            <c-list
                class="report-list"
                @load-data="handleMore"
                :loading="loading"
                :listItems="hotGroups"
                :error="error"
                :finished="finished"
            >
                <div class="group-item" v-for="(item, index) in hotGroups" :key="index" :style="getImageRect()">
                    <img class="main-pic" :src="item.groupImg" :style="getImageRect()"/>
                    <img class="detail" src="../../themes/images/groupGoods/btn_detail.png"/>
                </div>
            </c-list>
        </div>
    </layout-view>
</template>

<script>
import CList from 'components/c-list'
export default {
    components: {
        CList
    },
    data() {
        return {
            pageNumber: 1,
            pageSize: 10,
            reportType: 1,
            hotGroups: [],
            finished: false, // 加载完标识
            loading: false, // 加载更多标识
            error: false, // 加载错误标识
            itemWidth: 343,
            itemHeight: 257
        }
    },
    methods: {
        getHotGroup() {
            const params = {
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }
            this.loading = true
            this.$api.groupGoods.getHotGroup(params).then(res => {
                this.loading = false
                if (res && res instanceof Array) {
                    if (this.pageNumber === 1) {
                        this.hotGroups = res
                    } else {
                        this.hotGroups.concat(res)
                    }
                    this.finished = res.length < this.pageSize
                } else {
                    this.finished = true
                }
                console.log(this.hotGroups)
            }).catch((err) => {
                console.log(err)
                this.error = true
            })
        },
        handleMore() {
            if (!this.isFinished) {
                this.pageNumber++
                this.getHotGroup()
            }
        },
        handleRefresh() {
            this.pageNumber = 1
            this.getHotGroup()
        },
        getImageRect() {
            this.itemWidth = document.documentElement.clientWidth - 32 * window.devicePixelRatio
            this.itemHeight = this.itemWidth * 257 / 343
            return `width:${this.itemWidth}px;height:${this.itemHeight}px`
        }
    },
    mounted() {
        this.getHotGroup()
    }
}
</script>

<style lang="less" scoped>
    .group-list {
        overflow: scroll;
        .report-list {
            height: calc(100vh - 60px);
            .group-item {
                position: relative;
                margin: 16px 16px 0 16px;
                .main-pic {
                    position: absolute;
                    left: 0;
                    top: 0;
                    border-radius: 8px;
                    box-shadow:0px 2px 10px 0px rgba(33,44,98,0.08);
                }
                .detail {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    z-index: 10;
                }
            }
        }
    }
</style>
