<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :showBorderBottom="true" :isNative="isNative" :pageOutStatus="isNative">
            <template slot="title">
                <div>热销爆款</div>
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
            :loading="loading"
            :listItems="hotProducts"
            :offset="loadOffset"
            :error="error"
            :finished="finished"
            v-if="hotProducts.length > 0"
        >
            <div class="product-list">
                <div class="product-item"
                     :class="[index % 2 === 1 ? 'vertical-divider': '', index > 1 ? 'horizontal-divider' : '']"
                     :style="getItemWidth()"
                     v-for="(item, index) in hotProducts" :key="index" @click="gotoDetail(item)">
                    <img class="product-image" :style="getImageRect()" :src="item.mainPic"/>
                    <span class="product-title">{{item.productName}}</span>
                    <div class="product-retail-price">
                        <span class="price-flag">¥</span><span class="price-number">{{parseFloat(item.retailPrice).toFixed(2)}}</span><span
                        class="tip_title">建议零售价</span>
                    </div>
                    <div class="product-special-price">
                        <span class="special-flag">¥</span><span class="special-number">{{parseFloat(item.tshPrice).toFixed(2)}}</span><img
                        :src="item.isCollect === 1 ? selectIcon : unselectIcon" @click.stop="doCollect(index, item)"/>
                    </div>
                </div>
            </div>
        </c-list>
        <empty-view emptyType="groupEmpty" :emptyDesc="emptyDesc" v-else/>
    </layout-view>

</template>

<script>
import utils from 'utils'
import EmptyView from '../error/emptyView'
export default {
    components: { EmptyView },
    data() {
        return {
            unselectIcon: require('../../themes/images/designer/icon_collect_def_16_16@2x.png'),
            selectIcon: require('../../themes/images/designer/icon_collect_sel_16_16@2x.png'),
            screenWidth: document.body.clientWidth,
            hotProducts: [],
            pageNumber: 1,
            pageSize: 10,
            loadOffset: 10,
            isNative: false,
            emptyDesc: '正在加载数据.....',
            finished: false, // 加载完标识
            loading: false, // 加载更多标识
            error: false // 加载错误标识
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
        gotoDetail(product) {
            const params = {
                jumpUrl: 'productDetail://',
                productCode: product.productCode
            }
            utils.postMessage('', params)
        },
        getHotSale() {
            const params = {
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }
            this.loading = true
            this.$api.goods.getHotSale(params).then(res => {
                this.loading = false
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
                console.log(this.hotProducts)
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
    mounted() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        console.log('screenWidth = ' + this.screenWidth)
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

                .product-image {
                    border-radius: 8px 8px 0 0;
                    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(249, 250, 252, 1) 100%);
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
                        font-size: 14px;
                        color: @color-rc;
                        margin-top: 4px;
                    }

                    .special-number {
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 20px;
                        flex-grow: 1;
                        font-family: alibabaBold;
                        color: @color-rc;
                    }

                    > img {
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }
    }
</style>
