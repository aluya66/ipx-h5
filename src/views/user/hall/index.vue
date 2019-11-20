<template>
    <layout-view class="hall-bg">
    <c-header style="z-index:2" slot="header" class="hall-header" :isLight='false' :left-arrow="true">
        <div slot="title">我的展厅</div>
        <template slot="left" tag="div">
            <img class="header-img" :src="backImage" />
        </template>
        <template slot="right" tag="div">
            <img class="header-img" :src="headerSearchImg" />
        </template>
    </c-header>
    <div class="contain">
        <div class="test-agcency-contain">
            <div :class='["test-agency", "test"]'>
                <div>
                    <p>在线测款</p>
                    <p>预测款式趋势</p>
                </div>
                <img :src="testImage" alt="" />
            </div>
            <div :class='["test-agency", "agency"]'>
                <div>
                    <p>加盟代理</p>
                    <p>低至2.8折采购价</p>
                </div>
                <img :src="agencyImage" alt="" />
            </div>
        </div>

        <div id="stickyContain" class="sticky-contain" >
                <div class="menu">
                    <section :class='["menu-item" ,menuIndex == 0 ?"item-select":"item-default"]' @click="handleGroupList">组货清单
                        <span v-if="menuIndex == 0"></span>
                    </section>
                    <section :class='["menu-item",menuIndex == 1 ?"item-select":"item-default"]' @click="handleCollectList">收藏样衣
                        <span v-if="menuIndex == 1"></span>
                    </section>
                </div>
                <div class="manage" @click="handleManage">{{isManageState?"完成":"管理"}}</div>

        </div>
        <list
            ref="productlist"
            :class='["product-list",isStickyTop?"enableScroll":"disableScroll"]'
            v-if="menuIndex == 1"
            v-model="loading"
            :finished="finished"
            finished-text="已到底，没有更多数据"
            @load="handleMore"
        >
            <div class="item" v-for="item in datas" :key="item.productCode" @click="handleSelectProduct(item)">
                <img class="itemSelIcon" :src="isManageState?getSelectStatus(item)?select_sel:select_def : ''" alt="" >
                <img :src="item.mainPic" alt="">
                <p>{{item.productName}}</p>
                <h3>￥{{item.tshPrice}}</h3>
            </div>
        </list>
        <list
            ref="grouplist"
            :class='["groupList", isStickyTop?"enableScroll":"disableScroll"]'
            v-if="menuIndex == 0"
            v-model="loading"
            :finished="finished"
            finished-text="已到底，没有更多数据"
            @load="handleMore"
        >
            <div class="groupItemContain" v-for="item in groupDatas" :key="item" @click="handleSelectGroup(item)">
                <group-item />
                <img class="groupSelIcon" :src="isManageState?getSelectStatus(item)?select_sel:select_def : ''" alt="" >
            </div>
        </list>
        <manage-view ref="manageView">
            <template>
                <div class="deleteContain">
                    <div class="select" @click="handleSelectAll">
                        <p><img :src="isSelectAll?select_sel:select_def" alt=""><span>全选</span></p>
                    </div>
                    <section class="deleteBtn" @click="handleDeletes" >删除{{selectItems.length>0?`(${selectItems.length})` : '' }}</section>
                </div>
            </template>
        </manage-view>
    </div>
    </layout-view>
</template>

<script>
import { List } from 'vant'
import ManageView from './manageView.vue'
import groupItem from './groupItem.vue'

