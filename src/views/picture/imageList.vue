<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true" :pageOutStatus="isNative" :showBorderBottom='true'>
            <div slot="title">选择图片</div>
            <div slot="right">取消</div>
        </c-header>
        <div class="image-content" :style="getBottomOffset(84)">
            <div class="image-list">
                <div class="image-item" :class="[index % 4 !== 0 ? 'margin-left' : '', index >= 4 ? 'margin-top' : '']"
                     v-for="(item, index) in images"
                     :key="index" :style="getPictureRect()">
                    <img :src="item.skuDefaultImg" :style="getPictureRect()" alt=""/>
                    <img class="select-box" :src="item.isSelected ? imageSelect: imageUnselect" @click="switchSelectState(index)" alt=""/>
                </div>
            </div>
            <div class="image-count">共{{images.length}}张图片</div>
        </div>
        <div class="image-footer">
            <div class="image-footer-left">
                <img :src="isAllSelected ? imageSelect: imageUnselect" @click="selectAll()"/>
                全选
            </div>
            <div class="image-footer-right">
                <div class="image-download" @click="downloadPicture()">下载图片</div>
                <div class="create-poster" @click="createPoster()">生成海报</div>
            </div>
        </div>
    </layout-view>
</template>

<script>
import utils from 'utils'
export default {
    name: 'imageList',
    data() {
        return {
            isNative: true,
            isAllSelected: false,
            screenWidth: document.body.clientWidth,
            productCode: '',
            fromPath: 'product', // product单品，group组货
            images: [],
            imageUnselect: require('../../themes/images/groupGoods/checkbox_default.png'),
            imageSelect: require('../../themes/images/groupGoods/selected_icon.png')
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        getPictureRect() {
            // `padding-bottom:${y}px !important`
            let width = (this.screenWidth - 15 * window.devicePixelRatio) / 4
            console.log(this.screenWidth + ', width = ' + width)
            return `width:${width}px`
        },
        switchSelectState(index) {
            this.images[index].isSelected = !this.images[index].isSelected
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
                    pictures.push(item.skuDefaultImg)
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
            utils.setStore('productSkuList', skuList)
            if (this.fromPath === 'product') { // 单品
                this.$router.push({
                    path: '/poster/editProductPoster',
                    query: this.productCode
                })
            } else { // 组货
                this.$router.push({
                    path: '/poster/editProductPoster',
                    query: this.productCode
                })
            }
        },
        getSkuList() {
            const params = {
                productCode: this.productCode
            }
            this.$api.poster.getSkuList(params).then(res => {
                if (res instanceof Array) {
                    this.images = res
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
        }
    },
    mounted() {
        if (this.$route.query.productCode !== undefined) {
            this.productCode = this.$route.query.productCode
            this.getSkuList()
        }
        if (this.$route.query.fromPath !== undefined) {
            this.fromPath = this.$route.query.fromPath
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

    .image-footer-left {
        height: 50px;
        padding-left: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
            margin-right: 8px;
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
