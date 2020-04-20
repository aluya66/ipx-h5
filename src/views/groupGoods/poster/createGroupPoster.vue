<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative" :showBorderBottom='true'>
            <div slot="title">生成销售海报</div>
        </c-header>
        <div class="poster-contain" :style="getBottomOffset(49)">
            <title-content title="组货名称及描述" titleOffsetTop='0'>
                <template slot="content">
                    <div class="group-descContain">
                        <field
                            :class='["field-common","group-title"]'
                            placeholder="请输入组货名称"
                            clearable
                            maxlength="50"
                            :adjust-position='true'
                            v-model="posterData.groupTitle" />
                        <!-- <div class="descContain">
                             <field :class='["field-common","group-desc"]'
                                type="textarea"
                                placeholder="请输入组货描述"
                                v-model="groupDesc"
                                :adjust-position='true'
                                maxlength="200"
                            />
                            <p>{{groupDesc.length}}/200</p>
                        </div> -->
                    </div>
                </template>
            </title-content>

            <title-content title="组货及商品图片">
                <template slot="content">
                    <div class="product-list"
                    >
                        <div class="choose_skuImg" @click="changeSkuImage">
                            <img :src="choose_skuImg" alt="">
                            <p>选择组货商品</p>
                        </div>
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
                        <div v-if="selectPriceTitle==='单品调价'" class="price-suggest">
                            <div class="goodInfo-list" v-for="goodsInfo in posterData.products" :key="goodsInfo.productCode">
                                <img :src="goodsInfo.mainPic" alt="">
                                <div class="good-info">
                                    <p>{{goodsInfo.productName}}</p>
                                    <section :class='["flex-common","purchase-contain","good-totalPrice"]'>
                                        <p style="font-size:0.13rem">采货价:</p>
                                        <p>{{parseFloat(goodsInfo.tshPrice).toFixed(2)}}</p>
                                    </section>
                                    <section style="height:0.32rem"  :class='["flex-common","custom-add","good-posterPrice"]'>
                                        <p style="line-height:0.32rem;font-size:0.13rem">海报价:</p>
                                        <p class="price-symbol">¥</p>
                                        <div class="input-contain">
                                            <input-view class="price-input" :inputColorValue="'#F53030'" v-model="goodsInfo.showPrice" formart="digit"/>
                                            <!-- <field class="price-input" type="number" error :adjust-position='true' v-model="goodsInfo.retailPrice"/> -->

                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div v-else class="price-custom delete-field-line">

                            <section :class='["flex-common","purchase-contain"]'>
                                <p style="font-size:0.13rem">采货价:</p>
                                <p>{{parseFloat(posterData.totalPrice).toFixed(2)}}</p>
                            </section>
                            <section style="height:0.32rem"  :class='["flex-common","custom-add"]'>
                                <p class="price-custom-title" :style="isSuggest ? 'color: rgba(178,181,193,1)':'color: rgba(88,91,102,1)'">单品均加价:</p>
                                <div class="input-contain">
                                    <input-view class="price-input" v-model="customPricePercent" :disabledInput="isSuggest" formart="digit" :hiddenClear="true" />
                                    <p class="price-symbol" :style="isSuggest ? 'color: rgba(178,181,193,1)':'color: rgba(42,43,51,1)'">%</p>
                                </div>
                            </section>
                            <section :class='["flex-common","posterPrice-contain"]'>
                                <p>海报价:</p>
                                <p>{{isSuggest ? parseFloat(posterData.totalRetailPrice).toFixed(2) : posterPrice}}</p>
                            </section>

                            <section class="suggest-selected" :style="isSuggest ? 'background:rgba(235,238,255,1)' : 'background:rgba(249,250,252,1)' ">
                                <img class="suggest-select-icon" :src="isSuggest ? select_sel : select_def" alt="" @click="selectSuggest">
                                <p :style="isSuggest ? 'color: rgba(60,92,246,1);':'color: rgba(42,43,51,1);'" @click="selectSuggest">使用建议零售价</p>
                            </section>

                        </div>
                    </div>
                </template>
            </title-content>

            <title-content title="联系方式" subTitle="(选填)">
                <template slot="content">
                    <p class="phone-title">手机号码</p>
                    <div style="padding:0.12rem 0.16rem">
                        <field
                            :class='["field-common","group-title"]'
                            :adjust-position='true'
                            type="digit"
                            placeholder="请填写联系手机"
                            :clearable="true"
                            maxlength = 11
                            v-model="phone"
                        />
                    </div>
                    <div class="qrcode-content">
                        <p class="phone-title">微信二维码</p>
                        <div class="photo-choose" v-if="albumImg_url===''" @click="chooseQRCodeImg">
                            <img :src="choose_qrcode" alt="">
                        </div>
                        <img class="Album-selectd" v-else :src="albumImg_url" alt="" @click="chooseQRCodeImg">
                    </div>
                </template>
            </title-content>
            <p class="bottom-prompt">海报可以分享至微信好友、朋友圈</p>
        </div>
        <fixed-view class="footer-shadow" :style="getBottomOffset(60)">
            <template slot="footerContain">
                <div class="footer-view">
                    <section :class='["section-common","button-select"]' @click="handlePreviewPoster">立即生成海报</section>
                </div>
            </template>
        </fixed-view>

        <!-- <div class="popup-view" v-show="isPreview" >
            <img :src="deleteIcon" alt="" @click="handleClosePopup" >
            <popup-view ref="imageView" :isDownload='isSave' :isShowPopup="isPreview" :posterData="posterData" @close='handleClosePopup'/>
        </div> -->
    </layout-view>
