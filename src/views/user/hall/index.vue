<template>
    <layout-view class="hall-bg">
        <div
            style="z-index:2"
            :style="getTitlePadding()+getBackgroundColor()"
            slot="header">
            <c-header
                class="hall-header"
                :isLight="false"
                :left-arrow="true"
                :showBorderBottom="false"
                :pageOutStatus="!isFromWeb"
            >
                <div v-show="!isInSearch" slot="title" :class="{'color-black':alpha>=1}">我的展厅</div>
                <template slot="left" tag="div">
                    <img class="header-img" :src="alpha<1?backImageWhite:backImageBlack"/>
                </template>
                <template slot="right" tag="div">
                    <div class="searchContain" v-show="isInSearch">
                        <form action="/">
                            <search
                                v-model="searchKey"
                                :placeholder="menuIndex === 1 ? '搜索收藏样衣' : '搜索组货清单'"
                                show-action
                                shape="round"
                                :left-icon="headerSearchImg_gray"
                                :clearable="false"
                                @cancel="handleCancel"
                                @input="handleRefresh"
                            >
                                <template slot="right-icon">
                                    <img
                                        :src="clearIcon"
                                        style="width:0.2rem;height:0.2rem;object-fit:cover"
                                        v-show="searchKey.length > 0"
                                        alt=""
                                        @click="handleSearchClear"
                                    />
                                </template>
                            </search>
                        </form>
                    </div>
                    <!-- <img
                      class="header-img"
                      v-show="!isInSearch"
                      :src="headerSearchImg"
                      @click="handleClickSearchIcon"
                    /> -->
                </template>
            </c-header>
        </div>

        <div class="exhibit-contain">
            <!--<div class="test-agcency-contain">
              <div :class="['test-agency', 'test']" @click="handleClickTest">
                <div>
                  <p>在线测款</p>
                  <p style="font-weight:400">预测款式趋势</p>
                </div>
                <img :src="testImage" alt="" />
              </div>
              <div :class="['test-agency', 'agency']" @click="handleGoDelegate">
                <div>
                  <p>加盟代理</p>
                  <p>低至2.8折采购价</p>
                </div>
                <img :src="agencyImage" alt="" />
              </div>
            </div>-->

            <img src="../../../themes/images/app/bg_exhibition_top.png"/>

            <c-list
                ref="productlist"
                class="list-insert"
                :style="getBottomOffset(0)"
                v-if="menuIndex === 1 && showList"
                :loading="loading"
                :finished="finished"
                finished-text="已到底，没有更多数据"
                emptyType="hallEmpty"
                emptyDesc="哎呀～收藏样衣是空的"
                :listItems="datas"
                @load-data="handleMore"
            >
                <div class="productList">
                    <div
                    class="item"
                    v-for="(item, index) in datas"
                    :key="item.productCode"
                    :class="[index % 2 === 0 ? 'margin-left-16' : 'margin-right-16']"
                    @click.stop="handleSelectProduct(item)"
                >
                    <img
                        class="itemSelIcon"
                        v-show="isManageState"
                        :src="isManageState ? getSelectStatus(item) ? select_sel : select_def : ''"
                        alt=""
                    />
                    <img class="item-main-pic" :src="item.mainPic" alt=""/>
                    <p class="margin-l-r-12 margin-top-12">{{ item.productName }}</p>
                    <div class="retail-price margin-l-r-12 margin-top-8">
                        <span class="flag">¥</span>
                        <span class="number">{{ cashFormat(item.retailPrice) }}</span>
                        <span class="label">建议零售价</span>
                    </div>
                    <div class="tsh-price margin-l-r-12 margin-top-4">
                        <span class="flag">¥</span>
                        <span class="number">{{ cashFormat(item.tshPrice) }}</span>
                    </div>
                    <div class="button margin-l-r-12 margin-top-8" @click="handleSelectProduct(item)">立即购买</div>
                </div>
                </div>
            </c-list>
            <c-list
                ref="grouplist"
                class="list-insert"
                :style="getBottomOffset(0)"
                v-else-if="menuIndex == 0 && showList"
                :loading="loading"
                :finished="finished"
                finished-text="已到底，没有更多数据"
                emptyType="groupEmpty"
                emptyDesc="哎呀～清单是空的"
                :listItems="groupDatas"
                @load-data="handleMore"
            >
                <div class="groupList">
                    <div
                    class="groupItemContain"
                    :class="{ 'groupItemContain-manage': isManageState }"
                    v-for="item in groupDatas"
                    :key="item.groupGoodsId"
                    @click="handleSelectProduct(item)"
                >
                    <section class="groupIconContain">
                        <img
                            class="groupSelIcon"
                            v-show="isManageState"
                            :src="isManageState ? getSelectStatus(item) ? select_sel : select_def : ''"
                            alt=""
                        />
                    </section>
                    <group-item :groupGood="item"/>
                </div>
                </div>
            </c-list>
            <manage-view ref="manageView">
                <template>
                    <div class="deleteContain">
                        <div class="select" @click="handleSelectAll">
                            <p>
                                <img :src="isSelectAll ? select_sel : select_def" alt=""/>
                                <span>全选</span>
                            </p>
                        </div>
                        <section class="deleteBtn" @click="handleDeletes">
                            删除{{ selectItems.length > 0 ? `(${selectItems.length})` : '' }}
                        </section>
                    </div>
                </template>
            </manage-view>
        </div>

        <div class="sticky-contain" :style="getTabTop()+getBackgroundColor()" :class="{'color-black':alpha>=1}">
            <div class="menu">
                <section
                    :class="['menu-item', menuIndex === 0 ? 'item-select' : 'item-default']"
                    @click="handleGroupList">
                    组货清单
                    <!--<span v-if="menuIndex === 0"></span>-->
                </section>
                <section
                    :class="['menu-item', menuIndex === 1 ? 'item-select' : 'item-default']"
                    @click="handleCollectList"
                >
                    收藏样衣
                    <!--<span v-if="menuIndex === 1"></span>-->
                </section>
            </div>
            <div class="manage" @click="handleManage">
                {{ isManageState ? '完成' : '管理' }}
            </div>
            <section class="deleteBtn" @click="handleDeletes">
              删除{{ selectItems.length > 0 ? `(${selectItems.length})` : "" }}
            </section>
          </div>
      <div class="loading_contain" >
        <div class="loadding_anim" ref="loadding_anim"></div>
        <p>加载中...</p>
      </div>
  </layout-view>
