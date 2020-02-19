<template>
    <popup
        class="popup-contain"
        :style='handlePopupSize()'
        v-model="isShow"
        @close='handleClose'
        :lock-scroll='false'
        :closeable='!isDownload'
        :close-icon="deleteIcon"
        :safe-area-inset-bottom='true'
        :safe-area-inset-top='true'
    >
        <img v-if="imgUrl !== ''" style="width:100%" :src="imgUrl" alt="">
        <div v-else class="contain-view" ref="image">
        <div class="content-header group-desc-cell">
            <img class="group-mainImg" :src="posterData.groupImg" alt="">
            <p class="group-name">{{posterData.groupTitle}}</p>
            <p class="group-code">款号:{{posterData.groupDefNo}}</p>
            <p class="group-desc field-common">
                {{posterData.groupDesc}}
            </p>
            <div class="group-flag" :class="[(!posterData.phone || posterData.phone.length<=0) ? 'group-paddingBottom' : '']">
                <section class="group-flag-item" v-for="item in posterData.labelDescs" :key="item">{{item}}</section>
            </div>
            <p class="hot-line" v-show="posterData.phone && posterData.phone.length>0" >抢购热线：{{posterData.phone}}</p>
        </div>

        <div class="list-contain">
            <div class="product-header">
                <img :src="headerImage" alt="">
                <p>包含商品</p>
            </div>
            <div class="product-list">
                <div class="product-item" v-for="item in posterData.products" :key="item.productCode">
                    <img :src="item.mainPic" alt="">
                    <div class="product-info">
                        <p>{{item.productName}}</p>
                        <p>款号:{{item.productAtrNumber}}</p>
                        <p>{{handleCalculatePrice(item)}}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </popup>
</template>

<script>

import { Popup, Toast } from 'vant'
import utils from 'utils'
import html2canvas from 'html2canvas'

export default {
    components: {
        Popup
    },
    props: {
        isShowPopup: {
            type: Boolean,
            default: false
        },
        isDownload: {
            type: Boolean,
            default: false
        },
        posterData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            photoShow: false,
            photoUrl: '',
            imgUrl: '',
            isShow: false,
            products: [1, 2, 3, 4, 5, 6, 7],
            headerImage: require('@/themes/images/app/Collocation@3x.png'),
            deleteIcon: require('@/themes/images/app/control_delete@3x.png'),
            descArr: []
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
        },
        posterData(val) {
            let desc = val.groupDesc
            this.descArr = desc.split(/[\n]/g)
            for (var i = 0; i < this.descArr.length; i++) {
                if (this.descArr[i] === '') {
                    this.descArr.splice(i, 1)
                    i--
                }
            }
        }
    },
    methods: {
        handleCalculatePrice(item) {
            if (this.posterData.isRetail) {
                let price = parseFloat(item.retailPrice) * (1 + parseFloat(this.posterData.customPricePercent) / 100)
                let p = price.toFixed(2)
                return p
            } else {
                let price = parseFloat(item.tshPrice) * (1 + parseFloat(this.posterData.customPricePercent) / 100)
                let p = price.toFixed(2)
                return p
            }
        },
        handleDown() {
            Toast.loading({
                message: '生成海报...',
                forbidClick: true,
                duration: 0
            })
            let _this = this
            setTimeout(() => {
                let img = _this.$refs.image
                html2canvas(img, {
                    useCORS: true,
                    allowTaint: false,
                    scale: 1 // 设置像素比 越大越清晰 但是iOS可能无法渲染
                }).then(function(canvas) {
                    _this.photoUrl = canvas.toDataURL('image/png')
                    _this.downloadIamge(_this.photoUrl, 'poster.png')
                })
            }, 2000)
        },
        downloadIamge(imgsrc, name) {
            var image = new Image()
            var canvas = document.createElement('canvas')
            var context = canvas.getContext('2d')
            // 解决跨域 Canvas 污染问题
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = imgsrc
            image.style.objectFit = 'contain'
            image.onload = () => {
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
                }
                // self.imgUrl = url
                // var a = document.createElement('a') // 生成一个a元素
                // var event = new MouseEvent('click') // 创建一个单击事件
                // a.download = name // 设置图片名称
                // a.href = url // 将生成的URL设置为a.href属性
                // a.dispatchEvent(event) // 触发a的单击事件
                Toast.clear()
            }
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
        padding: 0;
    }
    .van-field__body {
        font-family:PingFangSC-Medium,PingFang SC;
        font-size:14px !important;
        font-weight:600 !important;
        color: @color-c1;
    }
    .van-field__body textarea{
        font-family:PingFangSC-Medium,PingFang SC;
        font-size:14px !important;
        font-weight:500 !important;
        color: @color-c1;
    }
}

</style>
<style lang="less" scoped>
.popup-contain::-webkit-scrollbar {
    display:none
}
.popup-contain {
    border-radius:12px;
    .contain-view {
        width: 100%;
    }
    .field-common {
        background:rgba(249,250,252,1);
        border-radius:4px;
        width: calc(100vw - 64px);
        margin: 0 16px;
    }
    .content-header {
        background: #F9FAFC;
        padding-bottom: 1px;

    }
    .group-mainImg {
        // width: calc(100vw - 32);
        width: 100%;
        object-fit: contain;
    }
    .group-name {
        font-size:16px;
        font-weight:500;
        color:@color-c1;
        line-height:22px;
        margin: 16px 16px 0;
    }
    .group-code {
        height:16px;
        font-size:12px;
        font-weight:400;
        color:@color-c3;
        line-height:16px;
        margin: 12px 16px 0;
    }
    .group-desc {
        font-size:12px;
        font-weight:400;
        color:@color-c1;
        line-height:20px;
        margin: 12px 16px 0;
    }
    .group-paddingBottom {
        padding-bottom:16px !important;
    }
    .group-flag {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 4px 8px 0;
        .group-flag-item {
            height: 28px;
            line-height: 26px;
            padding:0 12px;
            border-radius:14px;
            border:1px solid @color-ec;
            margin-left: 8px;
            margin-top: 12px;
            color: @color-ec
        }
    }
    .hot-line {
        height:22px;
        font-size:16px;
        font-weight:600;
        color:@color-c1;
        line-height:22px;
        margin: 16px 16px 16px
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
            .product-item {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                img {
                    width: 106px;
                    height: 106px;
                    margin-left: 16px;
                    margin-top: 16px;
                    margin-bottom: 16px;
                    background:@color-c8;

                }
                .product-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    position: relative;
                    p {
                        &:nth-child(1) {
                            height:22px;
                            font-size:16px;
                            font-weight:500;
                            color:@color-c1;
                            line-height:22px;
                            margin: 16px 16px 0 12px;
                        }
                        &:nth-child(2) {
                            height:16px;
                            font-size:12px;
                            font-weight:400;
                            color:@color-c3;
                            line-height:16px;
                            margin:8px 16px 0 12px;
                        }
                        &:nth-child(3) {
                            position: absolute;
                            left: 12px;
                            bottom: 16px;
                            height:24px;
                            font-size:20px;
                            font-family:Helvetica;
                            color:rgba(244,31,31,1);
                            line-height:24px;
                            &::before {
                                content: '¥';
                                width: 20px;
                                font-weight:600;
                                line-height: 40px;
                                font-size: 12px;
                                position: relative;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
