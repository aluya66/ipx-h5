<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative">
            <div slot="title">生成销售海报</div>
        </c-header>
        <div class="poster-contain" :style="getBottomOffset(49)">
            <title-content title="组货名称及描述">
                <template slot="content">
                    <div class="group-descContain">
                        <field
                            :class='["field-common","group-title"]'
                            placeholder="请输入组货名称"
                            clearable
                            maxlength="50"
                            :adjust-position='true'
                            v-model="posterData.groupTitle" />
                        <div class="descContain">
                             <field :class='["field-common","group-desc"]'
                                autosize
                                type="textarea"
                                placeholder="请输入组货描述"
                                v-model="groupDesc"
                                :adjust-position='true'
                                maxlength="200"
                            />
                            <p>{{groupDesc.length}}/200</p>
                        </div>
                    </div>
                </template>
            </title-content>

            <title-content title="组货及商品图片">
                <template slot="content">
                    <div class="product-list"
                    >
                        <img v-for="imageUrl in posterData.theGroupImgs" :key="imageUrl" class="image-item" :src="imageUrl">
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
                        <p v-if="selectPriceTitle==='建议零售价'" class="price-suggest">各商品均按建议零售价显示(预览查看)</p>
                        <div v-else class="price-custom delete-field-line">
                            <p class="price-custom-title">各单品均加价(预览查看)</p>
                            <div class="input-contain">
                                <field class="price-input" type="digit" :adjust-position='true' v-model="customPricePercent"/>
                                <p class="price-symbol">%</p>
                            </div>

                        </div>
                    </div>
                </template>
            </title-content>

            <title-content title="联系手机" subTitle="(选填)">
                <template slot="content">
                    <div style="padding:0.12rem 0.16rem">
                        <field
                            :class='["field-common","group-title"]'
                            :adjust-position='true'
                            type="digit"
                            placeholder="请填写联系手机"
                            clearable
                            v-model="phone"
                        />
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

        <popup-view ref="imageView" :isDownload='isSave' :isShowPopup="isPreview" :posterData="posterData" @close='handleClosePopup'/>
    </layout-view>
</template>

<script>
import TitleContent from '../../common/titleContent.vue'
import { Field } from 'vant'
import FixedView from '../../common/bottomFixedView.vue'
import utils from 'utils'
import PopupView from './groupPosterPopup'