export default {
    components: {
        List,
        ManageView,
        groupItem
    },
    props: {

    },
    data () {
        return {
            isManageState: false, // 是不是在管理状态
            selectItems: [], // 保存选中的item
            isSelectAll: false, // 是否点击选中全部
            datas: [], // 样衣数据源
            groupDatas: [1], // 组货数据源
            pageNo: 1, // 当前页码
            pageSize: 10, // 每页请求数
            finished: false, // 加载完标识
            loading: false, // 加载更多标识
            menuIndex: 0, // 栏目flag 1=样衣 0=组货清单
            isStickyTop: false, // 是否吸顶
            offsetY: 0,
            headerSearchImg: require('@/themes/images/app/icon_nav_search_white@2x.png'),
            backImage: require('@/themes/images/app/icon_nav_back_white@2x.png'),
            testImage: require('@/themes/images/app/icon_exhibition_survey.png'),
            agencyImage: require('@/themes/images/app/icon_exhibition_agent.png'),
            select_def: require('../../../themes/images/groupGoods/checkbox_default.png'),
            select_sel: require('../../../themes/images/groupGoods/selected_icon.png')
        }
    },
    watch: {
        datas(val) {
            /// 全选状态下 全部选中
            if (this.isSelectAll) {
                this.selectItems = JSON.parse(JSON.stringify(val))
            }
        },
        selectItems(val) {
            // 选中的数量跟数据源一样 标示为全选
            this.isSelectAll = this.selectItems.length === this.datas.length
        },
        /// 观察管理状态切换
        isManageState(val) {
            if (!val) {
                this.selectItems = []
                this.isSelectAll = false
                this.$refs.manageView.maskClick()
            } else {
                this.$refs.manageView.showCustom()
            }
        },
        /// 观察栏目切换
        menuIndex(val) {
            this.isManageState = false
            this.selectItems = []
            this.isSelectAll = false
            this.isStickyTop = false
            this.resetParams()
            this.handleRefresh()
        }
    },
    computed: {

    },
    methods: {
        /// 点击商品
        handleSelectProduct(item) {
            if (this.isManageState) {
                this.handleSelectItem(item)
            } else {
                /// 详情？
            }
        },
        /// 选择单个样衣
        handleSelectItem(item) {
            let isContain = this.getSelectStatus(item)
            if (!isContain) {
                this.selectItems.push(item)
            } else if (this.menuIndex === 1) {
                // 收藏
                this.selectItems = this.selectItems.filter(obj => obj.collectId !== item.collectId)
            } else if (this.menuIndex === 0) {
                // 组货
                this.selectItems = this.selectItems.filter(obj => obj.groupId !== item.groupId)
            }
        },
        /// 获取样衣是否被选中状态
        getSelectStatus(item) {
            if (this.menuIndex === 1) {
                // 收藏
                return this.selectItems.some(obj => {
                    if (obj.collectId === item.collectId) {
                        return true
                    }
                })
            } else {
                // 组货
                return this.selectItems.some(obj => {
                    if (obj.groupId === item.groupId) {
                        return true
                    }
                })
            }
        },
        /// 全选
        handleSelectAll () {
            this.isSelectAll = !this.isSelectAll
            if (this.isSelectAll) {
                this.selectItems = JSON.parse(JSON.stringify(this.datas))
            } else {
                this.selectItems = []
            }
        },
        /// 点击管理
        handleManage() {
            this.isManageState = !this.isManageState
        },
        /// 切换栏目
        handleCollectList() {
            this.menuIndex = 1
            this.handleResetOffset()
        },
        handleGroupList() {
            this.menuIndex = 0
            this.handleResetOffset()
        },
        handleResetOffset () {
            if (this.isStickyTop) {
                this.$nextTick(() => {
                    document.querySelector('.contain').scrollTop = this.offsetY
                })
            }
        },
        // 监听滚动
        handleScroll () {
            window.addEventListener('scroll', () => {
                if (this.menuIndex === 1) {
                    this.$refs.productlist.check()
                } else {
                    // this.$refs.grouplist.check()
                }

                let scrollTop = document.querySelector('.contain').scrollTop
                let offsetTop = document.querySelector('#stickyContain').offsetTop
                console.log('offsetTop:', offsetTop)
                console.log('scrollTop:', scrollTop)
                this.isStickyTop = scrollTop >= offsetTop
                if (!this.isStickyTop) {
                    this.offsetY = offsetTop
                }
            }, true)
        },
        resetParams () {
            this.pageNo = 1
            this.finished = false
            this.loading = false
        },
        setSuccessStatus () {
            this.loading = false
        },
        setFailureStatus () {
            this.pageNo -= 1
            this.finished = true
            this.loading = false
        },
        // 刷新
        handleRefresh() {
            this.resetParams()
            if (this.menuIndex === 1) {
                this.handleRequest()
            } else {
                this.handleRequestForGroupList()
            }
        },
        // 加载更多
        handleMore() {
            if (this.menuIndex === 1) {
                if (this.datas.length > 0) {
                    this.pageNo += 1
                    this.handleRequest()
                }
            } else {
                if (this.groupDatas.length > 0) {
                    this.pageNo += 1
                    this.handleRequestForGroupList()
                }
            }
        },
        handleRequest () {
            const params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }
            this.loading = true

            this.$api.hall.getHallCollectList(params).then(res => {
                this.setSuccessStatus()
                if (res.productList && res.productList instanceof Array) {
                    if (this.pageNo === 1) {
                        this.datas = res.productList
                    } else {
                        this.datas = this.datas.concat(res.productList)
                    }
                    if (res.productList.length < this.pageSize) {
                        this.finished = true
                    } else {
                        this.finished = false
                    }
                } else {
                    this.finished = true
                }
            }).catch(() => {
                this.setFailureStatus()
            })
        },
        handleDeletes () {
            let idsArr = []
            if (this.selectItems.length > 0) {
                this.selectItems.forEach(item => {
                    idsArr.push(parseInt(item.collectId))
                })
                const params = {
                    ids: idsArr
                }
                this.$api.hall.deleteCollects(params).then(res => {
                    this.$toast('已删除')
                    this.datas = this.datas.filter(function (item) {
                        return idsArr.indexOf(item.collectId) < 0
                    })
                    this.selectItems = []
                }).catch(() => {

                })
            }
        },
        handleRequestForGroupList () {
            this.setSuccessStatus()
        }
    },
    activated() {
        // this.handleRefresh()
        this.handleScroll()
    },
    destroyed () {
        window.removeEventListener('scroll') // 离开当前组件别忘记移除事件监听哦
    }
}
</script>

