<template>
<layout-view style="background:#F9FAFC">
    <c-header class="header" slot="header" :left-arrow="false" :pageOutStatus='true'>
        <div class="title" slot="title">
            <div class="titleContain">
                <span :class='["title-slider",currentTab==1?"title-slider-right":"title-slider-left"]'></span>
                <section :class='[currentTab==1?"title-default":"title-select"]' @click="handleLeft">商品特征</section>
                <section :class='[currentTab==0?"title-default":"title-select"]' @click="handleRight">客户特征</section>
            </div>
        </div>
    </c-header>
    <!-- 客户特征开始 -->
    <div class="container" :style="getBottomOffset(75)" v-if="currentTab === 1">
        <select-box v-for="item in curCategory" :key="item.id" :isSlot='item.imageUrl.length > 0' :items="item.labels" :sectionTitle="item.labelCategoryName" :itemBoxClass='item.imageUrl.length > 0?"image-box customer-box":""' :itemClass='item.labelCategoryName === "消费偏好" ? "item-auto": item.imageUrl.length > 0?"image-item":""'
            sectionSubTitle="(可多选)">
            <template #selectItem='slotProps'>
                <img class="image-img" :src="slotProps.item.imageUrl">
                <p class="image-info">{{slotProps.item.labelName}}</p>
                <img v-if="slotProps.item.isSelected" class="check-box" src="~images/groupGoods/selected_icon.png"/>
            </template>
        </select-box>

    </div>
    <!-- 客户特征结束 -->

    <!-- 商品特征开始 -->
    <div class="container" :style="getBottomOffset(75)" v-if="currentTab === 0">
        <select-box v-for="item in curCategory" :key="item.id" :isSlot='item.imageUrl.length > 0' :items="item.labels"  :sectionTitle="item.labelCategoryName" :dataSource='item' :itemBoxClass='item.imageUrl.length > 0 ?"image-box category-box":""' :itemClass='item.imageUrl.length > 0 ?"image-item":""' sectionSubTitle="(可多选)">
                <template #selectItem="slotProps">
                    <img class="image-img" :src="slotProps.item.imageUrl">
                    <p class="image-name">{{slotProps.item.labelName}}</p>
                    <img v-if="slotProps.item.isSelected" class="check-box-img" src="~images/groupGoods/selected_icon.png" />
                </template>
        </select-box>
    </div>
    <!-- 商品特征结束 -->
    <div class="bottom-btn" @click="handleSubmit">{{"一键开启组货"}}</div>
  </layout-view>
</template>

<script>
import SelectBox from '../common/selectBox.vue'
import utils from 'utils'

export default {
    components: {
        SelectBox
    },
    data() {
        return {
            minPrice: '',
            maxPrice: '',
            categoryList: [], // 品类列表
            season: [{
                icon: require('@/themes/images/groupGoods/pic_spring.png')
                // name: '春',
                // isSelected: false
            },
            {
                icon: require('@/themes/images/groupGoods/pic_summer.png')
                // name: '夏',
                // isSelected: false
            },
            {
                icon: require('@/themes/images/groupGoods/pic_autumn.png')
                // name: '秋',
                // isSelected: false
            },
            {
                icon: require('@/themes/images/groupGoods/pic_winter.png')
                // name: '冬',
                // isSelected: false
            }
            ],
            customerGroupList: [{
                icon: require('@/themes/images/groupGoods/shaonian.png')
                // age: '18岁以下',
                // isSelected: false
            },
            {
                icon: require('@/themes/images/groupGoods/qingnian.png')
                // age: '18~25岁',
                // isSelected: false
            },
            {
                icon: require('@/themes/images/groupGoods/haonian.png')
                // age: '26~38岁',
                // isSelected: false
            },
            {
                icon: require('@/themes/images/groupGoods/zhongnian.png')
                // age: '39~46岁',
                // isSelected: false
            },
            {
                icon: require('@/themes/images/groupGoods/laonian.png')
                // age: '46岁以上',
                // isSelected: false
            }
            ],
            currentTab: 0,
            tabs: [{
                name: 0,
                title: '商品特征'
            },
            {
                name: 1,
                title: '客户特征'
            }
            ],
            headerSearchImg: require('@/themes/images/groupGoods/header_search.png'),
            productCategory: [],
            customerCategory: [],
            allLabels: [],
            curCategory: []
        }
    },
    watch: {
        currentTab(val) {
            this.allLabels = []
            this.curCategory = []
            this.getSearchLists()
        }
    },
    created() {
        this.getSearchLists()
    },
    activated() {
        window.sa.track('IPX_WEB', {
            page: 'groupFilter', // 页面名字
            type: 'pageView', // 固定参数，不用改
            event: 'pageView' // 固定参数，不用改
        })
        utils.postMessage('changeStatus', 'default')
    },
    methods: {
        handleClickExpand(item) {
            // this.curCategory.forEach(citem => {
            //     if (item.labelCategoryName === citem.labelCategoryName) {
            //         citem.isExpand = !citem.isExpand
            //         this.$set(citem,'isExpand',!citem.isExpand)
            //         debugger
            //     }
            // })
            // this.$set(item,'isExpand',!item.isExpand)

            item.isExpand = !item.isExpand
        },
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleSubmit() {
            window.sa.track('IPX_WEB', {
                page: 'groupFilter', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'startGroup' // 按钮唯一标识，取个语义化且不重名的名字
            })
            let allCategory = JSON.parse(JSON.stringify(this.curCategory))
            allCategory.forEach(item => {
                item.labels = item.labels.filter(item => item.isSelected === true)
            })
            allCategory = allCategory.filter(item => item.labels.length > 0)
            if (allCategory.length > 0) {
                const params = {
                    labels: allCategory,
                    searchType: this.currentTab + 1
                    // pageNo: 1,
                    // pageSize: 100
                }
                utils.setStore('searchParams', params)

                let href = window.location.href
                let addresses = href.split('groupMain')
                utils.postMessage('page_in', { 'jumpUrl': addresses[0] + 'groupGoods/aiGroup' })
            } else {
                this.$toast('至少选择一个标签进行组货')
            }
        },
        getSearchLists() {
            const params = {
                searchType: this.currentTab + 1
            }
            this.$api.groupGoods.getSearchListsAjax(params).then((data) => {
                let ret = data.labels // 分类列表
                this.curCategory = ret

                this.curCategory && this.curCategory.length && this.curCategory.forEach((kindItem) => {
                    if (kindItem.imageUrl === undefined) {
                        kindItem.imageUrl = ''
                    }
                    if (kindItem.imageUrl === '1') {
                        kindItem.labels.map((item, index) => {
                            item.imageUrl = this.season[index].icon
                        })
                    } else if (kindItem.imageUrl === '2') {
                        kindItem.labels.map((item, index) => {
                            item.imageUrl = this.customerGroupList[index].icon
                        })
                    }
                    kindItem.isExpand = false
                    kindItem.hasExpand = kindItem.labels.length > 8
                    kindItem.labels = kindItem.labels.map((item, index) => {
                        // item.imageUrl = this.season[index].icon
                        return {
                            ...item,
                            isSelected: false
                        }
                    })
                    // this.allLabels = this.allLabels.concat(kindItem.labels)
                    // this.allLabels = this.allLabels.map((item) => {
                    //     return {
                    //         ...item,
                    //         isSelected: false
                    //     }
                    // })
                    // const labelCode = kindItem.labelCategoryCode // 类别code
                    // switch (labelCode) {
                    // case '1': // 品类
                    //     this.categoryList = kindItem.labels.concat(kindItem.labels) // 选项列表
                    //     break
                    // }
                })
            })
        },
        selectLabels(item, index, type) {
            let isSelected = !item.isSelected
            const target = this[type][index]
            this.$set(target, 'isSelected', isSelected)
        },
        handleLeft() {
            this.currentTab = 0
            window.sa.track('IPX_WEB', {
                page: 'groupFilter', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'groupFilterProduct' // 按钮唯一标识，取个语义化且不重名的名字
            })
            this.season = this.season.map((item) => {
                return {
                    ...item,
                    isSelected: false
                }
            })
        },
        handleRight() {
            this.currentTab = 1
            window.sa.track('IPX_WEB', {
                page: 'groupFilter', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'groupFilterClient' // 按钮唯一标识，取个语义化且不重名的名字
            })
            this.customerGroupList = this.customerGroupList.map((item) => {
                return {
                    ...item,
                    isSelected: false
                }
            })
        }
    }
}
</script>

