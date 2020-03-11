<template>
    <div class="samples-container" :style="getBackgroundUrl()">
        <div class="samples-main">
            <designer-info class="samples-designer" :designer="designer" />
        </div>
        <div class="samples-list">
            <div class="samples-tabs">
                <div class="tab" :class="{'tab-select': sortBy === 1 || sortBy === 2}" @click="switchSortBy(1)">
                    销售
                </div>
                <div class="tab" :class="{'tab-select': sortBy === 3}" @click="switchSortBy(2)">
                    最新
                </div>
                <div class="tab" :class="{'tab-select': sortBy === 4 || sortBy === 5}" @click="switchSortBy(3)">
                    价格<img />
                </div>
            </div>
            <div class="all-cloth">
                <div class="cloth-item" v-for="(item, index) in products" :key="index" :class="[index % 2 === 0 ? 'item-left' : 'item-right']" :style="getPictureRect()">
                    <img class="main-pic" :src="item.mainPic" :style="getPictureRect()"/>
                    <span class="cloth-title">{{item.productName}}</span>
                    <div class="cloth-data">
                        <span class="price">¥{{item.defaultMinPrice}}</span>
                        <div class="collect" @click="doCollect(index, item)"><img :src="item.isCollect === 1 ? selectIcon : unselectIcon"/><span><!--{{item.collectCount}}--></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DesignerInfo from './designerInfo.vue'
export default {
    components: {
        DesignerInfo
    },
    data() {
        return {
            products: [],
            designer: {
                backgroundUrl: ''
            },
            sortBy: 1, // 排序类型 1销量高到低 2销量低到高 3最新 4价格高到低 5价格低到高
            designerId: '0',
            unselectIcon: require('../../themes/images/designer/icon_collect_def_16_16@2x.png'),
            selectIcon: require('../../themes/images/designer/icon_collect_sel_16_16@2x.png')
        }
    },
    methods: {
        switchSortBy(index) {
            switch (index) {
            case 1:
                if (this.sortBy === 1) { this.sortBy = 2 } else { this.sortBy = 1 }
                break
            case 2:
                this.sortBy = 3
                break
            case 3:
                if (this.sortBy === 4) { this.sortBy = 5 } else { this.sortBy = 4 }
                break
            }
        },
        getBackgroundUrl() {
            return `background-image:url(${this.designer.backgroundUrl})`
        },
        getDesignerHall() {
            const params = {
                designerId: this.designerId
            }
            this.$api.designer.getDesignerHall(params).then(res => {
                this.designer = res
                console.log(this.designer)
            })
        },
        getDesignerSamples() {
            const params = {
                designerId: this.designerId
            }
            this.$api.designer.getDesignerSamples(params).then(res => {
                this.products = res
                console.log(this.products)
            })
        },
        getPictureRect() {
            // `padding-bottom:${y}px !important`
            let width = (document.body.clientWidth - 40 * window.devicePixelRatio) / 2
            return `width:${width}px`
        },
        doCollect(index, item) {
            const params = {
                productCode: item.productCode,
                productPrice: item.tshPrice,
                shopId: item.shopId,
                isCollect: item.isCollect === 1 ? 2 : 1,
                productName: item.productName
            }
            if (params.isCollect === 1) {
                this.$api.designer.postCollectSample(params).then(res => {
                    this.products[index].isCollect = params.isCollect
                    this.products[index].collectCount++
                })
            } else {
                this.$api.designer.postUnCollectSample(params).then(res => {
                    this.products[index].isCollect = params.isCollect
                    this.products[index].collectCount--
                })
            }
        }
    },
    mounted() {
        if (this.$route.query.designerId !== undefined) {
            this.designerId = this.$route.query.designerId
            this.getDesignerHall()
            this.getDesignerSamples()
        }
    }
}
</script>

<style lang="less" scoped>
    .samples-container {
        position: relative;
        height: calc(100vh);
        background-repeat: no-repeat;
        background-attachment: fixed;

        .samples-main {
            z-index: 2;
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            .samples-designer {
                margin-top: 136px;
            }
        }
        .samples-list {
            background: white;
            padding-top: 100px;
            width: 100%;
            position: absolute;
            left: 0;
            top: 232px;
            .samples-tabs {
                height: 44px;
                width: 100%;
                display: flex;
                flex-direction: row;
                background: white;
                box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.08);
                margin-top: 8px;
                .tab {
                    line-height: 44px;
                    text-align: center;
                    flex-grow: 1;
                    font-weight: bold;
                    font-size: 14px;
                    color: @color-c1;
                }
                .tab-select {
                    color: @color-ec;
                }
            }
            .all-cloth {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                width: 100%;
                overflow-x: hidden;
                .cloth-item {
                    margin-top: 8px;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 2px 10px 0px rgba(33,44,98,0.08);
                    border-radius:8px;
                    display: flex;
                    flex-direction: column;
                    .main-pic {
                        height:224px;
                        background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.6) 100%);
                        border-radius:8px 8px 0px 0px;
                        opacity:0.6;
                    }
                    .cloth-title {
                        margin: 8px 12px 4px 12px;
                        font-size: 12px;
                        color: @color-c1;
                    }
                    .cloth-data {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 12px;
                        margin-bottom: 12px;
                        margin-top: 4px;
                        .price {
                            color: @color-c1;
                            font-size: 14px;
                            font-weight: bold;
                        }
                        .collect {
                            display: flex;
                            align-items: center;
                        }
                        img {
                            width: 16px;
                            height: 16px;
                            margin-right: 2px;
                        }
                    }
                }

                .item-left {
                    margin-left: 16px;
                }

                .item-right {
                    margin-right: 16px;
                    margin-left: 8px;
                }
            }
        }

    }
</style>
