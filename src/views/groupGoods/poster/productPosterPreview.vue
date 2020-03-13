<template>
   <layout-view>
   <c-header class="my-header" slot="header" :left-arrow="true">
       <div slot="title">
           预览海报
       </div>
       <template slot="right" tag="div">
           保存
       </template>
   </c-header>

    <div class="panel_content">
        <div class="content">
            <div class="product_content">
                <img :src="selected_logo" alt="">
                <div class="product_info">
                    <img :src="productData.mainPic" alt="">
                    <div class="product_text_info">
                        <p>{{productData.productName}}</p>
                        <p>颜色：{{productData.colorName}}</p>
                        <p>尺码：{{productData.sizeName}}</p>
                        <p>{{productData.tshPrice}}</p>
                    </div>
                </div>
            </div>
            <div class="designer_content">
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
                <div class="images_list" v-for="(image,index) in productData.imgs" :key="index" >
                    <img :src="image" alt="">
                    <div class="change_content">
                        <img :src="changeGood_icon" alt="">
                        <p>换一换</p>
                    </div>
                </div>
                <div class="footer_content">
                    <img :src="productData.albumImg_url" alt="">
                    <div class="tell_info">
                        <img :src="callPhone_icon" alt="">
                        <p>联系电话：18679784567</p>
                    </div>
                </div>
            </div>

        </div>
    </div>

   </layout-view>
</template>

<script>
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
            productData: {}
        }
    },
    activated() {
        this.productData = this.$route.query.productData
    }
}
</script>

<style lang='less' scoped>
.my-header {
    position: relative;
    &:after {
        content: "";
        position: absolute;
        left: 0;
        width: 100%;
        height: 1px;
        background: @color-c7;
    }
}
.panel_content {
    background:rgba(244,245,247,1);
    height: calc(100vh - 48px);
    overflow-y: scroll;
    padding-bottom: 48px;
}
.content {
    margin: 16px;
    // height:600px;
    background: @color-c8;
    border-radius:12px;
    .product_content {
        height:245px;
        background:linear-gradient(360deg,rgba(255,255,255,1) 0%,rgba(235,238,255,1) 100%);
        border-radius:12px 12px 0px 0px;
        text-align: center;
        > img {
            margin-top: 16px;
        }
        .product_info {
            margin: 8px 16px 0;
            height:156px;
            background:rgba(255,255,255,1);
            border-radius:12px;
            display: flex;
            > img {
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
        // height:184px;
        background:linear-gradient(360deg,rgba(253,253,254,1) 0%,rgba(249,250,252,1) 100%);
        border-radius:0px 0px 12px 12px;
        position: relative;
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
                        border-radius:4px;
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
                height: calc(100vw - 64px);
                border-radius:12px;
                border:1px solid rgba(244,245,247,1);
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
            > img {
                margin: 32px 16px 12px 16px;
                // height: calc(100vw - 64px);
                // object-fit: cover;
            }
            .tell_info {
                display: flex;
                justify-content: center;
                > img {
                    width: 20px;
                    height: 20px;
                    margin-right: 4px;
                }
                > p {
                    font-size:14px;
                    font-weight:blod;
                    color:@color-c1;
                    line-height:20px;
                }
            }
        }

    }

}
</style>