</template>

<script>
import { Search } from 'vant'
import cash from '@/views/user/hall/cashFormat.js'
import ManageView from './manageView.vue'
import groupItem from './groupItem.vue'
import utils from 'utils'
import lottie from 'lottie-web'
import favAnmData from '@/utils/IPX_loading.json'
// import EmptyView from '../../error/emptyView.vue'
// import Clist from 'components/c-list/list.vue'
export default {
    components: {
        ManageView,
        groupItem,
        Search
    },
    props: {},
    data() {
        return {
            showList: false,
            isFromWeb: true,
            isInSearch: false,
            searchKey: '',
            isManageState: false, // 是不是在管理状态
            selectItems: [], // 保存选中的item
            isSelectAll: false, // 是否点击选中全部
            datas: [], // 样衣数据源
            groupDatas: [], // 组货数据源
            pageNo: 0, // 当前页码
            pageSize: 10, // 每页请求数
            finished: false, // 加载完标识
            loading: false, // 加载更多标识
            menuIndex: 0, // 栏目flag 1=样衣 0=组货清单
            isStickyTop: false, // 是否吸顶
            offsetY: 0,
            marginTop: 0,
            flag: false,
            alpha: 0,
            headerSearchImg: require('@/themes/images/app/icon_nav_search_white@3x.png'),
            headerSearchImg_gray: require('@/themes/images/app/icon_search_gray.png'),
            clearIcon: require('@/themes/images/app/control_delete.png'),
            backImageWhite: require('@/themes/images/app/icon_nav_back_white@3x.png'),
            backImageBlack: require('@/themes/images/app/icon_nav_back1_def@3x.png'),
            testImage: require('@/themes/images/app/icon_exhibition_survey.png'),
            agencyImage: require('@/themes/images/app/icon_exhibition_agent.png'),
            select_def: require('../../../themes/images/groupGoods/checkbox_default.png'),
            select_sel: require('../../../themes/images/groupGoods/selected_icon.png')
        }
    },
    watch: {
        datas(val) {
            /// 全选状态下 全部选中
            if (this.isSelectAll && this.menuIndex === 1) {
                this.selectItems = JSON.parse(JSON.stringify(val))
            }
        },
        groupDatas(val) {
            if (this.isSelectAll && this.menuIndex === 0) {
                this.selectItems = JSON.parse(JSON.stringify(val))
            }
        },
        selectItems(val) {
            // 选中的数量跟数据源一样 标示为全选
            if (this.selectItems.length > 0) {
                this.isSelectAll =
                    this.menuIndex === 1
                        ? this.selectItems.length === this.datas.length
                        : this.selectItems.length === this.groupDatas.length
            } else {
                this.isSelectAll = false
            }
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
            this.isInSearch = false
            this.searchKey = ''
            this.resetParams()
            this.handleRefresh()
        }
    },
    methods: {
        getTitlePadding() {
            let baseParams = utils.getStore('baseParams')
            let statusBarHeight = Number(baseParams.statusBarHeight) / 100
            let paddingTop = ''
            if (baseParams.platform === 'ios') {
                if (Number(baseParams.statusBarHeight) > 20) {
                    paddingTop = Number(statusBarHeight) + 'rem'
                } else {
                    paddingTop = statusBarHeight + 'rem'
                }
            } else {
                paddingTop = statusBarHeight + 'rem'
            }
            return `padding-top:${paddingTop};`
        },
        getBackgroundColor() {
            return `background:rgba(255,255,255,${this.alpha});`
        },
        getTabTop() {
            let baseParams = utils.getStore('baseParams')
            let statusBarHeight = (Number(baseParams.statusBarHeight) + 44) / 100

            if (baseParams.platform === 'ios') {
                if (Number(baseParams.statusBarHeight) > 20) {
                    this.marginTop = Number(statusBarHeight) + 'rem'
                } else {
                    this.marginTop = statusBarHeight + 'rem'
                }
            } else {
                this.marginTop = statusBarHeight + 'rem'
            }
            return `margin-top:${this.marginTop};`
        },
        handleAdjustHeaderBg() {
            let baseParams = utils.getStore('baseParams')
            if (!baseParams.isIphoneX) {
                return 'background-size:100% 1.98rem'
            }
        },
        cashFormat(price) {
            return cash.changeFormat(price)
        },
        handleSearchClear() {
            this.searchKey = ''
            this.handleRefresh()
        },
        // 是否iPhoneX底部
        getBottomOffset(offset) {
            return `background:rgba(255, 255, 255, ${this.alpha})`
        },
        handleClickTest() {
            window.sa.track('IPX_WEB', {
                page: 'userHall', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'testOnline' // 按钮唯一标识，取个语义化且不重名的名字
            })
            this.$toast('功能即将开启，请耐心等待')
        },
        handleGoDelegate() {
            window.sa.track('IPX_WEB', {
                page: 'userHall', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'hallLeague' // 按钮唯一标识，取个语义化且不重名的名字
            })
            const params = {
                jumpUrl: 'goDelegate://'
            }
            utils.postMessage('', params)
        },
        // 搜索
        handleClickSearchIcon() {
            this.isInSearch = true
        },
        // 取消搜索
        handleCancel() {
            this.isInSearch = false
        },
        /// 点击商品
        handleSelectProduct(item) {
            if (this.isManageState) {
                this.handleSelectItem(item)
            } else if (this.menuIndex === 1) {
                /// 详情？
                window.sa.track('IPX_WEB', {
                    page: 'userHall', // 页面名字
                    type: 'click', // 固定参数，表明是点击事件
                    event: 'hallClickGroupProductItem' // 按钮唯一标识，取个语义化且不重名的名字
                })
                const params = {
                    jumpUrl: 'productDetail://',
                    productCode: item.productCode
                }
                utils.postMessage('', params)
            } else if (this.menuIndex === 0) {
                window.sa.track('IPX_WEB', {
                    page: 'userHall', // 页面名字
                    type: 'click', // 固定参数，表明是点击事件
                    event: 'hallGroupDetail' // 按钮唯一标识，取个语义化且不重名的名字
                })
                this.$router.push({
                    path: '/hall/groupListDetail',
                    query: {
                        groupId: item.groupGoodsId
                    }
                })
            }
        },
        /// 选择单个样衣
        handleSelectItem(item) {
            let isContain = this.getSelectStatus(item)
            if (!isContain) {
                this.selectItems.push(item)
            } else if (this.menuIndex === 1) {
                // 收藏
                this.selectItems = this.selectItems.filter(
                    obj => obj.collectId !== item.collectId
                )
            } else if (this.menuIndex === 0) {
                // 组货
                this.selectItems = this.selectItems.filter(
                    obj => obj.groupGoodsId !== item.groupGoodsId
                )
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
                    if (obj.groupGoodsId === item.groupGoodsId) {
                        return true
                    }
                })
            }
        },
        /// 全选
        handleSelectAll() {
            this.isSelectAll = !this.isSelectAll
            if (this.isSelectAll && this.menuIndex === 1) {
                this.selectItems = JSON.parse(JSON.stringify(this.datas))
            } else if (this.isSelectAll && this.menuIndex === 0) {
                this.selectItems = JSON.parse(JSON.stringify(this.groupDatas))
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
            this.resetParams()
            window.sa.track('IPX_WEB', {
                page: 'userHall', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'hallCollectList' // 按钮唯一标识，取个语义化且不重名的名字
            })
            this.showList = false
            // Toast.loading({
            //     message: '加载中...',
            //     forbidClick: true
            // })
            lottie.play()
            this.menuIndex = 1
            this.handleResetOffset()
        },
        handleGroupList() {
            this.resetParams()
            window.sa.track('IPX_WEB', {
                page: 'userHall', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'hallGroupList' // 按钮唯一标识，取个语义化且不重名的名字
            })
            this.showList = false
            lottie.play()
            this.menuIndex = 0
            this.handleResetOffset()
        },
        handleResetOffset() {
            this.$nextTick(() => {
                document.querySelector('.exhibit-contain').scrollTop = 0
            })
            this.alpha = 0
        },
        // 监听滚动
        handleScroll() {
            window.addEventListener(
                'scroll',
                () => {
                    // if (this.menuIndex === 1) {
                    //     this.$refs.productlist.check()
                    // } else {
                    //     this.$refs.grouplist.check()
                    // }

                    // let scrollTop =
                    //     document.querySelector('.contain') &&
                    //     document.querySelector('.contain').scrollTop
                    // let offsetTop =
                    //     document.querySelector('.sticky-contain') &&
                    //     document.querySelector('.sticky-contain').offsetTop
                    // this.isStickyTop = scrollTop >= offsetTop
                    // if (!this.isStickyTop) {
                    //     this.offsetY = offsetTop
                    //     this.flag = false
                    // } else {
                    //     if (this.offsetY + 200 * window.devicePixelRatio <= scrollTop) {
                    //         this.flag = true
                    //     } else {
                    //         this.flag = false
                    //     }
                    // }
                    let element = document.querySelector('.exhibit-contain')
                    let scrollHeight = element.scrollTop
                    if (scrollHeight > 200) {
                        scrollHeight = 200
                    }
                    this.alpha = scrollHeight / 200
                    // console.log(scrollHeight + ', alpha = ' + this.alpha + ', index = ' + this.menuIndex)
                }, true)
        },
        resetParams() {
            this.pageNo = 1
            this.finished = false
            this.loading = false
            this.alpha = 0
        },
        setSuccessStatus() {
            // Toast.clear()
            lottie.stop()
            this.showList = true
            this.loading = false
        },
        setFailureStatus() {
            // Toast.clear()
            lottie.stop()
            this.showList = true
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
        handleRequest() {
            const params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                productName: this.searchKey
            }
            this.loading = true
            this.$api.hall
                .getHallCollectList(params)
                .then(res => {
                    if (res.code === 0) {
                        if (res.data.productList && res.data.productList instanceof Array) {
                            if (this.pageNo === 1) {
                                this.datas = res.data.productList
                            } else {
                                this.datas = this.datas.concat(res.data.productList)
                            }
                            if (res.data.productList.length < this.pageSize) {
                                this.finished = true
                            } else {
                                this.finished = false
                            }
                        } else {
                            if (this.pageNo === 1) {
                                this.datas = []
                            }
                            this.finished = true
                        }
                    } else {
                        this.finished = true
                    }
                    this.setSuccessStatus()
                })
                .catch(() => {
                    this.setFailureStatus()
                })
        },
        handleDeletes() {
            if (this.menuIndex === 0) {
                this.handleGroupDeletes()
            } else {
                let idsArr = []
                if (this.selectItems.length > 0) {
                    this.selectItems.forEach(item => {
                        idsArr.push(parseInt(item.collectId))
                    })
                    const params = {
                        ids: idsArr
                    }
                    this.$api.hall
                        .deleteCollects(params)
                        .then(res => {
                            this.$toast('删除样衣成功')
                            this.datas = this.datas.filter(function (item) {
                                return idsArr.indexOf(item.collectId) < 0
                            })
                            this.selectItems = []
                        })
                        .catch(() => {
                        })
                }
            }
        },
        handleRequestForGroupList() {
            const params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                searchKeyWord: this.searchKey
            }
            this.loading = true

            this.$api.hall
                .getGroupGoods(params)
                .then(res => {
                    if (res.code === 0) {
                        if (res.data && res.data instanceof Array) {
                            if (this.pageNo === 1) {
                                this.groupDatas = res.data
                            } else {
                                this.groupDatas = this.groupDatas.concat(res.data)
                            }
                            if (res.data.length < this.pageSize) {
                                this.finished = true
                            } else {
                                this.finished = false
                            }
                        } else {
                            if (this.pageNo === 1) {
                                this.groupDatas = []
                            }
                            this.finished = true
                        }
                    } else {
                        this.finished = true
                    }
                    this.setSuccessStatus()
                })
                .catch(() => {
                    this.setFailureStatus()
                })
        },
        handleGroupDeletes() {
            let idsArr = []
            if (this.selectItems.length > 0) {
                this.selectItems.forEach(item => {
                    idsArr.push(parseInt(item.groupGoodsId))
                })
                const params = {
                    groupGoodsIds: idsArr
                }
                this.$api.hall
                    .deleteGroupGoods(params)
                    .then(res => {
                        this.$toast('删除组货衣杆成功')
                        this.groupDatas = this.groupDatas.filter(function (item) {
                            return idsArr.indexOf(item.groupGoodsId) < 0
                        })
                        this.selectItems = []
                    })
                    .catch(() => {
                    })
            }
        }
    },
    activated() {
        window.sa.track('IPX_WEB', {
            page: 'userHall', // 页面名字
            type: 'pageView', // 固定参数，不用改
            event: 'pageView' // 固定参数，不用改
        })
        // this.showList = false
        // setTimeout(() => {
        //     this.showList = true
        // }, 300)
        this.isStickyTop = false
        this.flag = false
        this.isInSearch = false
        this.searchKey = ''
        utils.postMessage('changeStatus', 'light')
        this.isFromWeb = this.$route.query.isFromWeb || false
        this.handleRefresh()
        this.handleScroll()
    },
    created() {
        this.showList = false
        // Toast.loading({
        //     message: '加载中...',
        //     forbidClick: true
        // })
    },
    mounted() {
        lottie.loadAnimation({
            container: this.$refs.loadding_anim, // 包含动画的dom元素
            renderer: 'svg', // 渲染出来的是什么格式
            loop: true, // 循环播放
            autoplay: true, // 自动播放
            animationData: favAnmData // 动画json的路径
        })
    },
    deactivated() {
        window.removeEventListener('scroll', () => {
        }, true) // 离开当前组件别忘记移除事件监听哦
    }
}
</script>

