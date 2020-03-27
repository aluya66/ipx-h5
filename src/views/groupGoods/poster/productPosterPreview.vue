<template>
   <layout-view :style="paddingTop()">
   <c-header slot="header" :left-arrow="true" :showBorderBottom='true'>
       <div slot="title">
           预览海报
       </div>
       <template slot="right" tag="div">
           <div class="right_title" @click="savePoster">
                保存
           </div>
       </template>
   </c-header>

    <div class="panel_content">
        <div class="poster_img_content" :style="getBottomOffset(0)">
            <div class="content" ref="image">
                <div class="product_content"  :style="isHiddenChange ? 'border-radius: 0' : 'border-radius: 0.12rem'">
                    <img :src="selected_logo" alt="">
                    <div class="product_info">
                        <img :src="productData.mainPic" alt="">
                        <div class="product_text_info">
                            <p>{{productData.productName}}</p>
                            <p>颜色：{{productData.colorName}}</p>
                            <p>尺码：{{productData.sizeName}}</p>
                            <p>{{productData.showPrice}}</p>
                        </div>
                    </div>
                </div>
                <div class="designer_content" v-show="productData.importantDesc !== ''">
                    <img class="triangle_top" :src="triangle_icon" alt="">
                    <div class="designer_label">设计师说</div>

                    <div class="designer_header">
                        <img :src="productData.designer.avatar" alt="">
                        <div class="name_label">
                            <p>{{productData.designer.nickname}}</p>
                            <p>IPX原创设计师</p>
                        </div>
                    </div>

                    <div class="designer_distribute">
                        <img class="left" :src="left_icon" alt="">
                        <p>{{productData.importantDesc}}</p>
                        <img class="right" :src="right_icon" alt="">
                    </div>
                </div>
                <div class="product_image">
                    <div class="images_list" v-for="(skuItem,index) in productData.colorTypeList" :key="index" >
                        <img :src="skuItem.image" alt="">
                        <div class="change_content" @click="changeImage(skuItem.skuCodes)" v-show="!isHiddenChange">
                            <img :src="changeGood_icon" alt="">
                            <p>换一张</p>
                        </div>
                    </div>
                    <div class="footer_content" >
                        <img :src="productData.albumImg_url" alt="" v-show="productData.albumImg_url !== ''">
                        <div class="tell_info" v-show="productData.phone !== ''">
                            <img :src="callPhone_icon" alt="">
                            <p>联系电话：{{productData.phone}}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

   </layout-view>
</template>

<script>
import { Toast } from 'vant'
import html2canvas from 'html2canvas'
import utils from 'utils'

export default {
    components: {

    },
    data () {
        return {
            selected_logo: require('../../../themes/images/groupGoods/poster_selected_garment@3x.png'),
            left_icon: require('../../../themes/images/groupGoods/poster_left_icon@3x.png'),
            right_icon: require('../../../themes/images/groupGoods/poster_right_icon@3x.png'),
            callPhone_icon: require('../../../themes/images/groupGoods/icon_call_phone@3x.png'),
            changeGood_icon: require('../../../themes/images/groupGoods/icon_change@3x.png'),
            triangle_icon: require('../../../themes/images/groupGoods/icon_triangle@3x.png'),
            productData: {},
            changedSku: {},
            changeSkuCodes: [],
            isHiddenChange: false
        }
    },
    created() {
        // this.productData = this.$route.query.productData
    },
    deactivated() {
        utils.setStore('productSkuList', '')
        Toast.clear()
    },
    activated() {
        if (this.$route.query.productData.productCode !== undefined) {
            this.productData = this.$route.query.productData
        }
        this.changedSku = utils.getStore('productSkuList')[0]
        if (this.changedSku !== undefined) {
            this.handleRequest()
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        paddingTop() {
            let basepara = utils.getStore('baseParams')
            if (basepara.isIphoneX) {
                return 'padding-top: 0.49rem;'
            }
            return 'padding-top: 0.26rem;'
        },
        changeImage(skucodes) {
            this.changeSkuCodes = skucodes
            this.$router.push({
                path: '/picture/imageList',
                query: {
                    productCode: this.productData.productCode,
                    fromPath: 'product',
                    fromChange: true
                }
            })
        },
        handleRequest() {
            let skuLsit = this.productData.colorTypeList
            let skuCodes = []
            skuLsit.forEach(item => {
                if (this.changeSkuCodes !== item.skuCodes) {
                    skuCodes = skuCodes.concat(item.skuCodes)
                }
            })
            skuCodes = skuCodes.concat(this.changedSku.skuCodes)
            const params = {
                productCode: this.productData.productCode,
                skuCodes: skuCodes
            }
            let phone = this.productData.phone
            let retailPrice = this.productData.showPrice
            let albumImg = this.productData.albumImg_url
            let productName = this.productData.productName
            this.$api.poster.getProductPosterInfo(params).then(res => {
                if (res instanceof Object) {
                    this.productData = res
                    this.productData.phone = phone
                    this.productData.showPrice = retailPrice
                    this.productData.albumImg_url = albumImg
                    this.productData.productName = productName
                }
            }).catch(() => {
                // this.$toast('请求错误')
            })
        },
        savePoster() {
            this.isHiddenChange = true
            let _this = this
            Toast.loading({
                message: '生成海报...',
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
                    let file = _this.dataURLtoBlob(_this.photoUrl)
                    utils.upload([file]).then(result => {
                        _this.isHiddenChange = false
                        utils.postMessage('download_pictures', result)
                        Toast.clear()
                    }).catch(() => {
                        _this.isHiddenChange = false
                        _this.$toast('保存失败请重试')
                    })
                })
            }, 30)
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
        dataURLtoBlob(data) {
            var arr = data.split(','); var mime = arr[0].match(/:(.*?);/)[1]
            var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new Blob([u8arr], { type: mime })
        }
    }
}
</script>

