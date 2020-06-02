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
       <div class="content" ref="image" >
           <div class="product_content" :style="isHiddenChange ? 'border-radius: 0' : 'border-radius: 0.12rem'">
                <img :src="selected_logo" alt="">
                <img :src="groupData.groupImg" alt="">
                <p>{{groupData.groupTitle}}</p>
            </div>

            <div class="designer_content" v-show="groupData.groupDesc !== ''">
                <img class="triangle_top" :src="triangle_icon" alt="">
                <div class="designer_label">KOC说</div>

                <div class="designer_header">
                    <img :src="groupData.groupGoodsKoc.headPic" alt="">
                    <div class="name_label">
                        <p>{{groupData.groupGoodsKoc.kocNickName}}</p>
                        <p>IPX时尚买手</p>
                    </div>
                </div>

                <div class="designer_distribute">
                    <img class="left" :src="left_icon" alt="">
                    <p>{{groupData.groupDesc}}</p>
                    <img class="right" :src="right_icon" alt="">
                </div>
            </div>

            <div class="product_image">
                <div class="top_title">
                    <p>包含商品</p>
                    <span>/ Collocation</span>
                </div>
                <!-- mainPic -->
                <div class="images_list" v-for="product in groupData.products" :key="product.productCode" >
                    <img :src="product.colorTypeList[0].image" alt="">
                    <p>{{product.productName}}</p>
                    <div class="goods_information">
                        <p>{{product.colorName}}：{{product.sizeName}}</p>
                        <p>{{groupData.isSinglePrice ? showRetailPrice(product) : posterPrice(product)}}</p>
                    </div>
                    <div class="change_content" @click="changeProduct(product)"  v-show="!isHiddenChange">
                        <img :src="changeGood_icon" alt="">
                        <p>换一张</p>
                    </div>
                </div>
                <div class="footer_content" >
                    <img :src="groupData.albumImg_url" alt="" v-show="groupData.albumImg_url !== ''">
                    <div class="tell_info" v-show="groupData.phone !== ''">
                        <img :src="callPhone_icon" alt="">
                        <p>联系电话：{{groupData.phone}}</p>
                    </div>
                </div>
            </div>

       </div>
    </div>
   </div>
    <LoaddingView class="loadding_content" loaddingDesc="生成海报..." v-show="isLoadding"/>
   </layout-view>
</template>

<script>
// import { Toast } from 'vant'
import utils from 'utils'
import html2canvas from 'html2canvas'
import LoaddingView from '../../error/loaddingView.vue'
// import CanvasRenderer from 'CanvasRenderer'

