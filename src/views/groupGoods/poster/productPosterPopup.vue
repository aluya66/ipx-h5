<template>
    <popup-view class="productPopup-contain" :show="isShow" :safeArea='true' @close='handleClose'>
        <div class="contain-view" ref="image">
            <div class="header-info">
                <p class="group-name">{{posterData.productName}}</p>
                <p class="group-code">款号:{{posterData.productAtrNumber}}</p>
                <p class="product-price">{{productRealPrice()}}</p>
                <p class="hot-line" v-if="posterData.phone !== ''" >抢购热线：{{posterData.phone}}</p>
            </div>

            <div class="buyer-contain" v-if="posterData.importantDesc.length > 0" >
                <div class="product-desc">
                    <section></section>
                    <div class="desc-info">
                        <img :src="leftIcon" alt="">
                        <img :src="rightIcon" alt="">
                        <p>{{posterData.importantDesc}}</p>
                    </div>
                </div>
                <div class="buyer">
                    <img :src="posterData.designer && posterData.designer.avatar ? posterData.designer.avatar : '' " alt="">
                    <P class="buyer-name">{{posterData.designer && posterData.designer.nickname ? posterData.designer.nickname : ''}}</P>
                    <P class="buyer-job">买手</P>
                </div>
            </div>
            <div class="list-contain">
                <div class="product-list">
                    <div class="product-item" v-for="item in posterData.imgs" :key='item'>
                        <img :src="item" alt="">
                    </div>
                </div>
            </div>
        </div>
    </popup-view>
</template>

<script>

import { Toast } from 'vant'
import utils from 'utils'
import html2canvas from 'html2canvas'
import PopupView from '../../common/popupView.vue'

export default {
    components: {
        PopupView
    },
    props: {
        isShowPopup: {
            type: Boolean,
            default: false
        },
        posterData: {
            type: Object,
            default() {
                return {}
            }
        },
        isDownload: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShow: false,
            deleteIcon: require('@/themes/images/app/control_delete@3x.png'),
            leftIcon: require('@/themes/images/app/icon_semicolon_1@3x.png'),
            rightIcon: require('@/themes/images/app/icon_semicolon_2@3x.png'),
            imgUrl: ''
        }
    },
    watch: {
        isShowPopup(val) {
            this.isShow = val
        },
        isDownload(val) {
            if (val) {
                this.handleDown()
            }
        }
    },
    methods: {
        productRealPrice() {
            let price = 0
            if (this.posterData.isRetail) {
                price = parseFloat(this.posterData.retailPrice) + parseFloat(this.posterData.addPrice)
            } else {
                price = parseFloat(this.posterData.tshPrice) + parseFloat(this.posterData.addPrice)
            }
            return price.toFixed(2)
        },
        handleDown() {
            let _this = this
            Toast.loading({
                message: '生成海报...',
                forbidClick: true,
                duration: 0
            })
            setTimeout(() => {
                let img = _this.$refs['image']
                let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi) || false
                html2canvas(img, {
                    useCORS: true, // 允许图片跨域
                    allowTaint: false,
                    scale: isIos ? 1 : 0.6, // 设置像素比 越大越清晰 但是iOS可能无法渲染
                    taintTest: true,
                    dpi: window.devicePixelRatio
                }).then(function(canvas) {
                    _this.photoUrl = canvas.toDataURL()
                    _this.downloadIamge(_this.photoUrl, 'poster.png')
                })
            }, 3000)
        },
        downloadIamge(imgsrc, name) {
            var image = new Image()
            var canvas = document.createElement('canvas')
            var context = canvas.getContext('2d')
            // 解决跨域 Canvas 污染问题
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = imgsrc
            image.style.objectFit = 'contain'
            image.onload = function() {
                canvas.width = image.width
                canvas.height = image.height
                context.drawImage(image, 0, 0, image.width, image.height)
                // 得到图片的base64编码数据
                var url = canvas.toDataURL('image/png')
                let deleteString = 'data:image/png;base64,'
                var index = url.indexOf(deleteString)
                if (index === 0) {
                    let url2 = url.slice(deleteString.length)
                    utils.postMessage('save_image', url2)
                    Toast.clear()
                } else {
                    this.$toast('保存失败请重试')
                }
            }
            image.src = imgsrc
        },
        handleClose() {
            this.$emit('close')
        },
        handlePopupSize() {
            let width = (window.screen.width - 32) / 100
            let baseparams = utils.getStore('baseParams')
            let top = 64
            let bottom = 50
            if (baseparams.isIphoneX) {
                top = 88
                bottom = 84
            }
            let height = (window.screen.height - top - bottom) / 100
            return `width:${width}rem;height:${height}rem`
        }
    }

}
</script>

