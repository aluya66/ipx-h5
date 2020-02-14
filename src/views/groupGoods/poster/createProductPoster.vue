<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true">
            <div slot="title">生成销售海报</div>
        </c-header>
        <div class="poster-contain" :style="getBottomOffset(49)">
            <title-content title="商品名称">
                <template slot="content">
                    <div class="group-descContain">
                        <field :class='["field-common","group-title"]' placeholder="请输入商品名称" clearable v-model="posterData.productName" />
                    </div>
                </template>
            </title-content>

            <title-content title="商品图片">
                <template slot="content">
                    <div class="product-list"
                    >
                        <img v-for="imageUrl in posterData.imgs" :key="imageUrl" class="image-item" :src="imageUrl">
                    </div>
                </template>
            </title-content>

            <title-content title="价格显示" subTitle="顾客将在海报上看到你设置的价格">
                <template slot="content">
                    <div class="price-contain">
                        <div class="price-menu">
                            <section :class='[menuTitle === selectPriceTitle?"price-select":"price-unSelect"]'  v-for="menuTitle in priceMenu" :key="menuTitle" @click="handleChoosePriceTitle(menuTitle)">
                                {{menuTitle}}
                                <div class="price-line" v-show="menuTitle === selectPriceTitle"></div>
                            </section>
                        </div>
                        <div v-if="selectPriceTitle==='建议零售价'" class="price-suggest">
                            <section :class='["flex-common","purchase-contain"]'>
                                <p>采货价</p>
                                <p>{{posterData.gapPrice}}</p>
                            </section>
                            <section :class='["flex-common","posterPrice-contain"]'>
                                <p>海报价格</p>
                                <p>{{posterData.retailPrice}}</p>
                                <p>(建议零售价)</p>
                            </section>
                        </div>
                        <div v-else class="price-custom">
                            <section :class='["flex-common","purchase-contain"]'>
                                <p>采货价</p>
                                <p>{{posterData.gapPrice}}</p>
                            </section>
                            <section :class='["flex-common","custom-add"]'>
                                <p>加价</p>
                                <p class="price-symbol">¥</p>
                                <field class="price-input" v-model="addPrice" />
                            </section>
                            <section :class='["flex-common","posterPrice-contain"]'>
                                <p>海报价格</p>
                                <p>{{posterData.retailPrice}}</p>
                            </section>
                        </div>
                    </div>
                </template>
            </title-content>

            <title-content title="联系手机(选填)">
                <template slot="content">
                    <div style="padding:0.12rem 0.16rem">
                        <field :class='["field-common","group-title"]' placeholder="请填写联系手机" clearable v-model="phone" />
                    </div>
                </template>
            </title-content>
            <p class="bottom-prompt">海报可以分享至微信好友、朋友圈</p>
        </div>
        <fixed-view>
            <template slot="footerContain">
                <div class="footer-view">
                    <section :class='["section-common","button-default"]' @click="handlePreviewPoster">预览海报</section>
                    <section :class='["section-common","button-select"]' @click="handleCreatePoster">生成海报</section>
                </div>
            </template>
        </fixed-view>
        <popup-view ref="imageView" :isDownload='isSave' :isShowPopup="isPreview" :posterData="posterData" @close='handleClosePopup' />
    </layout-view>
</template>

<script>
import TitleContent from '../../common/titleContent.vue'
import { Field } from 'vant'
import FixedView from '../../common/bottomFixedView.vue'
import utils from 'utils'
import PopupView from './productPosterPopup.vue'

