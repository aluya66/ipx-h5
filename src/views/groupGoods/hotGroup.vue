<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :showBorderBottom="true" :pageOutStatus="isNative">
            <div slot="title" class="hot-title">门店热采组货</div>
        </c-header>
        <div class="group-list">
            <c-list
                class="report-list"
                @load-data="handleMore"
                :loading="loading"
                :listItems="hotGroups"
                @on-refresh="handleRefresh"
                :error="error"
                :finished="finished"
            >
                <div class="group-item" v-for="(item, index) in hotGroups" :key="index" :style="getImageRect()" @click="gotoHotPurchase(item.exampleCode)">
                    <img class="main-pic" :src="item.exampleMainPic" :style="getImageRect()"/>
                    <img class="detail" src="../../themes/images/groupGoods/btn_detail.png"/>
                </div>
            </c-list>
        </div>
    </layout-view>
</template>

<script>
import CList from 'components/c-list'
import utils from 'utils'
import { Toast } from 'vant'
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
            isNative: false,
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
                Toast.clear(true)
                this.loading = false
                if (res && res instanceof Array) {
                    if (this.pageNumber === 1) {
                        this.hotGroups = res
                    } else {
                        this.hotGroups = this.hotGroups.concat(res)
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
        gotoHotPurchase(exampleCode) {
            // this.$router.push({
            //     path: '/groupDetail',
            //     query: {
            //         groupCode: groupCode
            //     }
            // })
            const params = {
                jumpUrl: 'hotPurchase://',
                exampleCode: exampleCode
            }
            utils.postMessage('', params)
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
    },
    created() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true
        })
    },
    activated() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
    }
}
</script>

<style lang="less" scoped>
    .hot-title {
        font-weight: bold;
    }
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
                }
                .detail {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    z-index: 10;
                    width: 50px;
                    height: 32px;
                }
            }
        }
    }
</style>
