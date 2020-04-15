<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :showBorderBottom="true" :isNative="isNative" :pageOutStatus="isNative">
            <template slot="title">
                <div>直播爆款</div>
            </template>
            <!--康悦说去掉搜索-->
            <!--<template slot="right">
                <img class="header-right" slot="right"
                     src="../../themes/images/groupGoods/header_search.png" @click="rightClick()"/>
            </template>-->
        </c-header>
        <c-list
            ref="productList"
            class="function-list"
            @load-data="handleMore"
            @on-refresh="handleRefresh"
            :showEmpty="isShowEmpty"
            :loading="loading"
            :listItems="hotProducts"
            :offset="loadOffset"
            :immediate-check="immediateCheck"
            :error="error"
            :finished="finished"
        >
            <div class="product-list">
                <div class="product-item"
                     :class="[index % 2 === 1 ? 'vertical-divider': '', index > 1 ? 'horizontal-divider' : '']"
                     :style="getItemWidth()"
                     v-for="(item, index) in hotProducts" :key="index" @click="gotoDetail(item, index)">
                    <div class="product-image-con" :style="getImageRect()">
                        <img class="product-image" :style="getImageRect()" :src="item.mainPic"/>
                        <img class="product-collect" :src="parseInt(item.isCollect) === 1 ? selectIcon : unselectIcon" @click.stop="doCollect(index, item)"/>
                    </div>
                    <span class="product-title">{{item.productName}}</span>
                    <div class="product-retail-price">
                        <span class="price-flag">¥</span><span class="price-number">{{parseFloat(item.retailPrice).toFixed(2)}}</span>
                        <span class="tip_title">建议零售价</span>
                    </div>
                    <div class="product-special-price">
                        <span class="special-flag">¥</span><span class="special-number">{{getHidePrice(item.tshPrice)}}</span>
                        <span class="label" v-if="isHide === 0">入驻可得拿货价</span>
                    </div>
                </div>
            </div>
        </c-list>
        <LoadingView class="loadding_content" v-show="!showLoading"/>
    </layout-view>

</template>

<script>
import utils from 'utils'
import LoadingView from '../error/loaddingView'
export default {
    components: {
        LoadingView
    },
    data() {
        return {
            unselectIcon: require('../../themes/images/designer/icon_collect_def_16_16@2x.png'),
            selectIcon: require('../../themes/images/designer/icon_collect_sel_16_16@2x.png'),
            screenWidth: document.body.clientWidth,
            hotProducts: [],
            pageNumber: 1,
            pageSize: 10,
            selectIndex: -1,
            isShowEmpty: false,
            loadOffset: 10,
            isNative: false,
            immediateCheck: false,
            finished: false, // 加载完标识
            loading: false, // 加载更多标识
            error: false, // 加载错误标识
            isHide: utils.getStore('baseParams').isHide,
            showLoading: true
        }
    },
    methods: {
        getItemWidth() {
            let width = parseInt((this.screenWidth - 42 * window.devicePixelRatio) / 2)
            return `width:${width}px`
        },
        getImageRect() {
            let width = parseInt((this.screenWidth - 42 * window.devicePixelRatio) / 2)
            return `width:${width}px;height:${width}px`
        },
        getHidePrice(price) {
            let isHide = utils.getStore('baseParams').isHide
            return utils.hidePrice(price, isHide)
        },
        gotoDetail(product, index) {
            this.selectIndex = index
            console.log('点击：' + product.productCode)
            const params = {
                jumpUrl: 'productDetail://',
                productCode: product.productCode
            }
            utils.postMessage('', params)
            window.refreshCollect = (productCode, isCollect) => {
                console.log('回调：' + productCode + ', ' + isCollect)
                this.hotProducts[this.selectIndex].isCollect = isCollect
                console.log(this.hotProducts)
                // this.hotProducts.forEach(product => {
                //     if (product.productCode === productCode) {
                //         product.isCollect = isCollect
                //     }
                // })
            }
        },
        getHotSale() {
            const params = {
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }
            this.loading = true
            this.$api.goods.getHotSale(params).then(res => {
                this.finished = false
                if (res && res instanceof Array) {
                    if (this.pageNumber === 1) {
                        this.hotProducts = res
                    } else {
                        this.hotProducts = this.hotProducts.concat(res)
                    }
                    this.finished = res.length < this.pageSize
                } else {
                    this.finished = true
                }
                this.loading = false
                this.isShowEmpty = this.hotProducts.length <= 0
                this.showLoading = false
            }).catch(error => {
                console.log(error)
                this.error = true
            })
        },
        handleRefresh() {
            this.pageNumber = 1
            this.getHotGroup()
        },
        handleMore() {
            if (!this.isFinished) {
                this.pageNumber++
                this.getHotSale()
            }
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
                    this.hotProducts[index].isCollect = params.isCollect
                    this.hotProducts[index].collectCount++
                    console.log(this.hotProducts)
                })
            } else {
                this.$api.designer.postUnCollectSample(params).then(res => {
                    this.hotProducts[index].isCollect = params.isCollect
                    this.hotProducts[index].collectCount--
                    console.log(this.hotProducts)
                })
            }
        },
        rightClick() {
            const params = {
                jumpUrl: 'homeProductSearch://'
            }
            utils.postMessage('', params)
        }
    },
    activated() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        // Toast.loading({
        //     message: '加载中...',
        //     forbidClick: true
        // })
        this.getHotSale()
    }
}
</script>