<style lang="less">
    .searchContain {
        .van-search {
            height: 46px;
            margin-left: 0px;
            width: calc(100vw - 55px);
            background: rgba(0, 0, 0, 0) !important;
        }

        .van-search__action {
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            line-height: 20px;
            padding-right: 0;
            background: rgba(255, 255, 255, 0);
        }

        .van-field__right-icon {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .layout__content {
        position: absolute !important;
        left: 0;
        top: 0;
    }

    .van-list__finished-text {
        width: 100%;
    }

    .van-loading__text {
        width: 100%;
    }

    .waterFall {
        background: transparent !important;
    }

    .van-list__loading {
        width: 100%;
        height: 44px;
    }

    .van-loading__spinner--circular {
        width: 16px !important;
        height: 16px !important;
    }
</style>

<style lang="less" scoped>

    .margin-left-16 {
        margin-left: 16px;
    }

    .margin-right-16 {
        margin-right: 16px;
    }

    .header-img {
        display: inline-block;
        vertical-align: middle;
        width: 26px;
        height: 26px;
    }

    .hall-bg {
        padding-top: 0!important;
    }

    .color-black {
        color: @color-c1 !important;
    }

    .hall-header {
        background: rgba(0, 0, 0, 0);
    }

    .c-header {
        margin-bottom: 0!important;
    }

    .test-agcency-contain {
        height: 60px;
        position: relative;
        z-index: 3;
        background: rgba(0, 0, 0, 0);
    }

    .sticky-contain {
        width: 100%;
        position: sticky;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: white;
        align-items: center;
        height: 60px;
        top: 0;
        z-index: 5;

        .menu {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-left: 16px;

            .menu-item {
                font-size: 20px;
                font-weight: bold;
                line-height: 28px;
                position: relative;

                &:last-child {
                    margin-left: 24px;
                }

                span {
                    width: 12px;
                    height: 12px;
                    background: rgba(250, 217, 97, 1);
                    border-radius: 6px;
                    position: absolute;
                    top: 0;
                    right: -6px;
                    z-index: -1;
                }
            }

            .item-default {
                font-size: 16px;
            }

            .item-select {
                font-size: 20px;
                font-weight: bold;
            }
        }

        .manage {
            width: 52px;
            height: 28px;
            border-radius: 16px;
            border: 1px solid @color-c5;
            text-align: center;
            line-height: 26px;
            font-size: 14px;
            margin-right: 13px;
        }
    }

    .margin-l-r-12 {
        margin-right: 12px;
        margin-left: 12px;
    }

    .margin-top-4 {
        margin-top: 4px;
    }

    .margin-top-8 {
        margin-top: 8px;
    }

    .margin-top-12 {
        margin-top: 12px;
    }

    .button {
        height: 32px;
        background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
        border-radius: 20px;
        text-align: center;
        color: white;
        font-weight: bold;
        line-height: 32px;
        font-size: 12px;
    }

    .exhibit-contain {
        /*position: relative; // background: #fff;*/
        height: 100%; //calc(100vh - 124px)  ;
        width: 100%;
        overflow: auto;
        padding-bottom: 24px;
        position: absolute;
        left: 0;
        top: 0;
        /*background-image: url("../../../themes/images/app/bg_exhibition_top.png");*/
        /*background-repeat: no-repeat;*/
        /*background-attachment: scroll!important;;*/
        /*background-size: 100%;*/

        .list-insert {
            margin-top: -60px;
        }

        >img {
            width: 100%;
            height: 185px;
        }

        .enableScroll {
            overflow: visible;
        }

        .disableScroll {
            overflow: visible !important;
        }

        .groupList {
            height: 100%;
            /*position: relative;*/
            /*background: #fff;*/

            .groupItemContain {
                position: relative;
                display: flex;
                flex-direction: row;
                align-content: flex-start;
                transition: all 0.3s ease;
                transform: translateX(0px);
            }

            .groupItemContain-manage {
                transform: translateX(36px);
            }

            .groupIconContain {
                vertical-align: middle;
                text-align: center;
            }

            .groupSelIcon {
                // display: block;
                /* position: absolute;
                      top: 15px;
                      right: 28px; */
                top: 50%;
                left: -20px;
                transform: translateY(-50% - 80px);
                position: absolute;
                width: 20px;
                height: 20px;
                vertical-align: middle;
            }
        }

        .productList {
            // height: 100%;//calc(100vh);
            // overflow: auto;
            background: transparent;
            display: flex; // height: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            padding-bottom: 36px;
            /*padding: 0 16px; // overflow: auto;*/
            justify-content: space-between;

            .item {
                width: calc(50vw - 23.5px);
                margin-top: 8px;
                margin-bottom: 8px;
                background: white;
                border-radius: 8px;
                padding-bottom: 12px;
                box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.08);
                position: relative;

                .itemSelIcon {
                    display: block;
                    position: absolute;
                    top: 4px;
                    right: 4px;
                    width: 20px;
                    height: 20px;
                }

                .item-main-pic {
                    object-fit: cover;
                    width: calc(50vw - 23.5px);
                    height: calc(50vw - 23.5px);
                    border-radius: 8px;
                }

                p {
                    color: @color-c1;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                .retail-price {
                    .flag {
                        font-size: @f12;
                        font-family: 'alibabaRegular';
                        color: @color-c1;
                    }

                    .number {
                        font-size: @f16;
                        font-weight: bold;
                        font-family: "alibabaBold";
                        color: @color-c1;
                    }

                    .label {
                        height: 14px;
                        padding: 1px 2px;
                        margin-left: 8px;
                        font-size: 10px;
                        color: @color-c3;
                        font-weight: bold;
                        border-radius: 0 4px 4px 4px;
                        background: rgba(244, 245, 247, 1);
                    }
                }

                .tsh-price {
                    color: @color-rc;

                    .flag {
                        font-size: @f12;
                        font-family: 'alibabaRegular';
                    }

                    .number {
                        font-size: @f16;
                        font-weight: bold;
                        font-family: "alibabaBold";
                    }
                }
            }
        }

        .test-agency {
            width: calc(50vw - 21.5px);
            height: 92px;
            margin-top: 20px;
            border-radius: 8px;
            display: flex;
            flex-direction: row;
            position: relative;
            box-shadow: 0px 2px 16px 0px rgba(33, 44, 98, 0.06);

            img {
                object-fit: cover;
                position: absolute;
                right: 0;
                bottom: 0;
                width: 56px;
                height: 56px;
            }

            p {
                margin-left: 16px;
                margin-top: 4px;
                font-size: 12px;
                line-height: 16px;
                font-weight: bold;
                color: @color-c4;

                &:first-child {
                    font-size: 18px;
                    font-weight: bold;
                    color: @color-c1;
                    line-height: 26px;
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
                    color: @color-rc;
                }
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
                font-size: 11px;
                color: @color-c1; // height: 49px;
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
                width: 78px;
                height: 40px;
                border-radius: 20px;
                background: @color-rc;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
                line-height: 40px;
                text-align: center;
            }
        }
    }

  .loading_contain {
    width: 55px;
    height: 70px;
    margin-top: 30%;
    margin-left: 40%;
    .loadding_anim {
      width: 50px;
      height: 40px;
      margin-top: 0;
    }
    > p {
      font-size: 14px;
      line-height: 20px;
      color: @color-c3;
      margin-top: 10px;
    }
  }

</style>
