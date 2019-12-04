<template>
   <layout-view class="header-bg">
    <c-header class="header" slot="header" :left-arrow="true" :isLight='false'>
        <template slot="left" tag="div">
            <img class="header-img" :src="backImage" />
        </template>
   </c-header>
   <div class="contain" >
       <p class="top-title">最潮搭配TOP10</p>
       <div class="rank" v-if="showList" :style="getListContainHeight()">
            <empty-view class="empty" v-if="rankData.length <= 0" emptyDesc='正在统计排行榜，请稍后再查看哦～' emptyType="error" />
            <div class="rank-content" v-else v-for="(item,index) in rankData" :key="item+index" @click="handleToDetail(item)">
               <div class="rank-contain">
                    <img class="mainImage" :src="item.groupImg" alt="">
                    <div class="infoContain">
                        <div>
                            <h3>{{item.groupTitle}}</h3>
                            <div class="percentage">
                                <p> &nbsp; 时尚指数 {{item.fashionIndexNum}}% &nbsp;</p>
                                <p>&nbsp; 推荐指数 {{item.adviceIndexNum}}% &nbsp;</p>
                                <p>&nbsp; 热销指数 {{item.hotIndexNum}}% &nbsp;</p>
                            </div>
                        </div>
                        <p class="hot"><img src="@/themes/images/groupGoods/icon_popularity_red.png" alt="">{{item.grandTotalFocus}}</p>
                        <section class="call" @click.stop="handleCall(item)">打call</section>
                    </div>
                    <section class="rankImage" v-show="index<3">
                        <img  :src="rankImg[index]" alt="">
                        <p>NO.{{index + 1}}</p>
                    </section>
               </div>

           </div>
       </div>
   </div>
   </layout-view>
</template>

<script>
import utils from 'utils'
import EmptyView from '../../error/emptyView.vue'

export default {
    components: {
        EmptyView
    },
    props: {

    },
    data () {
        return {
            // showTitle: false,
            showList: false,
            rankData: [],
            testImg: require('@/themes/images/groupGoods/groupInfoBg.png'),
            backImage: require('@/themes/images/app/icon_nav_back_white@2x.png'),
            rankImg: [require('@/themes/images/groupGoods/bg_No.1.png'), require('@/themes/images/groupGoods/bg_No.2.png'), require('@/themes/images/groupGoods/bg_No.3.png')]
        }
    },
    methods: {
        handleToDetail(item) {
            window.sa.track('IPX_WEB', {
                page: 'groupHotRank', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'rankItemClick' // 按钮唯一标识，取个语义化且不重名的名字
            })
            this.$router.push({
                path: '/groupDetail',
                query: {
                    groupCode: item.groupCode
                }
            })
        },
        handleCall(item) {
            window.sa.track('IPX_WEB', {
                page: 'groupHotRank', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'rankCall' // 按钮唯一标识，取个语义化且不重名的名字
            })
            const params = {
                vo: {
                    groupCode: item.groupCode
                }
            }
            this.$api.groupGoods.postCall(params).then(res => {
                if (res.code === 0) {
                    this.$toast('打call成功')
                    item.grandTotalFocus += 1
                }
            }).catch(() => {

            })
        },
        getListContainHeight() {
            let offsetStr = utils.bottomOffset(0)
            let str = `min-height:${this.getContainHeight()}rem;${offsetStr}`
            return str
        },
        getContainHeight() {
            let baseParams = utils.getStore('baseParams')
            let statusBarHeight = Number(baseParams.statusBarHeight)
            let wHeight = window.screen.height
            return (wHeight - statusBarHeight - 115) / 100
        },
        handleRequest() {
            this.$api.groupGoods.groupRank().then(res => {
                if (res instanceof Array) {
                    this.rankData = res
                }
            }).catch(() => {

            })
        }
    },
    mounted() {
        window.sa.track('IPX_WEB', {
            page: 'groupHotRank', // 页面名字
            type: 'pageView', // 固定参数，不用改
            event: 'pageView' // 固定参数，不用改
        })
        this.showList = false
        setTimeout(() => {
            this.showList = true
        }, 300)
    },
    activated() {
        this.handleRequest()
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
.empty {
    margin-top: 24px;
    border-radius: 12px 12px 0px 0px;
    padding-top: 112px;
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
        // overflow: hidden;
        // padding: 36px 0 0;
        // height: 200px;
        .rank-content {
            padding: 44px 16px 0;
            background: #fff;
            &:first-child {
                padding:36px 16px 0;
                border-radius:12px 12px 0px 0px;
            }
        }
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
                border-radius:8px;
                border:1px solid rgba(244,245,247,1);
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
                    margin: 0;
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
                    margin: 0;
                }
                .percentage {

                    p {
                        margin: 8px 0 0;
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
                    line-height:16px;
                    vertical-align: initial;
                    margin: 0;
                    img {
                        width: 16px;height: 16px;
                    }
                }
                .call {
                    position: absolute;
                    .btn-select(69px,36px,true);
                    bottom: 0;
                    right: 0;
                }
                .call-disable {
                    background: @color-c7;
                    color: @color-c2
                }
            }
        }
    }
}
</style>