export default {
    components: {
        TitleContent,
        Field,
        FixedView,
        PopupView
    },
    data() {
        return {
            groupTitle: '',
            groupDesc: '',
            groupImages: [1, 2],
            selectPriceTitle: '自主定价',
            priceMenu: ['自主定价', '建议零售价'],
            customPricePercent: '0',
            phone: '',
            posterData: {},
            isPreview: false,
            mainImage: '',
            isSave: false,
            isNative: false
        }
    },
    watch: {
        customPricePercent(val) {
            this.customPricePercent = val
            if (parseInt(val) > 999) {
                this.customPricePercent = '999'
            }
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
            if (this.posterData.groupTitle === '') {
                this.$toast('请输入组货名称')
            } else if (this.posterData.groupTitle.split(' ').join('').length === 0) {
                this.$toast('请重新输入组货名称')
            } else if (this.groupDesc.split(' ').join('').length === 0) {
                this.$toast('请重新输入组货描述')
            } else if (this.groupDesc === '') {
                this.$toast('请输入组货描述')
            } else {
                this.isPreview = true
                this.isSave = false
                this.posterData.groupDesc = this.groupDesc
                this.posterData.phone = this.phone
                if (this.selectPriceTitle === '建议零售价') {
                    this.posterData.customPricePercent = '0'
                    this.posterData.isRetail = true
                } else {
                    this.posterData.isRetail = false
                    this.posterData.customPricePercent = this.customPricePercent || '0'
                }
            }
        },
        handleClosePopup() {
            this.isPreview = false
            this.isSave = false
        },

        // 生成海报
        handleCreatePoster() {
            if (this.posterData.groupTitle === '') {
                this.$toast('请输入组货名称')
            } else if (this.posterData.groupTitle.split(' ').join('').length === 0) {
                this.$toast('请重新输入组货名称')
            } else if (this.groupDesc.split(' ').join('').length === 0) {
                this.$toast('请重新输入组货描述')
            } else if (this.groupDesc === '') {
                this.$toast('请输入组货描述')
            } else {
                this.isPreview = true
                this.isSave = true
                this.posterData.groupDesc = this.groupDesc
                this.posterData.phone = this.phone
                if (this.selectPriceTitle === '建议零售价') {
                    this.posterData.customPricePercent = '0'
                    this.posterData.isRetail = true
                } else {
                    this.posterData.isRetail = false
                    this.posterData.customPricePercent = this.customPricePercent || '0'
                }
            }
        },
        handleRequest() {
            let productCodes = JSON.parse(utils.getStore('groupProductCodes'))
            const params = {
                groupCode: this.$route.query.groupCode,
                productCodes: productCodes
            }
            this.$api.poster.getGroupPosterInfo(params).then(res => {
                let baseParams = utils.getStore('baseParams')
                this.phone = baseParams.phoneNumber
                if (res instanceof Object) {
                    this.posterData = res
                    this.groupDesc = this.posterData.groupDesc
                    this.posterData.customPricePercent = this.customPricePercent || '0'
                }
            }).catch(() => {

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
    },
    created() {
        let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi) || false
        if (!isIos) {
            window.addEventListener('resize', function() {
                if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                    window.setTimeout(function() {
                        if ('scrollIntoView' in document.activeElement) {
                            document.activeElement.scrollIntoView()
                        } else {
                            document.activeElement.scrollIntoViewIfNeeded()
                        }
                    }, 0)
                }
            })
        }
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
        font-size:14px !important;
        font-weight:400 !important;
        color: @color-c1;
    }
}
.delete-field-line {
    .van-cell:not(:last-child)::after {
        display:none !important;
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
    .descContain {
        background:rgba(249,250,252,1);
        padding-bottom: 10px;
        p {
            text-align: right;
            height:16px;
            font-size:12px;
            font-weight:400;
            color:rgba(178,181,193,1);
            line-height:16px;
            margin-right: 16px;
        }
    }
    .group-descContain {
        padding:12px 16px 0;
        .group-title {
            // margin: 12px 16px 0;
            height: 40px;
            font-size:14px ;
            font-weight:400;
            color:@color-c1;
        }
        .group-desc {
            font-size:14px;
            font-weight:400;
            color:@color-c1;
            margin-top: 10px;
        }
    }
    .product-list {
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        padding: 16px 16px 16px 4px;
        margin-top: 12px;
        background:@color-c8;
        overflow: scroll;
        width: 100%;
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
        .price-suggest {
            margin: 6px 16px;
            font-size:12px;
            font-weight:400;
            color:@color-c2;
            line-height:50px;
            height: 50px;
            border: 1px solid #E1E2E6;
            padding-left: 16px;
            border-radius: 5px;
        }
        .price-custom {
            display: flex;
            flex-direction: row;
            align-content: flex-start;
            border: 1px solid #E1E2E6;
            border-radius: 5px;
            height: 60px;
            align-items: center;
            margin: 6px 16px 0;
            padding-left: 16px;
            .price-custom-title {
                line-height: 16px;
                font-size:12px;
                font-weight:400;
                color:@color-c2;
                line-height: 40px;
            }
            .input-contain {
                background:rgba(249,250,252,1);
                border-radius: 5px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                margin-left: 16px;
                p {
                    padding-right: 8px;
                    height:14px;
                    font-size:12px;
                    font-weight:400;
                    color:rgba(42,43,51,1);
                    line-height:14px;
                }
            }
            .price-input {
                width: 68px;
                height: 40px;
                background:rgba(249,250,252,1);
                font-size:14px;
                color:rgba(42,43,51,1);
                border-radius: 5px;
                font-weight:bold;
            }
            .price-symbol {
                font-size:12px;
                font-weight:400;
                color:@color-c1;
                line-height:40px;
                margin-left: 4px;
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
