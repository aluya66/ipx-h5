<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative" :showBorderBottom='true'>
            <div slot="title">选择图片</div>
            <template slot="right" tag="div">
                <div class="right_title" @click="cancel">
                    取消
                </div>
            </template>
        </c-header>
        <div class="image-content" :style="getBottomOffset(84)">
            <div class="image-list">
                <div class="image-item" :class="[index % 4 !== 0 ? 'margin-left' : '', index >= 4 ? 'margin-top' : '']"
                     v-for="(item, index) in images"
                     :key="index" :style="getPictureRect()">
                    <img :src="item.image" :style="getPictureRect()" alt="" @click="fromChangePreview(index)"/>
                    <img class="select-box" :src="item.isSelected ? imageSelect: imageUnselect" @click="switchSelectState(index)" alt=""/>
                </div>
            </div>
            <div class="image-count">共{{images.length}}张图片</div>
        </div>
        <div class="image-footer" :style="getBottomOffset(0)">
            <div class="image-footer-left">
                <img :src="isAllSelected ? imageSelect: imageUnselect" @click="selectAll" v-show="!this.fromChange"/>
                <span @click="fromChangePreview()">{{this.fromChange ? "预览" : "全选"}}</span>
            </div>
            <div class="image-footer-right">
                <div class="image-download" @click="downloadPicture" v-show="!this.fromChange">下载图片</div>
                <div class="create-poster" @click="createPoster" >{{this.fromChange ? "确定" : "生成海报"}}</div>
            </div>
        </div>
        <div class="image-preview" v-if="isShowPreview" @touchstart="touchStart()">
            <van-image-preview
                v-model="isShowPreview"
                :images="previewImages"
                :loop="isLoop"
                @close="onClose()"
                @click="clickImage()"
            >
                <template v-slot:index>第{ index }页</template>
            </van-image-preview>

        </div>
    </layout-view>
</template>

<script>
import utils from 'utils'
import { Dialog } from 'vant'