<style lang='less'>
.group-desc-cell {
    .van-cell:not(:last-child)::after {
        display:none !important;
    }
    .van-cell {
        width:auto;
        background:#F9FAFC;
    }
}
</style>
<style lang="less" scoped>
.productPopup-contain::-webkit-scrollbar {
    display:none
}
.productPopup-contain {
    border-radius:12px;
    .contain-view {
        width: 100%;
        padding-top: 16px;
    }
    .header-info {
        // background:rgba(249,250,252,1);
        padding-bottom: 26px;
    }
    .group-name {
        font-family:PingFangSC-Medium,PingFang SC;
        font-size:16px;
        font-weight:500;
        color:@color-c1;
        line-height:22px;
        margin: 0px 10px 0;
        word-break:break-word;
    }
    .group-code {
        height:16px;
        font-size:12px;
        font-weight:400;
        color:@color-c3;
        line-height:16px;
        margin: 10px 10px 0;
    }
    .product-price {
        height:30px;
        font-size:22px;
        font-weight:600;
        color:rgba(244,31,31,1);
        line-height:20px;
        margin: 2px 10px 0;
        &::before {
            content: '¥';
            width: 20px;
            font-weight:600;
            line-height: 40px;
            font-size: 12px;
            position: relative;
        }
    }
    .hot-line {
        font-family:PingFangSC-Medium,PingFang SC;
        height:22px;
        font-size:16px;
        font-weight:500;
        color:@color-c1;
        line-height:22px;
        margin: 12px 10px 0px
    }
    .buyer-contain {
        position: relative;
        margin: 10px 10px 0;
    }
    .product-desc {
        margin: 22px 0 0 22px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background:rgba(249,250,252,1);
        min-height: 124px;
        border-radius:4px;

        section {
            width: 91px;
        }
        .desc-info {
            position: relative;
            flex: 1;
            img {
                position: absolute;
                width: 16px;
                height: 16px;
                &:nth-child(1) {
                    left: -3px;
                    top: 4px;
                }
                &:nth-child(2) {
                    right: 7px;
                    bottom: 4px;
                }
            }
            p {
                font-size:12px;
                font-weight:400;
                color:@color-c1;
                line-height:18px;
                margin: 0px 10px 0px 15px;
                // height: 100%;
                // text-align: center;
                position: absolute;
                top: 50%;
                transform: translateY(-50%)
            }
        }
    }
    .buyer {
        position: absolute;
        left: 0px;
        top: -10px;
        width: 99px;
        height: 124px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background:rgba(244,245,247,1);
        border-radius:4px;
        img {
            width: 42px;
            height: 42px;
            margin-top: 5px;
            border-radius: 21px;
        }
        .buyer-name {
            height:18px;
            font-size:13px;
            font-weight:500;
            color:@color-c1;
            line-height:18px;
            margin-top: 12px;
        }
        .buyer-job {
            height:16px;
            font-size:12px;
            font-weight:400;
            color:@color-c3;
            line-height:16px;
            margin-top: 4px;
        }
    }
    .list-contain {
        .product-header {
            height: 40px;
            margin: 20px 0 0;
            text-align: center;
            position:relative;
            p {
                height:28px;
                font-size:20px;
                font-weight:600;
                color:@color-c1;
                line-height:28px;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
            }
        }
        .product-list {
            margin: 6px 0;
            .product-item {
                img {
                    width: 100%;
                    // height: 106px;
                    // margin-left: 16px;
                    // margin-top: 16px;
                    // margin-bottom: 16px;
                    background:@color-c8;

                }
            }
        }
    }
}
</style>
