<template>
    <layout-view :style="headerAlpha === 0 ? getBackgroundUrl() : handleAdjustHeaderBg()">
        <c-header slot="header" :left-arrow="true" :showBorderBottom='headerAlpha !== 0'
                  :isLight="false"
                  :pageOutStatus="true"
                  :style="getHeaderBg()">
        </c-header>
        <div class="samples-container">
            <div class="fixed-tabs" v-if="isFixedCondition">
                <div class="tab" :class="{'tab-select': sortBy === 1 || sortBy === 2}" @click="switchSortBy(1)">
                    销售
                </div>
                <div class="tab" :class="{'tab-select': sortBy === 3}" @click="switchSortBy(2)">
                    最新
                </div>
                <div class="tab" :class="{'tab-select': sortBy === 4 || sortBy === 5}" @click="switchSortBy(3)">
                    价格<img :src="sortBy === 4 ? priceIconDown : (sortBy === 5 ? priceIconUp : priceIconDef)"/>
                </div>
            </div>
            <div class="samples-list">
                <div class="samples-main">
                    <designer-info class="samples-designer" :designer="designer" />
                </div>
                <div class="samples-tabs">
                    <div class="tab" :class="{'tab-select': sortBy === 1 || sortBy === 2}" @click="switchSortBy(1)">
                        销售
                    </div>
                    <div class="tab" :class="{'tab-select': sortBy === 3}" @click="switchSortBy(2)">
                        最新
                    </div>
                    <div class="tab" :class="{'tab-select': sortBy === 4 || sortBy === 5}" @click="switchSortBy(3)">
                        价格<img :src="sortBy === 4 ? priceIconDown : (sortBy === 5 ? priceIconUp : priceIconDef)"/>
                    </div>
                </div>
                <div class="all-cloth">
                    <div class="cloth-item" v-for="(item, index) in products" :key="index" :class="[index % 2 === 0 ? 'item-left' : 'item-right']"
                         :style="getPictureRect()" @click="go2Detail(item)">
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
    </layout-view>
</template>

<script>
import DesignerInfo from './designerInfo.vue'
import utils from '../../utils'
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
            selectIcon: require('../../themes/images/designer/icon_collect_sel_16_16@2x.png'),
            priceIconDef: require('../../themes/images/designer/control_drop_down_def.png'),
            priceIconUp: require('../../themes/images/designer/control_drop_up_blue.png'),
            priceIconDown: require('../../themes/images/designer/control_drop_down_blue.png'),
            headerAlpha: 0,
            isFixedCondition: false,
            conditionTop: 0,
            itemWidth: 166
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
            this.getDesignerSamples()
        },
        getBackgroundUrl() {
            return `background-image:url(${this.designer.backgroundUrl});background-size:100% ;background-repeat:no-repeat`
        },
        handleAdjustHeaderBg() {
            let w = window.screen.width
            let h = w * 476 / 375 / 100
            if (this.headerAlpha > 0) {
                h = 0
            }
            return `background-size:100% ${h}rem;margin-bottom:0`
        },
        getHeaderBg() {
            return `background:rgba(255,255,255,${this.headerAlpha});margin-bottom:0`
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
                pageSize: 10,
                pageNo: 1,
                shopId: this.designer.shopId,
                sortType: this.sortBy
            }
            this.$api.designer.getDesignerSamples(params).then(res => {
                this.products = res
                console.log(this.products)
            })
        },
        getPictureRect() {
            this.itemWidth = parseInt((document.documentElement.clientWidth - 40 * window.devicePixelRatio) / 2)
            console.log(document.body.clientWidth + ', ' + window.devicePixelRatio + ', ' + this.itemWidth)
            return `width:${this.itemWidth}px`
        },
        go2Detail(item) {
            const params = {
                jumpUrl: 'productDetail://',
                productCode: item.productCode
            }
            utils.postMessage('', params)
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
        },
        handleScroll() {
            window.addEventListener(
                'scroll',
                () => {
                    let scrollTop = document.querySelector('.samples-container') && document.querySelector('.samples-container').scrollTop
                    if (scrollTop >= 60 * window.devicePixelRatio) {
                        this.headerAlpha = 1
                    } else {
                        this.headerAlpha = 0
                    }
                    this.isFixedCondition = scrollTop >= 244 * window.devicePixelRatio
                },
                true
            )
        },
        fixedConditionContainer() {
            return `position:fixed;left:0;top:${this.conditionTop}px;z-index:2;`
        }
    },
    mounted() {
        this.handleScroll()
        if (this.$route.query.designerId !== undefined) {
            this.designerId = this.$route.query.designerId
            this.getDesignerHall()
            this.getDesignerSamples()
        }
    },
    activated() {
        let baseParams = utils.getStore('baseParams')
        let statusBarHeight = Number(baseParams.statusBarHeight) / 100

        if (baseParams.platform === 'ios') {
            if (Number(baseParams.statusBarHeight) > 20) {
                this.conditionTop = (Number(statusBarHeight) + 44) * window.devicePixelRatio
                // this.paddingBottom = '0.34rem'
            } else {
                this.conditionTop = (statusBarHeight + 44) * window.devicePixelRatio
            }
        } else {
            this.conditionTop = (statusBarHeight + 44) * window.devicePixelRatio
        }
    }
}
</script>

<style lang="less" scoped>
    .header-bg {
        background: transparent;
    }
    .fixed-tabs {
        position: fixed;
        left: 0;
        height: 44px;
        width: 100%;
        display: flex;
        margin-top: -1px;
        z-index: 2;
        flex-direction: row;
        background: white;
        .tab {
            line-height: 44px;
            text-align: center;
            flex-grow: 1;
            font-weight: bold;
            font-size: 14px;
            color: @color-c1;
            >img {
                width: 16px;
                height: 16px;
                display: inline-block;
                vertical-align: middle;
            }
        }
        .tab-select {
            color: @color-ec;
        }
    }
    .samples-container {
        position: relative;
        height: 100%;
        overflow: scroll;
        background-repeat: no-repeat;
        background-attachment: fixed;

        .samples-header {
            width: 100%;
            position: fixed;
            z-index: 1;
            >img {
                width: 26px;
                height: 26px;
                margin-left: 16px;
            }
        }
        .samples-main {
            width: 100%;
            margin-top: -94px;
            /*.samples-designer {*/
            /*    margin-top: 136px;*/
            /*}*/
        }
        .samples-list {
            background: white;
            width: 100%;
            position: absolute;
            display: flex;
            flex-direction: column;
            left: 0;
            top: 142px;
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
                    >img {
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                        vertical-align: middle;
                    }
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
                padding-bottom: 16px;
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