export default {
    components: {
        TitleContent,
        Field,
        FixedView,
        PopupView
    },
    data() {
        return {
            purchasePrice: '100.00',
            poseterPrice: '200.00',
            groupTitle: '百变街头日常穿搭',
            groupDesc: '绿色卫衣简约休闲营造随意氛围\n镭射材质别具魅力隐约彰显出街头的个性\n即便只用简单的黑色也能搭配出别样的质感造型',
            groupImages: [],
            selectPriceTitle: '自主定价',
            priceMenu: ['自主定价', '建议零售价'],
            customPrice: '',
            phone: '1111',
            isPreview: false,
            isSave: false,
            posterData: {},
            addPrice: '0'
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleChoosePriceTitle(title) {
            if (title === '建议零售价') {
                this.posterData.addPrice = '0'
            } else {
                this.posterData.addPrice = this.addPrice
            }
            this.selectPriceTitle = title
        },
        // 预览海报
        handlePreviewPoster() {
            this.posterData.phone = this.phone
            this.posterData.addPrice = this.addPrice
            this.isPreview = true
            this.isSave = false
        },
        handleClosePopup() {
            this.isPreview = false
            this.isSave = false
        },

        // 生成海报
        handleCreatePoster() {
            this.posterData.phone = this.phone
            this.posterData.addPrice = this.addPrice
            this.isPreview = true
            this.isSave = true
        },
        handleRequest() {
            const params = {
                productCode: this.$route.query.productCode
            }
            this.$api.poster.getProductPosterInfo(params).then(res => {
                // let baseParams = utils.getStore('baseParams')
                if (res instanceof Object) {
                    this.posterData = res
                    this.posterData.addPrice = '0'
                }
            }).catch(() => {

            })
        }
    },
    activated() {
        this.handleRequest()
    }
}
</script>

<style lang='less'>
.group-descContain {
    .van-cell:not(:last-child)::after {
        display:none !important;
    }
    .van-field__body {
        font-family:PingFangSC-Medium,PingFang SC;
        font-size:14px !important;
        font-weight:600 !important;
        color: @color-c1;
    }
    .van-field__body textarea{
        font-family:PingFangSC-Medium,PingFang SC;
        font-size:9px !important;
        font-weight:500 !important;
        color: @color-c1;
    }
}
</style>

<style lang='less' scoped>
.poster-contain {
    overflow: auto;
    height: 100%;
    .field-common {
        background:rgba(249,250,252,1);
        border-radius:4px;
        width: calc(100vw - 32px);
    }
    .group-descContain {
        padding:12px 16px;
        .group-title {
            // margin: 12px 16px 0;
            height: 40px;
            font-size:14px ;
            font-weight:500;
            color:@color-c1;
        }
        .group-desc {
            font-size:14px;
            font-weight:500;
            color:@color-c1;
            margin-top: 10px;
        }
    }
    .product-list {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 16px 16px 16px 4px;
        margin-top: 12px;
        margin-bottom: 16px;
        background:@color-c8;
        overflow: scroll;
        .image-item {
            width: 74px;
            height: 74px;
            margin-left: 12px;
            object-fit: contain;
            border-radius:4px;
        }
    }
    .price-contain {
        .price-menu {
            margin: 11px 16px 0;
            height: 40px;
            line-height: 40px;
            text-align: center;
            display: flex;
            flex-direction: row;
            align-content: flex-start;
        }
        .price-select {
            flex: 1;
            position: relative;
            font-size:14px;
            font-weight:500;
            color:@color-ec;
        }
        .price-unSelect {
            flex: 1;
            position: relative;
            font-size:14px;
            font-weight:500;
            color:@color-c3;
        }
        .price-line {
            position:absolute;
            bottom: 0;
            width:24px;
            height:2px;
            background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
            border-radius:1px;
            left: 50%;
            transform: translateX(-50%)
        }
        .flex-common {
            display: flex;
            flex-direction: row;
            align-content: flex-start;
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
        }
        .purchase-contain {
            font-size:12px;
            font-weight:400;
            color:@color-c1;
            p:last-child {
                margin-left: 24px;
            }
        }
        .posterPrice-contain {
            p {
                font-size:12px;
                font-weight:400;
                color:@color-c1;
                &:nth-child(2) {
                    font-size:22px;
                    font-weight:500;
                    color:#F41F1F;
                    margin-left: 12px;
                    position: relative;
                    &::before {
                        content: '¥';
                        width: 20px;
                        font-weight:600;
                        line-height: 40px;
                        font-size: 12px;
                        position: relative;
                    }
                }
                &:nth-child(3) {
                    margin-left: 12px;
                    font-size:12px;
                    font-weight:400;
                    color:@color-c3;
                }
            }
        }
        .price-suggest {
            margin: 16px 16px;
            font-size:12px;
            font-weight:400;
            color:@color-c1;
            line-height:16px;
        }
        .price-custom {
            margin: 16px 16px 0;
            font-size:12px;
            .custom-add {
                P {
                    &:nth-child(1) {
                        font-size:12px;
                        font-weight:400;
                        color:@color-c1;
                        width: 48px;
                        text-align: left
                    }
                }
                .price-input {
                    width: 180px;
                    height: 40px;
                    background:rgba(249,250,252,1);
                    font-size:14px;
                    font-weight:500;
                    color:rgba(42,43,51,1);
                    margin-left: 12px;
                }
                .price-symbol {
                    font-size:12px;
                    font-weight:400;
                    color:@color-c1;
                    line-height:40px;
                    margin-left: 12px;
                }
            }
        }
    }
    .bottom-prompt {
        height: 40px;
        font-size:10px;
        font-weight:400;
        color: @color-ec;
        line-height:40px;
        text-align: center;
    }
}
.footer-view {
        margin: 5px 24px 0;
        display: flex;
        width: calc(100vw - 48px);
        flex-direction: row;
        justify-content :space-between;
        .section-common {
            font-size:14px;
            font-weight:500;
            line-height:20px;
        }
        .button-default {
            .btn-select-default(calc(50vw - 31.5px),40px,false);
        }
        .button-select {
            .btn-select(calc(50vw - 31.5px),40px,true);
        }
    }
</style>
