<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative">
            <div slot="title">生成销售海报</div>
        </c-header>
        <div class="poster-contain" :style="getBottomOffset(49)">
            <title-content title="商品名称">
                <template slot="content">
                    <div class="group-descContain">
                        <field :class='["field-common","group-title"]' maxlength="50" placeholder="请输入商品名称" clearable v-model="posterData.productName" />
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
                            </section>
                        </div>
                        <div v-if="selectPriceTitle==='建议零售价'" class="price-suggest">
                            <section :class='["flex-common","purchase-contain"]'>
                                <p>采货价</p>
                                <p>{{posterData.tshPrice}}</p>
                            </section>
                            <section :class='["flex-common","posterPrice-contain"]'>
                                <p>海报价格</p>
                                <p>{{posterData.retailPrice}}</p>
                                <p>建议零售价</p>
                            </section>
                        </div>
                        <div v-else class="price-custom">
                            <section :class='["flex-common","purchase-contain"]'>
                                <p>采货价</p>
                                <p>{{posterData.tshPrice}}</p>
                            </section>
                            <section :class='["flex-common","custom-add"]'>
                                <p>加价</p>
                                <p class="price-symbol">¥</p>
                                <field
                                    class="price-input"
                                    v-model="addPrice"
                                    οnkeyup="this.value=this.value.replace(/[^\-?\d.]/g,'')"
                                />
                            </section>
                            <section :class='["flex-common","posterPrice-contain"]'>
                                <p>海报价格</p>
                                <p>{{posterPrice}}</p>
                            </section>
                        </div>
                    </div>
                </template>
            </title-content>

            <title-content title="联系手机" subTitle="(选填)">
                <template slot="content">
                    <div style="padding:0.12rem 0.16rem">
                        <field :class='["field-common","group-title"]' type="digit" placeholder="请填写联系手机" clearable v-model="phone" />
                    </div>
                </template>
            </title-content>
            <p class="bottom-prompt">海报可以分享至微信好友、朋友圈</p>
        </div>
        <fixed-view>
            <template slot="footerContain">
                <div class="footer-view">
                    <section :class='["section-common","button-default"]' @click="handlePreviewPoster">预览海报</section>
                    <section :class='["section-common","button-select"]' @click="handleCreatePoster">保存海报</section>
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
            phone: '',
            isPreview: false,
            isSave: false,
            posterData: {},
            addPrice: '0',
            isNative: false
        }
    },
    computed: {
        posterPrice() {
            let add = this.addPrice
            if (this.addPrice === '') {
                add = '0'
            }
            let p = parseFloat(this.posterData.retailPrice) + parseFloat(add || '0')
            let p2 = p.toFixed(2)
            return p2
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleChoosePriceTitle(title) {
            this.selectPriceTitle = title
        },
        // 预览海报
        handlePreviewPoster() {
            if (this.posterData.productName.length <= 0) {
                this.$toast('请输入组货名称')
            } else {
                this.posterData.phone = this.phone
                this.isPreview = true
                this.isSave = false
                if (this.selectPriceTitle === '建议零售价') {
                    this.posterData.addPrice = '0'
                } else {
                    this.posterData.addPrice = this.addPrice
                }
            }
        },
        handleClosePopup() {
            this.isPreview = false
            this.isSave = false
        },

        // 生成海报
        handleCreatePoster() {
            if (this.posterData.productName.length <= 0) {
                this.$toast('请输入组货名称')
            } else {
                this.posterData.phone = this.phone
                this.isPreview = true
                this.isSave = true
                if (this.selectPriceTitle === '建议零售价') {
                    this.posterData.addPrice = '0'
                } else {
                    this.posterData.addPrice = this.addPrice
                }
            }
        },
        handleRequest() {
            const params = {
                productCode: this.$route.query.productCode
            }
            this.$api.poster.getProductPosterInfo(params).then(res => {
                let baseParams = utils.getStore('baseParams')
                this.phone = baseParams.phoneNumber
                if (res instanceof Object) {
                    this.posterData = res
                    this.posterData.addPrice = this.addPrice
                    this.posterData.addPrice = '0'
                    this.posterData.gapPrice = parseFloat(this.posterData.gapPrice).toFixed(2)
                    this.posterData.retailPrice = parseFloat(this.posterData.retailPrice).toFixed(2)
                } else {
                    // this.$toast('返回数据错误')
                }
            }).catch(() => {
                // this.$toast('请求错误')
            })
        }
    },
    activated() {
        this.isPreview = false
        this.isSave = false
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
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
        font-size:14px !important;
        font-weight:400 !important;
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
        padding:12px 16px 0;
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
            margin: 12px 16px 0;
            height: 40px;
            line-height: 40px;
            text-align: center;
            display: flex;
            flex-direction: row;
            align-content: flex-start;
            border-radius:4px;
            section {
                &:nth-child(2) {
                    margin-left: 12px;
                }
            }
        }
        .price-select {
            height: 28px;
            line-height: 26px;
            position: relative;
            font-size:14px;
            font-weight:500;
            color: @color-ec3;
            background:#EBEEFF;
            border-radius:16px;
            border:1px solid @color-ec3;
            padding: 0 16px;
        }
        .price-unSelect {
            padding: 0 16px;
            height: 28px;
            line-height: 26px;
            position: relative;
            font-size:14px;
            font-weight:500;
            color:@color-c1;
            background: @color-c7;
            border-radius:16px;
            border:1px solid @color-c7;
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
            font-weight:400;
            color:@color-c1;
            p:last-child {
                margin-left: 24px;
                font-family: "alibabaBold";
                font-size:16px;
                &::before {
                        content: '¥ ';
                        width: 20px;
                        font-weight:600;
                        line-height: 40px;
                        font-size: 12px;
                        position: relative;
                        font-family: "alibabaRegular";
                    }
            }
        }
        .posterPrice-contain {
            display: flex;
            flex-direction: row;
            align-items: center;
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
                    font-family: "alibabaBold";
                    &::before {
                        content: '¥ ';
                        font-family: "alibabaRegular";
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
                    height: 16px;
                    line-height: 16px;
                    background:rgba(244,245,247,1);
                    padding: 1px 4px;
                    border-top-left-radius: 0;
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                    border-bottom-left-radius: 3px;
                }
            }
        }
        .price-suggest {
            margin: 6px 16px;
            font-size:12px;
            font-weight:400;
            color:@color-c1;
            line-height:16px;
            border: 1px solid #E1E2E6;
            padding-left: 16px;
            border-radius: 5px;
        }
        .price-custom {
            margin: 6px 16px 0;
            font-size:12px;
            border: 1px solid #E1E2E6;
            padding-left: 16px;
            border-radius: 5px;
            .custom-add {
                P {
                    &:nth-child(1) {
                        font-size:12px;
                        font-weight:400;
                        color:@color-c1;
                        width: 48px;
                        text-align: left
                    }
                    &:nth-child(2) {
                        font-size:12px;
                        font-family: "alibabaRegular";
                    }
                }
                .price-input {
                    width: 180px;
                    height: 40px;
                    background:rgba(249,250,252,1);
                    font-size:16px;
                    font-weight:500;
                    font-family: "alibabaBold";
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
        color: @color-c3;
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
