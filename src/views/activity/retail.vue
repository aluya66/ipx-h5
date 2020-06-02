<template>
      <div style="padding-top:0" class="retail">

            <!--数据统计部分 start-->
            <div class="retail-top">
                <div class="t-title">
                    <img class="title_bg" src="@/themes/images/app/retail_title.png" />
                    <p>{{detail.companyName || ''}}</p>
                </div>
                <ul class="retail-ul">
                    <li>
                        <div class="li-title">员工注册总数(人)<p>{{caseNumerFormat(detail.registerTotal || 0)}}</p></div>
                    </li>
                    <li>
                        <div class="li-title">邀请注册总数(人)<p>{{caseNumerFormat(detail.inviteRegisterTotal || 0)}}</p></div>
                    </li>
                    <li>
                        <div class="li-title">总销售额(元)<p>{{cashFormat(detail.sellPriceTotal || 0)}}</p></div>
                    </li>
                    <li>
                        <div class="li-title">总收益(元)<p>{{cashFormat(detail.earningsPriceTotal || 0)}}</p></div>
                    </li>
                </ul>

            </div>
            <!--数据统计部分 end-->
            <!--分销排行榜 start-->
            <div class="rank">
                <div class="rank-tab">
                    <div class="r-tab-item" :class="[tabIndex == 0 ?'active' :'']" @click="tabAct(0)">
                         <p class="item_title">销售总额排行</p>
                         <p class="item_describ">统计截止至每日17:00</p>
                    </div>
                    <div class="r-tab-item" :class="[tabIndex == 1 ?'active' :'']" @click="tabAct(1)">
                         <p class="item_title">今日销售额排行</p>
                         <p class="item_describ">昨日17:00-今日17:00</p>
                    </div>
                </div>
                <div class="rank-list" :style="{left:left}">
                    <div class="list-item">
                        <div class="t-header">
                             <div class="h-th w10 text-center">序号</div>
                             <div class="h-th w35 text-center">分销员</div>
                             <div class="h-th w25">邀请注册总数</div>
                             <div class="h-th w30">销售总额</div>
                        </div>
                        <ul class="rank-ul">
                           <li v-for="(item,index) in detail.totalTopList" :key="index">
                                 <div class="ul-number w10 text-center">{{index >=9  ? index + 1 : `0${index + 1}`}}</div>
                                  <div class="header-img w35">
                                      <img :src="item.avater" />
                                      <span>{{item.memberName}}</span>
                                  </div>
                                  <div class="r-people w25 text-center ">{{item.inviteRegisterTotal || 0}}人</div>
                                  <div class="r-price w30 text-center">¥<span>{{cashFormat(item.sellPriceTotal || 0)}}</span></div>
                            </li>
                             <div class="nodata" v-if="!noTotaldata">暂无数据</div>
                        </ul>
                    </div>
                    <div class="list-item">
                        <div class="t-header">
                             <div class="h-th w10 text-center">序号</div>
                             <div class="h-th w35 text-center">分销员</div>
                             <div class="h-th w25">今日邀请新增</div>
                             <div class="h-th w30">今日销售总额</div>
                        </div>
                        <ul class="rank-ul">
                            <li v-for="(item,index) in detail.todayTopList" :key="index">
                                 <div class="ul-number w10 text-center">{{index >= 9 ? index + 1 : `0${index + 1}`}}</div>
                                  <div class="header-img w35">
                                    <img :src="item.avater" />
                                      <span>{{item.memberName}}</span>
                                  </div>
                                  <div class="r-people w25 text-center ">{{item.inviteRegisterTotal || 0}}人</div>
                                  <div class="r-price w30 text-center">¥<span>{{cashFormat(item.todaysellPrice || 0)}}</span></div>
                            </li>
                            <div class="nodata" v-if="!noTodaydata">暂无数据</div>
                        </ul>
                    </div>
                </div>
            </div>
             <!--分销排行榜 end-->

      </div>