export default {
    name: 'imageList',
    data() {
        return {
            isNative: false,
            isShowPreview: false,
            isLoop: false,
            isAllSelected: false,
            screenWidth: document.body.clientWidth,
            productCode: '',
            fromPath: 'product', // product单品，group组货
            fromChange: false,
            images: [],
            previewImages: [],
            imageUnselect: require('../../themes/images/groupGoods/checkbox_default.png'),
            imageSelect: require('../../themes/images/groupGoods/selected_icon.png')
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        touchStart() {
            setTimeout(() => {
                if (this.isShowPreview) {
                    this.dialogAlert()
                }
            }, 750)
        },
        dialogAlert() {
            Dialog.confirm({
                title: '保存图片',
                message: '',
                cancelButtonText: '取消',
                cancelButtonColor: '#007AFF',
                confirmButtonText: '确定',
                confirmButtonColor: '#007AFF'
            }).then(() => {
                this.downloadPicture()
            })
        },
        onClose() {
            this.isShowPreview = false
        },
        clickImage() {
            console.log('点了图片')
        },
        getPictureRect() {
            // `padding-bottom:${y}px !important`
            let width = (this.screenWidth - 15 * window.devicePixelRatio) / 4
            console.log(this.screenWidth + ', width = ' + width)
            return `width:${width}px`
        },
        switchSelectState(index) {
            if (this.fromChange) {
                this.images.forEach((item) => {
                    item.isSelected = false
                })
            }
            this.images[index].isSelected = !this.images[index].isSelected
            let skuList = this.images.filter(item => {
                return item.isSelected
            })
            if (skuList.length === this.images.length) {
                this.isAllSelected = true
            } else {
                this.isAllSelected = false
            }
        },
        cancel() {
            let method = 'page_out'
            if (this.isNative) {
                utils.postMessage(method, '')
            } else {
                this.$router.go(-1)
            }
        },
        selectAll() {
            this.isAllSelected = !this.isAllSelected
            this.images.forEach((item) => {
                item.isSelected = this.isAllSelected
            })
        },
        downloadPicture() {
            let pictures = []
            this.images.forEach((item) => {
                if (item.isSelected) {
                    pictures.push(item.image)
                }
            })

            if (pictures.length === 0) {
                this.$toast('请选择图片')
                return
            }
            utils.postMessage('download_pictures', pictures)
        },
        createPoster() {
            // let params = {
            //     jumpUrl: 'selectPicture://'
            // }
            // utils.postMessage('', params)
            let skuList = this.images.filter(item => {
                return item.isSelected
            })
            if (skuList.length === 0) {
                this.$toast('请选择图片')
                return
            }
            if (this.fromPath === 'product') { // 单品
                if (this.fromChange) {
                    utils.setStore('productSkuList', skuList)
                    this.$router.go(-1)
                } else {
                    this.$router.push({
                        path: '/poster/editProductPoster',
                        query: {
                            productCode: this.productCode,
                            skuCodeList: skuList
                        }
                    })
                }
            } else { // 组货
                utils.setStore('productSkuList', skuList)
                this.$router.go(-1)
            }
        },
        getSkuList() {
            const params = {
                productCode: this.productCode
            }
            this.$api.poster.getSkuList(params).then(res => {
                if (res.colorSkuList instanceof Array) {
                    this.images = res.colorSkuList
                    // res.forEach(item => {
                    //     this.images.push(item.imageModelList)
                    // })
                    this.images = this.images.map(item => {
                        return {
                            ...item,
                            isSelected: false
                        }
                    })
                }
            })
        },
        fromChangePreview(index) {
            if (index !== undefined) {
                let imgs = this.images.filter((item, imgIndex) => {
                    return imgIndex === index
                })
                this.previewSlide(imgs, 0)
            } else {
                if (!this.fromChange) { // 不是预览图片
                    return
                }
                let imgs = this.images.filter((item) => {
                    return item.isSelected
                })
                if (imgs.length <= 0) {
                    this.$toast('请选择预览的图片')
                    return
                }
                this.previewSlide(imgs, 0)
            }
        },
        previewSlide(slidImages, index) {
            let imgs = slidImages.filter((item) => {
                return !item.image.endsWith('.mp4')
            })
            imgs.forEach(item => {
                this.previewImages.push(item.image)
            })
            if (this.previewImages.length <= 0) {
                return
            }
            // utils.setStore('previewImages', previewImages)
            // this.$router.push({
            //     path: '/previewImages',
            //     query: { position: 0 }
            // })
            // ImagePreview({
            //     images: previewImages,
            //     startPosition: index,
            //     loop: false,
            //     onClose() {
            //         // do something
            //     }
            // })
            this.isShowPreview = true
        }
    },
    activated() {
        this.isNative = false
        this.fromChange = false
        this.isAllSelected = false
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        if (this.$route.query.productCode !== undefined) {
            this.productCode = this.$route.query.productCode
            this.getSkuList()
        }
        if (this.$route.query.fromPath !== undefined) {
            this.fromPath = this.$route.query.fromPath
        }
        if (this.$route.query.fromChange !== undefined) {
            this.fromChange = this.$route.query.fromChange
        }
    }
}
</script>

<style lang="less" scoped>
    .image-content {
        height: 100%;
        overflow: scroll;
    }

    .image-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .image-item {
        /*width: calc((100vw - 10px) / 4);*/
        height: calc((100vw - 10px) / 4);
        position: relative;
        background: @color-c8;
    }

    .image-item img {
        /*width: calc((100vw - 10px) / 4);*/
        height: calc((100vw - 10px) / 4);
        position: absolute;
        object-fit: cover;
    }

    .image-item .select-box {
        width: 24px;
        height: 24px;
        position: absolute;
        z-index: 1;
        right: 4px;
        top: 4px;
        border-radius: 12px;
        /*background: rgba(0, 0, 0, 0.3);;*/
    }

    .margin-left {
        margin-left: 5px;
    }

    .margin-top {
        margin-top: 5px;
    }

    .image-count {
        text-align: center;
        margin-top: 13px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: @color-c3;
        line-height: 20px;
    }

    .image-footer {
        color: @color-c1;
        position: fixed;
        background: white;
        display: flex;
        bottom: 0;
        z-index: 2;
        width: 100%;
        justify-content: space-between;
        box-shadow: 0px -1px 6px 0px rgba(33, 44, 98, 0.06);
        border-radius: 20px 20px 0 0;
    }

    .image-preview {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 3;
        top: 0;
        left: 0;
        background: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image-footer-left {
        height: 50px;
        padding-left: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
            margin-right: 8px;
            width: 24px;
            height: 24px;
        }
    }

    .image-footer-right {
        height: 50px;
        line-height: 50px;
        display: flex;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .image-download {
        width: 88px;
        height: 40px;
        background: linear-gradient(322deg, rgba(238, 236, 255, 1) 0%, rgba(216, 212, 255, 1) 100%);
        border-radius: 20px;
        color: @color-ec;
        line-height: 40px;
        text-align: center;
    }

    .create-poster {
        width: 88px;
        height: 40px;
        line-height: 40px;
        background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
        border-radius: 20px;
        margin-left: 12px;
        margin-right: 16px;
        color: white;
        text-align: center;
    }
</style>