<style lang="less">
.goods-group-tab {
    .van-tabs__line {
        background-color: #3C5CF6;
        margin-bottom: 4px;
    }
    .van-tab {
        font-weight: 700;
    }
}
</style>

<style lang="less" scoped>
.header-img {
    display: inline-block;
    vertical-align: middle;
    width: 26px;
    height: 26px;
}
.header {
    background: @color-c8;
    height: 58px;
    .title {
        // margin: auto 0;
        // height: 100%;
        height: 40px;
    }
    .titleContain {
        width: 160px;
        height: 34px; // background: #fff;
        background: white;
        border-radius: 16px;
        border: 1px solid #E6E6E6;
        position: relative;
        margin: 6px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        section {
            display: inline-block;
            width: 50%;
            line-height: 32px;
            height: 32px;
            font-size: 14px;
            font-weight: 500;
            z-index: 200;
        }
        .title-select {
            color: #fff;
        }
        .title-default {
            color: @color-c1;
        }
        .title-slider {
            position: absolute;
            top: 0;
            transition: left 0.3s;
            width: 80px;
            height: 32px;
            background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
            border-radius: 16px;
            z-index: 100;
        }
        .title-slider-left {
            left: 0
        }
        .title-slider-right {
            left: 80px;
        }
    }
}
.container {
    padding: 0 16px;
    height: 100%; //calc(100vh - 60px);
    overflow: auto;
    //   padding-bottom: 60px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #fff;
    .item-wrapper {
        position: relative;
        margin-bottom: 32px;
        .title {
            padding-bottom: 13px;
            font-size: 14px;
            font-weight: 500;
            color: @color-c2;
            line-height: 20px;
            >span {
                margin-left: 4px;
                color: #b2b5c1;
                font-size: 12px;
            }
        }
        .item-box {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .item {
                margin-bottom: 12px;
                margin-right: 11px;
                width: 77px;
                height: 28px;
                font-size: 12px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 700;
                text-align: center;
                color: rgba(26, 26, 26, 1);
                line-height: 28px;
                background: rgba(249, 250, 252, 1);
                border-radius: 14px;
                &:nth-child(4) {
                    margin-right: 0;
                }
            }
        }
        .price-box {
            align-items: center;
            >input {
                width: 154px;
                height: 36px;
                text-align: center;
                background: rgba(244, 245, 247, 1);
                border-radius: 18px;
            }
            >span {
                padding: 0 12px;
            }
        }
    }
}

    .bottom-btn {
        .btn-select(calc(100vw - 176px),50px,true);
        position: fixed;
        bottom: 16px;
        font-size: 18px;
        font-weight: 700;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
        left:50%;
        transform:translateX(-50%);
    }

</style>