</template>

<script>
import cash from '@/views/user/hall/cashFormat.js'
export default {
    data() {
        return {
            left: 0,
            tabIndex: 0,
            noTodaydata: false,
            noTotaldata: false,
            detail: {}
        }
    },
    mounted () {
        document.title = '分销数据'
        // 根据不同的来源获取不同的数据
        let params = {
            companyName: this.$route.query.source || ''
        }

        this.$api.retail.getRetailTopList(params).then(
            res => {
                let data = res || {}
                this.detail = data
                this.noTodaydata = !!(data && data.todayTopList && data.todayTopList.length > 0)
                // if (!this.noTodaydata) {
                //     this.tabAct(1)
                // }
                this.noTotaldata = !!(data && data.totalTopList && data.totalTopList.length > 0)
            }
        )
    },
    methods: {
        cashFormat(price) {
            return cash.changeFormat(price)
        },
        caseNumerFormat(num) {
            return cash.changeNumberFormat(num)
        },
        // 切换tab
        tabAct(index) {
            this.tabIndex = index
            this.left = this.getLeft()
        },
        getLeft() {
            return -(this.tabIndex * 100) + '%'
        }
    }

}
</script>
<style lang="less">
.retail{
    background: url(../../themes/images/app/retail_bg.png) no-repeat;
    background-size:cover;
    overflow-y: scroll;
    padding-bottom: 50px;
    .retail-top{
        background: #fff;
        box-shadow:0px 2px 10px 0px rgba(33,55,98,0.2) inset,0px 1px 16px 0px rgba(60,122,246,0.3);
        border-radius:16px;
        padding: 16px;
        height:238px;
        margin: 170px 16px 0 16px;
        position: relative;
        z-index: 100;
        &::before{
            content: "";
            background: url(../../themes/images/app/icon_connect.png) no-repeat;
            background-size: contain;
            position: absolute;
            width:10px;
            height:44px;
            z-index: 100;
            top:222px;
            left: 52px;
        }
        &::after{
            content: "";
            background: url(../../themes/images/app/icon_connect.png) no-repeat;
            background-size: contain;
            position: absolute;
            width:10px;
            height:44px;
            z-index: 100;
            top:222px;
            right: 52px;
        }

        .t-title{
            width: 100%;
            position: relative;
            .title_bg{
                width:196px;
                height: 40px;
            }
            p{
                display: block;
                color:rgba(0,101,253,1);
                font-family:PingFangSC-Semibold,PingFang SC;
                font-weight:600;
                font-size:18px;
                line-height:24px;
                margin-top: -24px;
            }
        }
        .retail-ul{
            display:flex;
            flex-flow:wrap;
            width: 100%;
            li{
                width: 50%;
                margin-top:26px;
                .li-title{
                    color: #8A8C99;
                    line-height: 16px;
                    font-weight: 400;
                    font-size:12px;
                    font-family:PingFangSC-Regular,PingFang SC;

                    p{
                        color:@color-c1 ;
                        margin-top: 2px;
                        line-height: 30px;
                        font-size:24px;
                        font-family: "alibabaBold";
                    }
                }
                &:nth-child(2n){
                    position: relative;
                    &::before{
                        content: '';
                        position: absolute;
                        width: 1px;
                        height: 32px;
                        background:linear-gradient(90deg,rgba(227,226,230,0) 0%,rgba(227,226,230,1) 0%,rgba(227,226,230,1) 100%);
                        left: -16px;
                        top:6px;
                    }
                }

            }
        }

    }
    .rank{
        background: #FFFFFF;
        margin:12px 16px;
        border-radius: 16px;
        overflow: hidden;
        .rank-tab{
            height: 95px;
            background:linear-gradient(180deg,rgba(250,225,97,1) 0%,rgba(252,245,206,1) 100%);
            box-shadow:0px 2px 10px 0px rgba(33,44,98,0.12);
            display: flex;
            position: relative;
            z-index: 9;
            .r-tab-item{
                flex: 1;
                text-align: center;
                .item_title {
                    margin-top: 29px;
                    line-height: 22px;
                    color: #2A2B33;
                    font-weight:400;
                    font-size: 16px;
                    position: relative;
                    color:rgba(42,43,51,0.8);
                    z-index: 999;
                }
                &.active{
                    border-radius:16px 16px 0px 0px;
                    background:linear-gradient(180deg,rgba(249,250,252,1) 0%,rgba(255,255,255,1) 100%);
                    position: relative;
                    .item_title{
                        margin-top: 28px;
                        color:rgba(42,43,51,1);
                        font-size: 18px;
                        font-weight:bold;
                        line-height: 24px;
                    }
                    &::after{
                        content: '';
                        position: absolute;
                        background:#FCF2CE;
                        width: 126px;
                        height: 10px;
                        top:43px;
                        left: 50%;
                        margin-left: -63px;
                    }
                }
                .item_describ {
                    margin-top: 4px;
                    font-size:10px;
                    font-weight:400;
                    color:rgba(138,140,153,1);
                    line-height:14px;
                }

            }
        }
        .rank-list{
            margin-top: -10px;
            display: flex;
            position: relative;
            z-index: 999;
            overflow: hidden;
            width: 200%;
            transition: left 300ms ease-out 100ms;
            .w10{
                width: 10%;
            }
            .w25{
                width: 30%;
            }
            .w30{
                width: 30%;
            }
             .w35{
                width: 35%;
            }
            .text-center{
                text-align: center;
            }
            .list-item{
                width: 100%;
                min-height: 496px;
                .t-header{
                    height: 48px;
                    padding: 0 16px;
                    line-height: 48px;
                    font-size: 12px;
                    font-weight: 500;
                     border-radius:16px 16px 0px 0px;
                     color: #585B66;
                    display: -webkit-box;
                    background:linear-gradient(180deg,rgba(249,250,252,1) 0%,rgba(255,255,255,1) 100%);

                }
                .rank-ul{
                    background: #fff !important;
                    padding: 0 16px;
                    .nodata{
                        color: #585B66;
                        margin-top: 100px;
                        text-align: center;
                    }
                    li{
                        display: flex;
                        margin-bottom: 24px;
                        height: 40px;
                        line-height: 40px;
                        align-items: center;
                        .ul-number{
                            width: 28px;
                            height: 28px;
                            margin-right: 5px;
                            line-height: 28px;
                            font-size: 10px;
                            font-weight:500;
                           color:rgba(138,140,153,1);
                        }
                        &:nth-child(1){
                            .ul-number{
                                background: url(../../themes/images/app/rank-1.png) no-repeat center center;
                                background-size: contain;
                                color:#fff;
                            }
                        }
                        &:nth-child(2){
                             .ul-number{
                                background: url(../../themes/images/app/rank-2.png) no-repeat;
                                background-size: contain;
                                color:#fff;

                            }
                        }
                        &:nth-child(3){
                             .ul-number{
                                background: url(../../themes/images/app/rank-3.png) no-repeat;
                                background-size: contain;
                                color:#fff;
                                  font-family: "alibabaRegular";
                            }
                        }
                        .header-img{
                            display: flex;
                            justify-items: center;
                            align-items: center;
                            img{
                                width: 40px;
                                margin-right: 5px;
                                height: 40px;
                                border-radius: 50%;
                                border:1px solid #f0f0f0;
                                flex: 1;
                            }
                            span{
                                color: @color-c1;
                                font-weight: 500;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                display: block;
                                width: 70px;
                            }
                        }
                        .r-price{
                            color:@color-rc;
                            font-family: "alibabaBold";
                            font-size:12px;
                            span{
                                font-size: 18px;
                            }
                        }

                    }
                }
            }
        }
    }
}
</style>
