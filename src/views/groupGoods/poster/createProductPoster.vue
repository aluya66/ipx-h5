<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative" :showBorderBottom='true'>
            <div slot="title">生成销售海报</div>
        </c-header>
        <div class="poster-contain" :style="getBottomOffset(49)">
            <title-content title="商品名称">
                <template slot="content">
                    <div class="group-descContain">
                        <field :class='["field-common","group-title"]' maxlength="50" placeholder="请输入商品名称" :clearable="true" v-model="posterData.productName" />
                    </div>
                </template>
            </title-content>

            <title-content title="商品图片">
                <template slot="content">
                    <div class="product-list"
                    >
                        <img v-for="(sku,index) in posterData.colorTypeList" :key="index" class="image-item" :src="sku.image">
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
                                <p style="font-size:0.13rem" >采货价:</p>
                                <p>{{posterData.tshPrice}}</p>
                            </section>
                            <section :class='["flex-common","posterPrice-contain"]'>
                                <p style="font-size:0.13rem">海报价:</p>
                                <p>{{posterData.retailPrice}}</p>
                                <p>建议零售价</p>
                            </section>
                        </div>
                        <div v-else class="price-custom">
                            <section :class='["flex-common","purchase-contain"]'>
                                <p style="font-size:0.13rem">采货价:</p>
                                <p>{{posterData.tshPrice}}</p>
                            </section>
                            <section style="height:0.32rem"  :class='["flex-common","custom-add"]'>
                                <p style="line-height:0.32rem;font-size:0.13rem">加价:</p>
                                <p class="price-symbol">¥</p>

                                <div class="input-contain">
                                    <input-view class="price-input" v-model="addPrice" formart="digit"/>
                                    <!-- <field class="price-input" formart="digit" :adjust-position='true' @input="clearNoNum" v-model="addPrice"/> -->
                                </div>
                            </section>
                            <section :class='["flex-common","posterPrice-contain"]'>
                                <p>海报价:</p>
                                <p>{{posterPrice}}</p>
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
            <popup-view ref="imageView" :isDownload='isSave' :isShowPopup="isPreview" :posterData="posterData" @close='handleClosePopup' />
        </div> -->
    </layout-view>
</template>

<script>
import TitleContent from '../../common/titleContent.vue'
import { Field } from 'vant'
import FixedView from '../../common/bottomFixedView.vue'
import utils from 'utils'
// import PopupView from './productPosterPopup.vue'
import InputView from '../../common/inputView.vue'