<style lang="less">
    .product-list {
        display: flex;
        // height: 100%;
        background: #fff;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0 16px;
        overflow: auto;
        justify-content: space-between;
        margin-top: -1px;
        .van-list__finished-text {
            width: 100%;
        }
        .van-loading__text {
            width: 100%;
        }
        .van-list__loading {
            width: 100%;
            height: 44px;
        }
        .van-loading__spinner--circular {
            width: 16px !important;
            height: 16px !important;
        }
    }
</style>
<style lang='less' scoped>
.header-img {
  display: inline-block;
  vertical-align: middle;
  width: 26px;
  height: 26px;
}
.hall-bg {
    background-image :url('../../../themes/images/app/bg_exhibition_top.png');
    background-repeat:no-repeat;
    background-size:100% 212px;
}

.hall-header {
    background: rgba(0,0,0,0);
}
.test-agcency-contain {
    height: 138px;
    position: relative;
    z-index: 3;
    background: rgba(0,0,0,0);
}

.contain {
    position: relative;
    // background: #fff;
    height: 100%;
    overflow: auto;
    .enableScroll {
        overflow: scroll
    }
    .disableScroll{
        overflow: visible !important;
    }
    .groupList {
        height: 100%;
        position: relative;
        background: #fff;
        margin-top: -1px;
        .groupSelIcon {
            display: block;
            position: absolute;
            top: 15px;
            right: 28px;
            width: 20px;
            height: 20px;
        }
    }
    .product-list {
        height: 100%;//calc(100vh);
        overflow: auto;
        background: #fff;
        .item {
            width: calc(50vw - 23.5px);
            text-align: center;
            margin-top: 12px;
            position: relative;
            .itemSelIcon {
                display: block;
                position: absolute;
                top: 4px;
                right: 4px;
                width: 20px;
                height: 20px;
            }
            img {
                object-fit:cover;
                width: 100%;
                height: 220px;
                border-radius:4px;
            }
            p {
                margin: 5px 5px 0;
                line-height: 20px;
                color:@color-c1;
                border-radius:4px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            h3 {
                margin: 6px 5px 2px;
                line-height: 19px;
                font-size: @f16;
                font-weight:bold;
                padding-bottom: 12px;
            }
        }
    }
    .test-agency {
        width: calc(50vw - 21.5px);
        height: 92px;
        margin-top: 40px;
        border-radius:8px;
        display: flex;
        flex-direction: row;
        position: relative;
        box-shadow:0px 2px 16px 0px rgba(33,44,98,0.06);
        img {
            object-fit: scale-down;
            position: absolute;
            right: 0;
            bottom: 0;
        }
        p {
            margin-left: 16px;
            margin-top: 4px;
            font-size: 12px;
            line-height:16px;
            color: @color-c4;
            &:first-child {
                font-size:18px;
                font-weight:500;
                color:@color-c1;
                line-height:26px;
                margin: 16px 0 0 16px;
            }
        }
    }
    .test {
        float: left;
        margin-left: 16px;
        background: @color-ec-gray;
    }
    .agency {
        float: right;
        margin-right: 16px;
        background: @color-pink;
        p {
            &:last-child {
                color:@color-rc;
            }
        }
    }
    .sticky-contain {
        width: 100%;
        position:sticky;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        background: #fff;
        top: 0;
        z-index: 5;
        .menu {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-left: 16px;
            .menu-item {
                font-size:20px;
                font-weight:500;
                line-height:28px;
                position: relative;
                &:last-child {
                    margin-left: 24px;
                }
                span {
                    width:12px;
                    height:12px;
                    background:rgba(250,217,97,1);
                    border-radius: 6px;
                    position: absolute;
                    top: 0;
                    right: -6px;
                    z-index: -1;
                }
            }
            .item-default {
                color:@color-c1
            }
            .item-select {
                color:@color-ec
            }
        }
        .manage {
            width:52px;
            height:28px;
            border-radius:16px;
            border:1px solid @color-c5;
            text-align: center;
            line-height: 26px;
            margin-right: 13px;
        }
    }
    .deleteContain {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        height: 49px;
        .select {
            font-size:11px;
            color:@color-c1;
            // height: 49px;
            // line-height: 49px;
            // vertical-align: middle;
            text-align: center;
            img {
                vertical-align: middle;
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 8px;
            }
        }
        .deleteBtn {
            width:78px;
            height: 40px;
            border-radius: 20px;
            background:@color-rc;
            color:#fff;
            font-size:14px;
            font-weight:500;
            line-height:40px;
            text-align: center
        }
    }
}
</style>