export default {
    components: {
        LoaddingView
    },
    data () {
        return {
            selected_logo: require('../../../themes/images/groupGoods/poster_selected_collocation@3x.png'),
            left_icon: require('../../../themes/images/groupGoods/poster_left_icon@3x.png'),
            right_icon: require('../../../themes/images/groupGoods/poster_right_icon@3x.png'),
            callPhone_icon: require('../../../themes/images/groupGoods/icon_call_phone@3x.png'),
            changeGood_icon: require('../../../themes/images/groupGoods/icon_change@3x.png'),
            triangle_icon: require('../../../themes/images/groupGoods/icon_triangle@3x.png'),
            groupData: {},
            changedSku: {},
            selectProduct: {},
            isHiddenChange: false,
            isLoadding: false
        }
    },
    created() {
        // this.groupData = this.$route.query.groupData
    },
    deactivated() {
        utils.setStore('productSkuList', '')
        // Toast.clear()
        this.isLoadding = false
    },
    activated() {
        if (this.$route.query.groupData.groupCode !== undefined) {
            this.groupData = this.$route.query.groupData
        }
        this.changedSku = utils.getStore('productSkuList')[0]
        if (this.changedSku !== undefined) {
            let index = this.groupData.products.indexOf(this.selectProduct)
            if (index > -1) {
                this.groupData.products[index].colorName = this.changedSku.colorName
                this.groupData.products[index].sizeName = this.changedSku.sizeName
                this.groupData.products[index].retailPrice = this.changedSku.retailPrice
                this.groupData.products[index].colorTypeList[0].image = this.changedSku.image
            }
        }
    },
    computed: {
        posterPrice() {
            return function (product) {
                if (this.groupData.isSuggest) { // 建议零售价
                    return parseFloat(product.retailPrice).toFixed(2)
                }
                let add = this.groupData.percent
                if (add === '' || add === '.') {
                    add = '0'
                }
                // if (add === '0') {
                //     return parseFloat(product.tshPrice).toFixed(2)
                // } else {
                let p = parseFloat(product.tshPrice) * parseFloat(add || '0') / 100 + parseFloat(product.tshPrice)
                let p2 = p.toFixed(2)
                return p2
                // }
            }
        },
        showRetailPrice() {
            return function (product) {
                if (product.showPrice === '' || product.showPrice === '.') {
                    return parseFloat(product.tshPrice).toFixed(2)
                }
                return parseFloat(product.showPrice).toFixed(2)
            }
        }
    },
    methods: {
        // 是否iPhoneX底部
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
        changeProduct(product) {
            this.selectProduct = product
            this.$router.push({
                path: '/picture/imageList',
                query: {
                    productCode: product.productCode,
                    fromPath: 'group',
                    fromChange: true
                }
            })
        },
        savePoster() {
            this.isHiddenChange = true
            let _this = this
            // Toast.loading({
            //     message: '生成海报...',
            //     duration: 0
            // })
            _this.isLoadding = true
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
                        _this.$router.push({
                            path: '/poster/savePoster',
                            query: { groupCode: _this.groupData.groupCode }
                        })
                        utils.postMessage('download_pictures', result)
                        // Toast.clear()
                        _this.isLoadding = false
                    }).catch(() => {
                        _this.isHiddenChange = false
                        _this.isLoadding = false
                        _this.$toast('保存失败请重试')
                    })
                })
            }, 30)
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
    position: relative;
    background: @color-c7;
    height: 100%;//calc(100vh - 48px);
    overflow-y: scroll;
    z-index: 100;
}
.poster_img_content {
    background: @color-c7;
    padding-top: 4px;
    padding-bottom: 25px;
}
.content {
    margin: 16px;
    background: @color-c8;
    border-radius: 12px;
    .product_content {
        background:linear-gradient(360deg,rgba(255,255,255,1) 0%,rgba(235,238,255,1) 100%);
        border-radius: 12px;
        text-align: center;
        padding: 16px;
        padding-bottom: 20px;
        > img {
            &:nth-child(1) {
                height: 45px;
            }
            &:nth-child(2) {
                border-radius:12px 12px 0 0;
                margin: 8px 0 12px;
                width: calc(100vw - 64px);
                // height: calc(100vw - 32px);
            }
        }
        > p {
            font-size: 16px;
            font-weight: bold;
            color: @color-c1;
            line-height: 22px;
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
                    font-weight:500;
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
        padding-top: 24px;
        padding-bottom: 40px;
        .top_title {
            display: flex;
            margin-left: 16px;
            font-size:14px;
            font-weight:400;
            color: @color-c4;
            line-height:20px;
            > p {
                font-size:20px;
                font-weight: bold;
                color: @color-c1;
                line-height:28px;
                margin-right: 8px;
            }
            > span {
                align-self: flex-end;
            }
        }
        .images_list {
            position: relative;
            background: rgba(255,255,255,1);
            box-shadow:0px 2px 10px 0px rgba(33,44,98,0.06);
            border-radius:12px;
            margin: 24px 16px 0;
            padding-bottom: 16px;
            > img {
                margin: 0;
                width: calc(100vw - 64px);
                // height: calc(100vw - 64px);
                // background: @color-c8;
                background:linear-gradient(360deg,rgba(249,250,252,1) 0%,rgba(255,255,255,1) 100%);
                border-radius:12px;
            }
            > p {
                width: calc(100vw - 64px);
                font-size:16px;
                font-weight: bold;
                color: @color-c1;
                line-height:22px;
                margin: 12px 16px 8px;
            }
            .goods_information {
                width: calc(100vw - 64px);
                display: flex;
                justify-content: space-between;
                // margin: 0 ;
                p {
                    align-self: center;
                    font-size:12px;
                    font-weight:400;
                    color: @color-c3;
                    line-height:16px;
                    margin: 0 16px;
                    &:nth-child(2) {
                        font-size:20px;
                        font-weight:400;
                        color:@color-rc;
                        font-family: "alibabaBold";
                        &::before {
                            content: '¥ ';
                            font-family: "alibabaRegular";
                            width: 20px;
                            font-weight:400;
                            line-height: 24px;
                            font-size: 12px;
                        }
                    }
                }
            }
            .change_content {
                z-index: 100;
                display: flex;
                justify-content: center;
                position: absolute;
                top: 16px;
                right: 16px;
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
                margin: 32px 16px 0 16px;
                // width: calc(100vw - 64px);
                border-radius: 12px;
                height: 250px;
                width: 188px;
                object-fit: cover;
                // height: calc(100vw - 64px);
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
                    font-weight:bold;
                    color:@color-c1;
                    line-height:20px;
                }
            }
        }

    }
}

.loadding_content {
    position: absolute;
    left: calc(50vw - 60px); //40%;
    top: 40%;
    height: 120px;
    width: 120px;
    z-index: 10000;
    background: white;
    border-radius: 12px;
}

</style>