</template>

<script>
import TitleContent from '../../common/titleContent.vue'
import { Field } from 'vant'
import FixedView from '../../common/bottomFixedView.vue'
import utils from 'utils'
// import PopupView from './groupPosterPopup'
import InputView from '../../common/inputView.vue'
export default {
    components: {
        TitleContent,
        Field,
        FixedView,
        InputView
        // PopupView
    },
    data() {
        return {
            deleteIcon: require('@/themes/images/app/control_delete@3x.png'),
            select_def: require('../../../themes/images/groupGoods/checkbox_default.png'),
            select_sel: require('../../../themes/images/groupGoods/selected_icon.png'),
            choose_qrcode: require('../../../themes/images/groupGoods/icon_choose_camera@3x.png'),
            choose_skuImg: require('@/themes/images/app/icon_posterImg_add@3x.png'),
            albumImg_url: '',
            groupTitle: '',
            groupDesc: '',
            groupImages: [1, 2],
            selectPriceTitle: '统一调价',
            priceMenu: ['统一调价', '单品调价'],
            customPricePercent: '0',
            singlePosterPrice: '0',
            phone: '',
            posterData: {},
            isPreview: false,
            mainImage: '',
            isSave: false,
            isNative: false,
            isSuggest: false
        }
    },
    watch: {
        customPricePercent(val) {
            this.customPricePercent = val
        }
        // singlePosterPrice(val) {
        // let price = parseFloat(this.posterData.totalRetailPrice).toFixed(2)
        //     let price = parseFloat(val).toFixed(2)
        //     this.singlePosterPrice = price
        // }
    },
    computed: {
        posterPrice() {
            let add = this.customPricePercent
            if (this.customPricePercent === '' || this.customPricePercent === '.') {
                add = '0'
            }
            // if (add === '0') {
            //     return parseFloat(this.posterData.totalPrice).toFixed(2)
            // }
            let p = parseFloat(this.posterData.totalPrice) * parseFloat(add || '0') / 100 + parseFloat(this.posterData.totalPrice)
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
        selectSuggest() { // 选中建议零售价
            this.isSuggest = !this.isSuggest
            if (this.isSuggest) {
                this.customPricePercent = ''
            } else {
                this.customPricePercent = '0'
            }
        },
        changeSkuImage() {
            this.$router.push({
                path: '/poster/eidtGroupProducts',
                query: {
                    groupCode: this.posterData.groupCode,
                    productList: this.posterData.products
                }
            })
        },
        chooseQRCodeImg() {
            const params = {
                jumpUrl: 'choosePhoto://'
            }
            utils.postMessage('', params)
            window.getAlbumPhoto = (imgData) => {
                this.albumImg_url = 'data:image/jpeg;base64,' + imgData
                this.posterData.albumImg_url = this.albumImg_url
            }
        },
        // 预览海报
        handlePreviewPoster() {
            if (this.posterData.groupTitle === '') {
                this.$toast('请输入组货名称')
            } else if (this.posterData.groupTitle.split(' ').join('').length === 0) {
                this.$toast('请重新输入组货名称')
            } else {
                this.posterData.phone = this.phone
                this.posterData.isSuggest = this.isSuggest
                this.posterData.percent = this.customPricePercent
                if (this.selectPriceTitle === '单品调价') {
                    this.posterData.isSinglePrice = true
                } else {
                    this.posterData.isSinglePrice = false
                }
                this.$router.push({
                    path: '/poster/previewGroupPoster',
                    query: { groupData: this.posterData }
                })
            }
        },
        handleClosePopup() {
            this.isPreview = false
            this.isSave = false
        },
        handleRequest() {
            let productCodes = JSON.parse(utils.getStore('groupProductCodes'))
            const params = {
                groupCode: this.$route.query.groupCode
            }
            // alert(productC odes)
            if (productCodes !== undefined) {
                params.productCodes = productCodes
            }
            this.$api.poster.getGroupPosterInfo(params).then(res => {
                if (res instanceof Object) {
                    this.posterData = res
                    this.groupDesc = this.posterData.groupDesc
                    this.posterData.customPricePercent = this.customPricePercent || '0'
                    if (this.posterData.labelDescs && this.posterData.labelDescs.length > 5) {
                        this.posterData.labelDescs = this.posterData.labelDescs.slice(0, 5)
                    }
                    this.posterData.albumImg_url = this.albumImg_url
                    this.posterData.phone = this.phone
                    this.posterData.isSuggest = this.isSuggest
                    this.posterData.percent = this.customPricePercent
                    this.posterData.isSinglePrice = false
                    this.posterData.products = this.posterData.products.map(item => {
                        return {
                            ...item,
                            showPrice: parseFloat(item.retailPrice).toFixed(2)
                        }
                    })
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
        let baseParams = utils.getStore('baseParams')
        this.phone = baseParams.phoneNumber
        this.handleRequest()
    },
    destroyed() {
        window.onresize = null
    },
    mounted() {
        let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi) || false
        if (!isIos) {
            window.onresize = () => {
                if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                    window.setTimeout(function() {
                        if ('scrollIntoView' in document.activeElement) {
                            document.activeElement.scrollIntoView()
                        } else {
                            document.activeElement.scrollIntoViewIfNeeded()
                        }
                    }, 0)
                }
            }
        }
    }

}
</script>

<style lang='less'>
.group-descContain {
    .van-cell:not(:last-child)::after {
        display:none !important;
    }
}
.group-title {
    .van-cell {
        padding: 0 16px;
    }
    .van-field__body {
        height: 100%;
    }
}
.descContain{
    .van-field__body {
        font-size:14px !important;
        font-weight:400 !important;
        color: @color-c1;
    }
    .van-field__body textarea{
        font-size:14px !important;
        font-weight:400 !important;
        color: @color-c1;
        min-height: 84px;
    }
    .van-cell {
        height: 84px;
        padding: 0 16px !important;
    }
}
// .input-contain {
//     .van-field__body input{
//         font-size:14px !important;
//         font-weight:400 !important;
//         color: @color-c1;
//         min-height: 24px !important;
//     }
//     .van-field__body {
//         height: 24px !important;
//     }
//     .van-cell {
//         height: 32px !important;
//         line-height: 32px !important;
//         padding: 4px 16px !important;
//     }
// }
.delete-field-line {
    .van-cell:not(:last-child)::after {
        display:none !important;
    }
}
</style>

<style lang='less' scoped>
.popup-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img {
        position: absolute;
        right: 26px;
        top: 5px;
        width: 32px;
        height: 32px;
        object-fit: fill;
        z-index: 9999;
    }
}
.poster-contain {
    overflow: auto;
    height: 100%;
    .field-common {
        background:rgba(249,250,252,1);
        border-radius:8px;
        width: calc(100vw - 32px);
    }
    .descContain {
        background:rgba(249,250,252,1);
        margin-top: 16px;
        padding: 10px 0 0;
        p {
            text-align: right;
            height:34px;
            font-size:12px;
            font-weight:400;
            color:rgba(178,181,193,1);
            line-height:34px;
            margin-right: 16px;
        }
    }
    .group-descContain {
        padding:16px 16px 0;
        .group-title {
            // margin: 12px 16px 0;
            height: 40px;
            font-size:14px ;
            font-weight:400;
            color:@color-c1;
            border-radius: 8px;
        }
        .group-desc {
            font-size:14px;
            font-weight:400;
            color:@color-c1;
            height: 84px;
            border-radius: 8px;
        }
    }
    .product-list::-webkit-scrollbar {
        display:none
    }
    .product-list {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: flex-start;
        padding: 16px 16px 16px 4px;
        margin: 12px 16px 0;
        background:@color-c8;
        border-radius:12px;
        overflow: scroll;
        // width: 100%;
        .choose_skuImg {
            flex-shrink: 0;
            text-align: center;
            background: white;
            width: 74px;
            height: 74px;
            margin-left: 16px;
            border-radius:4px;
            > img {
                height: 26px;
                width: 26px;
                margin-top: 16px;
            }
            > p {
                margin-top: 6px;
                font-size:10px;
                font-weight:400;
                color:rgba(138,140,153,1);
                line-height:14px;
            }
        }
        .choose_skuImg:active {
            background: black;
            opacity: 0.3;
        }
        .image-item {
            flex-shrink: 0;
            display: block;
            width: 74px;//calc(28.57vw - 19.43px);
            height: 74px;//calc(28.57vw - 19.43px);
            margin-left: 12px;
            object-fit: cover;
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
            font-family:PingFangSC-Medium,PingFang SC;
            height: 28px;
            line-height: 26px;
            position: relative;
            font-size:12px;
            font-weight:bold;
            color: @color-ec3;
            background:#EBEEFF;
            border-radius:16px;
            border:1px solid @color-ec3;
            padding: 0 16px;
        }
        .price-unSelect {
            font-family:PingFangSC-Medium,PingFang SC;
            padding: 0 16px;
            height: 28px;
            line-height: 26px;
            position: relative;
            font-size:12px;
            font-weight:bold;
            color:@color-c1;
            background: @color-c7;
            border-radius:16px;
            border:1px solid @color-c7;
        }
        .price-suggest {
            margin: 6px 16px;
            border:1px solid rgba(244,245,247,1);
            padding: 16px;
            border-radius: 5px;
            .goodInfo-list {
                margin-bottom: 24px;
                display: flex;
                > img {
                    flex-shrink: 0;
                    width:106px;
                    height:106px;
                    border-radius:4px;
                    border:1px solid rgba(244,245,247,1);
                    background: @color-c8;
                }
                .good-info {
                    margin-left: 12px;
                    height:106px;
                    width: calc(100vw - 182px);
                    > p {
                        font-size:16px;
                        font-weight:bold;
                        color: @color-c1;
                        line-height:22px;
                    }
                    .good-totalPrice {
                        margin-top: 28px;
                        > p {
                            &:nth-child(2) {
                                margin-left: 12px;
                            }
                        }
                    }
                    .good-posterPrice {
                        margin-top: 5px;
                        margin-bottom: 0;
                        .input-contain {
                            margin-right: 0;
                            margin-left: 9px;
                        }
                        .price-symbol {
                            margin-left: 12px;
                            color: @color-rc;
                        }
                    }
                }
            }
        }
        .price-custom {
            border:1px solid rgba(244,245,247,1);
            border-radius: 5px;
            margin: 6px 16px 0;
            padding: 4px 0 14px 16px;
            .posterPrice-contain {
                display: flex;
                flex-direction: row;
                align-items: center;
                p {
                    font-size:13px;
                    font-weight:400;
                    color:@color-c2;
                    &:nth-child(2) {
                        font-size:16px;
                        font-weight:400;
                        color:@color-rc;
                        margin-left: 46px;
                        position: relative;
                        font-family: "alibabaBold";
                        &::before {
                            content: '¥ ';
                            font-family: "alibabaRegular";
                            width: 20px;
                            font-weight:400;
                            line-height: 40px;
                            font-size: 12px;
                            position: relative;
                        }
                    }
                    &:nth-child(3) {
                        margin-left: 12px;
                        font-size:12px;
                        font-weight:bold;
                        color:@color-c3;
                        height: 16px;
                        line-height: 14px;
                        background:rgba(244,245,247,1);
                        padding: 1px 4px;
                        border-top-left-radius: 0;
                        border-top-right-radius: 3px;
                        border-bottom-right-radius: 3px;
                        border-bottom-left-radius: 3px;
                    }
                }
            }
            .suggest-selected {
                display: flex;
                width:120px;
                height:32px;
                background:rgba(249,250,252,1);
                border-radius:8px;
                align-items: center;
                margin: auto;
                margin-top: 8px;
                > img {
                    width: 16px;
                    height: 16px;
                    margin-left: 8px;
                }
                > p {
                    font-size:12px;
                    font-weight:bold;
                    color: @color-c1;
                    margin-left: 4px;
                    line-height: 16px;
                }
            }
        }
        .flex-common {
                display: flex;
                flex-direction: row;
                align-content: flex-start;
                width: 100%;
                height: 19px;
                text-align: center;
                line-height: 14px;
                margin-top: 12px;
        }
        .purchase-contain {
                font-weight:400;
                color:@color-c2;
                font-size:13px;
                p {
                    &:nth-child(2) {
                        margin-left: 46px;
                        color:@color-c1;
                        font-family: "alibabaBold";
                        font-size:16px;
                        &::before {
                                content: '¥ ';
                                width: 20px;
                                font-weight:400;
                                line-height: 14px;
                                font-size: 12px;
                                position: relative;
                                font-family: "alibabaRegular";
                            }
                    }
                }
        }
        .custom-add {
            .price-custom-title {
                    line-height: 16px;
                    font-size:13px;
                    font-weight:400;
                    color:@color-c2;
                    line-height: 32px;
                    // flex: 1 0
            }
            .input-contain {
                    flex: 1 1;
                    margin-right: 16px;
                    background: rgba(249,250,252,1);
                    border-radius: 5px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    margin-left: 20px;
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
                width: 90%;
                margin-left: 8px;
                margin-right: 8px;
                height: 32px;
                background:rgba(249,250,252,1);
                font-size:14px;
                color:rgba(42,43,51,1);
                border-radius: 8px;
                font-weight:bold;
            }
            .price-symbol {
                    font-size:12px;
                    font-weight:400;
                    color:@color-c1;
                    line-height:32px;
                    margin-left: 4px;
            }
        }

    }
    .phone-title {
        font-size:13px;
        font-weight:bold;
        color: @color-c1;
        margin: 12px 16px 0;
    }
    .qrcode-content {
        margin-top: -8px;
        .photo-choose {
            margin: 13px 16px 32px;
            width:109px;
            height:109px;
            background:rgba(249,250,252,1);
            border-radius:8px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .Album-selectd {
            margin: 13px 16px 32px;
            border-radius: 8px;
            height: 250px;
            width: 188px;
            object-fit: cover;
            // height: calc(100vw - 32px);
            // width: calc(100vw - 32px);
        }
    }
    .bottom-prompt {
        height: 40px;
        font-size:12px;
        font-weight:400;
        color: @color-c3;
        line-height:40px;
        text-align: center;
    }
}
.footer-shadow {
    // box-shadow:0px -1px 6px 0px rgba(33,44,98,0.06);
    border-radius:12px 12px 0px 0px;
}
.footer-view {
        margin: 5px 20px 0;
        width: calc(100vw - 40px);
        // display: flex;
        // flex-direction: row;
        // justify-content :space-between;
        .section-common {
            font-size:16px;
            font-weight:bold;
            line-height:22px;
        }
        // .button-default {
        //     .btn-select-default(calc(50vw - 31.5px),40px,false);
        // }
        .button-select {
            .btn-select(calc(100vw - 40px),50px,true);
        }
        .button-select:active {
            background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(91, 64, 204, 1) 100%);
        }
    }
</style>