<style lang='less' scoped>
.panel_content {
    background:@color-c7;
    height: 100%;//calc(100vh - 48px);
    overflow-y: scroll;
}
.poster_img_content {
    background: @color-c7;
    padding-top: 4px;
    padding-bottom: 25px;
}
.content {
    margin: 16px;
    // height:600px;
    background: @color-c8;
    border-radius:12px;
    .product_content {
        background:linear-gradient(360deg,rgba(255,255,255,1) 0%,rgba(235,238,255,1) 100%);
        border-radius:12px;
        text-align: center;
        padding-bottom: 4px;
        > img {
            margin-top: 16px;
            object-fit: cover;
            height: 45px;
        }
        .product_info {
            margin: 8px 16px 4px;
            height:156px;
            background: rgba(255,255,255,1);
            border-radius:12px;
            display: flex;
            > img {
                flex-shrink: 0;
                width:93px;
                height:124px;
                background:rgba(249,250,252,1);
                border-radius:8px;
                margin: 16px 12px 16px 16px;
                object-fit: cover;
            }
            .product_text_info {
                margin: 16px 16px 16px 0px;
                text-align: left;
                position: relative;
                // background: blue;
                p {
                    font-size:12px;
                    font-weight:400;
                    color:@color-c3;
                    line-height:18px;
                    &:nth-child(1) {
                        font-size:16px;
                        font-weight:bold;
                        color:@color-c1;
                        line-height:22px;
                        margin-bottom: 8px;
                        width: calc(100vw - 201px);
                        // .multi-ellipsis(2);
                        max-height: 44px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    &:nth-child(4) {
                        font-size:20px;
                        font-weight:bold;
                        color:@color-rc;
                        font-family: "alibabaBold";
                        position: absolute;
                        margin-top: 12px;
                        bottom: 0;
                        &::before {
                            content: '¥ ';
                            font-family: "alibabaRegular";
                            width: 20px;
                            font-weight:400;
                            line-height: 24px;
                            font-size: 12px;
                            position: relative;
                        }
                    }
                }
            }
        }
    }
    .designer_content {
        margin: 0;
        background:linear-gradient(360deg,rgba(255,255,255,1) 0%,rgba(249,250,252,1) 100%);
        border-radius:0px 0px 12px 12px;
        position: relative;
        .triangle_top {
            position: absolute;
            width: 16px;
            height: 8px;
            left: 50%;
            margin-left: -8px;
            top: -8px;
            z-index: 1000;
        }
        .designer_label {
            width:72px;
            height:32px;
            background:rgba(255,235,237,1);
            border-radius:0px 0px 12px 12px;
            text-align: center;
            font-size:12px;
            font-weight:bold;
            color:rgba(245,48,48,1);
            line-height:32px;
            position: absolute;
            right: 16px;
        }
        .designer_header {
            display: flex;
            > img {
                width:36px;
                height:36px;
                border-radius:18px;
                margin: 16px 6px 10px 16px;
            }
            .name_label {
                margin-top: 16px;
                > p {
                    font-size:13px;
                    font-weight: bold;
                    color:@color-c1;
                    line-height:18px;
                    margin-bottom: 5px;
                    &:nth-child(2) {
                        padding: 2px 5px;
                        font-size:10px;
                        font-weight:bold;
                        color:rgba(60,92,246,1);
                        border-radius: 0px 4px 4px 4px;
                        line-height:12px;
                        background:rgba(235,238,255,1);
                    }
                }
            }
        }
        .designer_distribute {
            position: relative;
            padding-bottom: 24px;
            .left {
                width: 16px;
                height: 16px;
                margin-left: 16px;
                margin-right: 4px;
            }
            > p {
                margin: 0 36px 0px 36px;
                font-size:14px;
                font-weight:400;
                color: @color-c1;
                line-height:20px;
            }
            .right {
                position: absolute;
                width: 16px;
                height: 16px;
                right: 16px;
                bottom: 16px;
            }

        }

    }
    .product_image {
        background: white;
        border-radius:12px;
        margin-top: 12px;
        padding-bottom: 40px;
        .images_list {
            position: relative;
            > img {
                margin: 16px;
                margin-bottom: 0;
                width: calc(100vw - 64px);
                border-radius:12px;
                border:1px solid rgba(244,245,247,1);
                background: @color-c8;
                background:linear-gradient(360deg,rgba(249,250,252,1) 0%,rgba(255,255,255,1) 100%);
            }
            .change_content {
                z-index: 100;
                display: flex;
                justify-content: center;
                position: absolute;
                top: 32px;
                right: 32px;
                > img {
                    width: 16px;
                    height: 16px;
                    margin-right: 8px;
                }
                > p {
                    font-size:12px;
                    font-weight:bold;
                    color:@color-c2;
                    line-height:16px;
                }
            }
        }

        .footer_content {
            display: flex;
            flex-direction: column;
            align-items: center;
            > img {
                margin: 32px 16px 0px 16px;
                // width: calc(100vw - 64px);
                border-radius: 12px;
                height: 250px;
                width: 188px;
                object-fit: cover;
                // object-fit: cover;
            }
            .tell_info {
                display: flex;
                justify-content: center;
                margin-top: 13px;
                > img {
                    width: 20px;
                    height: 20px;
                    margin-right: 4px;
                }
                > p {
                    font-size:14px;
                    font-weight: bold;
                    color:@color-c1;
                    line-height:20px;
                }
            }
        }

    }

}
</style>