<style lang="less" scoped>

    .header-right {
        display: inline-block;
        vertical-align: middle;
        width: 26px;
        height: 26px;
    }

    .vertical-divider {
        margin-left: 10px;
    }

    .horizontal-divider {
        margin-top: 10px;
    }

    .function-list {
        height: calc(100vh - 60px);

        .product-list {
            width: 100%;
            height: 100%;
            padding: 16px;
            overflow: scroll;
            display: flex;
            flex-wrap: wrap;

            .product-item {
                background: rgba(255, 255, 255, 1);
                box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.08);
                border-radius: 8px;
                display: flex;
                flex-direction: column;

                .product-image-con {
                    position: relative;
                    .product-image {
                        position: absolute;
                        left: 0;
                        top: 0;
                        border-radius: 8px 8px 0 0;
                        background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(249, 250, 252, 1) 100%);
                    }
                    .product-collect {
                        width: 16px;
                        height: 16px;
                        position: absolute;
                        top: 12px;
                        right: 12px;
                    }
                }

                .product-title {
                    font-size: 13px;
                    color: @color-c1;
                    margin: 12px;
                    line-height: 18px;
                }

                .product-retail-price {
                    padding: 0 12px;

                    .price-flag {
                        font-size: 12px;
                        color: @color-c1;
                    }

                    .price-number {
                        font-weight: bold;
                        font-size: 14px;
                        font-family: alibabaBold;
                        line-height: 14px;
                        color: @color-c1;
                    }

                    .tip_title {
                        font-size: 10px;
                        font-weight: 500;
                        color: @color-c3;
                        line-height: 12px;
                        background: rgba(244, 245, 247, 1);
                        margin-left: 4px;
                        padding: 2px;
                        border-radius: 0px 4px 4px 4px;
                    }
                }

                .product-special-price {
                    padding: 4px 12px 12px 12px;
                    display: flex;
                    align-items: center;
                    flex-direction: row;

                    .special-flag {
                        font-size: 12px;
                        color: @color-rc;
                        margin-top: 4px;
                    }

                    .special-number {
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 20px;
                        font-family: alibabaBold;
                        color: @color-rc;
                    }

                    .label {
                        padding: 1px 2px;
                        height:14px;
                        background:rgba(255,235,237,1);
                        border-radius: 0 4px 4px 4px;
                        font-size: 10px;
                        font-weight: bold;
                        line-height: 14px;
                        margin-left: 8px;
                        color: @color-rc;
                    }
                }
            }
        }
    }
    .loadding_content {
        position: relative;
        left: 0;
        top: 0;
        height: 60%;
        width: 100%;
    }
</style>