export default {
    components: {
        TitleContent,
        Field,
        FixedView,
        // PopupView,
        InputView
    },
    data() {
        return {
            deleteIcon: require('@/themes/images/app/control_delete@3x.png'),
            choose_qrcode: require('../../../themes/images/groupGoods/icon_choose_camera@3x.png'),
            albumImg_url: '',
            purchasePrice: '100.00',
            poseterPrice: '200.00',
            groupTitle: '',
            groupDesc: '',
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
    watch: {
        addPrice(val) {
            let p = val.toFixed(2)
            this.addPrice = p
        }
    },
    computed: {
        posterPrice() {
            let add = this.addPrice
            if (this.addPrice === '' || this.addPrice === '.') {
                add = '0'
            }
            let p = parseFloat(this.posterData.tshPrice) + parseFloat(add || '0')
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
            if (this.posterData.productName.length <= 0) {
                this.$toast('请输入商品名称')
            } else if (this.posterData.productName.split(' ').join('').length === 0) {
                this.$toast('请重新输入商品名称')
            } else {
                if (this.selectPriceTitle === '建议零售价') {
                    this.posterData.showPrice = this.posterData.retailPrice
                } else {
                    this.posterData.showPrice = this.posterPrice
                }
                this.posterData.phone = this.phone
                this.$router.push({
                    path: '/poster/previewProductPoster',
                    query: { productData: this.posterData }
                })
            }
        },
        handleClosePopup() {
            this.isPreview = false
            this.isSave = false
        },
        handleRequest() {
            let skuLsit = this.$route.query.skuCodeList
            if (skuLsit[0].skuCodes === undefined) {
                return
            }
            let skuCodes = []
            skuLsit.forEach(item => {
                skuCodes = skuCodes.concat(item.skuCodes)
            })
            const params = {
                productCode: this.$route.query.productCode,
                skuCodes: skuCodes
            }
            this.$api.poster.getProductPosterInfo(params).then(res => {
                let baseParams = utils.getStore('baseParams')
                this.phone = baseParams.phoneNumber
                if (res instanceof Object) {
                    this.posterData = res
                    this.posterData.gapPrice = parseFloat(this.posterData.gapPrice).toFixed(2)
                    this.posterData.tshPrice = parseFloat(this.posterData.tshPrice).toFixed(2)
                    this.posterData.retailPrice = parseFloat(this.posterData.retailPrice).toFixed(2)
                    this.posterData.albumImg_url = this.albumImg_url
                    this.posterData.phone = this.phone
                    this.posterData.showPrice = this.posterPrice
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
    // destroyed() {
    //     window.onresize = null
    // },
    // mounted() {
    //     let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi) || false
    //     if (!isIos) {
    //         window.onresize = () => {
    //             if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
    //                 window.setTimeout(function() {
    //                     if ('scrollIntoView' in document.activeElement) {
    //                         document.activeElement.scrollIntoView()
    //                     } else {
    //                         document.activeElement.scrollIntoViewIfNeeded()
    //                     }
    //                 }, 0)
    //             }
    //         }
    //     }
    // }
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
        font-weight: bold !important;
        color: @color-c1;
    }
}
</style>

<style lang='less' scoped>
.phone-input {
    height: 40px;
    font-size:14px ;
    font-weight:bold;
    color:@color-c1;
    background:rgba(249,250,252,1);
    border-radius:8px;
    width: calc(100vw - 32px);
}
.footer-shadow {
    // box-shadow:0px -1px 6px 0px rgba(33,44,98,0.06);
    border-radius:12px 12px 0px 0px;
}
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
        z-index: 99999;
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
    .group-descContain {
        padding:12px 16px 0;
        .group-title {
            // margin: 12px 16px 0;
            height: 40px;
            font-size:14px ;
            font-weight: bold;
            color:@color-c1;
        }
        .group-desc {
            font-size:14px;
            font-weight:bold;
            color:@color-c1;
            margin-top: 10px;
        }
    }
    .product-list::-webkit-scrollbar {
        display:none
    }
    .product-list {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 16px 16px 16px 4px;
        margin: 12px 16px 0;
        background:@color-c8;
        border-radius:12px;
        overflow: scroll;
        .image-item {
            display: block;
            background:rgba(255,255,255,1);
            width: 74px; //calc(28.57vw - 19.43px);
            height: 74px; // calc(28.57vw - 19.43px);
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
            font-weight: bold;
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
            font-weight: bold;
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
            height: 19px;
            text-align: center;
            line-height: 14px;
            margin-top: 12px;
        }
        .purchase-contain {
            font-weight:400;
            color:@color-c2;
            p {
                &:nth-child(2) {
                    margin-left: 20px;
                    font-family: "alibabaBold";
                    font-size:16px;
                    color:@color-c1;
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
                    margin-left: 20px;
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
                    font-weight: bold;
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
        .price-suggest {
            margin: 6px 16px;
            font-size:12px;
            font-weight:400;
            color:@color-c1;
            line-height:16px;
            border:1px solid rgba(244,245,247,1);
            padding-left: 16px;
            padding-top: 4px;
            padding-bottom: 14px;
            border-radius: 8px;
        }
        .price-custom {
            margin: 6px 16px 0;
            padding-top: 4px;
            padding-bottom: 14px;
            font-size:12px;
            border:1px solid rgba(244,245,247,1);
            padding-left: 16px;
            border-radius: 8px;
            .custom-add {
                P {
                    &:nth-child(1) {
                        font-size:13px;
                        font-weight:400;
                        color:@color-c2;
                        text-align: left
                    }
                    &:nth-child(2) {
                        font-size:12px;
                        color:@color-c1;
                        font-family: "alibabaRegular";
                    }
                }
                .input-contain {
                    flex: 1 1;
                    margin-right: 16px;
                    height: 32px;
                    background:rgba(244,245,247,1);
                    position: relative;
                    margin-left: 8px;
                    border-radius:8px;
                }
                .clear-icon {
                    position: absolute;
                    top: 6px;
                    z-index: 999999;
                    right: 12px;
                }
                .price-input {
                    outline: 0;
                    height: 32px;
                    font-size:16px;
                    font-weight: bold;
                    font-family: "alibabaBold";
                    color:rgba(42,43,51,1);
                    background:rgba(244,245,247,1);
                    border-radius:8px;
                    margin-left: 8px;
                }
                .price-symbol {
                    font-size:12px;
                    font-weight:400;
                    color:@color-c1;
                    line-height:32px;
                    margin-left: 33px;
                }
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
            height: 250px;
            width: 188px;
            object-fit: cover;
            // width: calc(100vw - 32px);
            border-radius: 8px;
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
.footer-view {
        margin: 5px 20px;
        // display: flex;
        width: calc(100vw - 40px);
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
    }
</style>
