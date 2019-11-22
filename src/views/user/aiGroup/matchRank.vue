<template>
   <layout-view class="header-bg">
    <c-header class="header" slot="header" :left-arrow="true" :isLight='false'>
        <template slot="left" tag="div">
            <img class="header-img" :src="backImage" />
        </template>
   </c-header>
   <div class="contain">
       <p class="top-title">最潮搭配TOP10</p>
       <div class="rank">
           <div class="rank-contain" v-for="(item,index) in rankData" :key="item">
                <img class="mainImage" :src="testImg" alt="">
                <div class="infoContain">
                    <div>
                        <h3>秋装百搭组货</h3>
                        <div class="percentage">
                            <p> &nbsp; 时尚指数 100% &nbsp;</p>
                            <p>&nbsp; 推荐指数 98% &nbsp;</p>
                            <p>&nbsp; 热销指数 78% &nbsp;</p>
                        </div>
                    </div>
                    <p class="hot"><img src="@/themes/images/groupGoods/icon_popularity_red.png" alt="">183920</p>
                    <section class="call">打call</section>
                </div>
                <section class="rankImage" >
                    <img :src="rankImg[index]" alt="">
                    <p>{{index + 1}}</p>
                </section>
           </div>
       </div>
   </div>
   </layout-view>
</template>

<script>
export default {
    components: {

    },
    props: {

    },
    data () {
        return {
            rankData: [1, 2, 3, 4, 5, 6],
            testImg: require('@/themes/images/groupGoods/groupInfoBg.png'),
            backImage: require('@/themes/images/app/icon_nav_back_white@2x.png'),
            rankImg: [require('../../../themes/images/groupGoods/bg_No.1.png'), require('../../../themes/images/groupGoods/bg_No.2.png'), require('../../../themes/images/groupGoods/bg_No.3.png')]
        }
    },
    methods: {

    }
}
</script>

<style lang='less' scoped>
.header {
    background: rgba(0,0,0,0);
    .header-img {
        display: inline-block;
        vertical-align: middle;
        width: 26px;
        height: 26px;
    }
}
.contain {
    overflow: auto;
    height: 100%;
}
.header-bg {
    background-image :url('../../../themes/images/groupGoods/bg_koc_recommend_top.png');
    background-repeat:no-repeat;
    background-size:100% 246px;
    .top-title {
        height:40px;
        font-size:28px;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:40px;
        margin-top: 15px;
        margin-left: 20px;
    }
    .rank {
        margin-top: 16px;
        background:rgba(255,255,255,1);
        border-radius:12px 12px 0px 0px;
        padding: 36px 16px 0;
        .rank-contain {
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 10px 0px rgba(33,44,98,0.06);
            border-radius:12px;
            padding: 16px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-top:44px;
            position: relative;
            &:first-child {
                margin-top: 0;
            }
            .mainImage {
                width: 114px;
                height: 129px;
                object-fit: cover;
            }
            .rankImage {
                position: absolute;
                width: 32px;
                height: 24px;
                left: 12px;
                top: -12px;
                img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }
                p {
                    text-align: center;
                    line-height: 24px;
                    font-size:10px;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    position: relative;
                }
            }
            .infoContain {
                flex: auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                position: relative;
                height: 128px;
                // height: 100%;
                margin-left: 12px;
                h3 {
                    font-size:16px;
                    font-weight:500;
                    color:@color-c1;
                    line-height:22px;
                }
                .percentage {

                    p {
                        margin-top: 8px;
                        display: inline-block;
                        font-size:10px;
                        font-weight:500;
                        line-height:20px;
                        border-radius:2px;
                        &:nth-child(1) {
                            color:@color-ec;
                            background: @color-ec1;
                        }
                        &:nth-child(2){
                            color:@color-oc;
                            background: @color-oc1;
                            margin-left:7px;
                        }
                        &:nth-child(3) {
                            color:@color-rc;
                            background: @color-rc1;
                        }
                    }
                }
                .hot {
                    font-size:18px;
                    font-weight:bold;
                    color:@color-c1;
                    line-height:22px;
                    vertical-align: middle;
                    img {

                        width: 16;height: 16px;
                    }
                }
                .call {
                    position: absolute;
                    .btn-select(69px,36px,true);
                    bottom: 0;
                    right: 0;
                }
            }
        }
    }
}
</style>
