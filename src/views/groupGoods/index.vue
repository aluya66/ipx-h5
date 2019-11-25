<template>
  <layout-view>
    <c-header slot="header" :left-arrow="true">
      <div slot="title">智能组货</div>
    </c-header>
    <c-tabs
      class="goods-group-tab"
      :tabs="tabs"
      :line-width="'0.08rem'"
      :line-height="'0.05rem'"
      :title-active-color="'#3C5CF6'"
      :title-inactive-color="'#2A2B33'"
      :border="true"
      @change="onChangeTab"
    ></c-tabs>
    <!-- 客户特征开始 -->
    <div class="container" v-show="currentTab === 1">
        <!-- <select-box :items='customerGroupList' :isSlot='true' itemBoxClass="image-box customer-box" itemClass="image-item" sectionTitle="客户群体" sectionSubTitle="(可多选)">
            <template #selectItem='slotProps'>
                <img class="image-img" :src="slotProps.item.icon" />
                <p class="image-info">{{slotProps.item.age}}</p>
                <img v-if="slotProps.item.isSelected" class="check-box" src="~images/groupGoods/selected_icon.png"/>
            </template>
        </select-box> -->
        <select-box v-for="item in curCategory" :key="item.labelCategoryCode" :isSlot='item.imageUrl.length > 0' :items="item.labels" :sectionTitle="item.labelCategoryName" :itemBoxClass='item.imageUrl.length > 0?"image-box customer-box":""' :itemClass='item.imageUrl.length > 0?"image-item":""' sectionSubTitle="(可多选)" >
            <template #selectItem='slotProps'>
                <img class="image-img" :src="slotProps.item.imageUrl" />
                <p class="image-info">{{slotProps.item.labelName}}</p>
                <img v-if="slotProps.item.isSelected" class="check-box" src="~images/groupGoods/selected_icon.png"/>
            </template>
        </select-box>

    </div>
    <!-- 客户特征结束 -->

    <!-- 商品特征开始 -->
    <div class="container" v-show="currentTab === 0">
      <select-box v-for="item in curCategory" :key="item.labelCategoryCode" :isSlot='item.imageUrl.length > 0' :items="item.labels"  :sectionTitle="item.labelCategoryName" :itemBoxClass='item.imageUrl.length > 0 ?"image-box category-box":""' :itemClass='item.imageUrl.length > 0 ?"image-item":""' sectionSubTitle="(可多选)">
        <template #selectItem="slotProps">
              <img class="image-img" :src="slotProps.item.imageUrl" />
              <p class="image-name">{{slotProps.item.labelName}}</p>
              <img v-if="slotProps.item.isSelected" class="check-box-img" src="~images/groupGoods/selected_icon.png"/>
        </template>
      </select-box>

      <!-- <select-box :items='selectList' sectionTitle="季节" />
      <select-box :items='selectList' sectionTitle="风格" />
      <select-box :items='selectList' sectionTitle="材质" />
      <select-box :items='selectList' sectionTitle="色系" />
      <select-box :items='selectList' sectionTitle="厚度" /> -->
    </div>
    <!-- 商品特征结束 -->
    <div class="bottom-box">
      <div class="bottom-btn" @click="handleSubmit">{{"一键开启组货"}}</div>
    </div>
  </layout-view>
</template>
<script>
import components from 'components'
import SelectBox from '../common/selectBox.vue'

const { CTabs } = components
export default {
    components: {
        CTabs,
        SelectBox
    },
    data () {
        return {
            minPrice: '',
            maxPrice: '',
            categoryList: [], // 品类列表
            season: [
                {
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
            customerGroupList: [
                {
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
            tabs: [
                {
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
            this.getSearchLists()
        }
    },
    created() {
        this.getSearchLists()
    },
    methods: {
        handleSubmit() {
            let labels = []
            let allCategory = JSON.parse(JSON.stringify(this.curCategory))
            allCategory.forEach(item => {
                item.labels = item.labels.filter(item => item.isSelected === true)
                labels = labels.concat(item.labels)
            })
            let arr = labels.filter(item => item.isSelected === true)
            if (arr.length > 0) {
                const params = {
                    labels: arr,
                    searchType: this.currentTab + 1,
                    pageNo: 1,
                    pageSize: 100
                }
                this.$router.push({
                    path: '/user/aiGroup',
                    query: {
                        params: params
                    } })
            } else {
                this.$toast('至少选择一个标签进行组货')
            }
        },
        getSearchLists() {
            const params = {
                searchType: this.currentTab + 1
            }
            this.$api.groupGoods.getSearchListsAjax(params).then((data) => {
                let ret = data.labelCategories // 分类列表
                this.curCategory = ret

                ret.length && ret.forEach((kindItem) => {
                    if (kindItem.imageUrl === '1') {
                        kindItem.labels.map((item, index) => {
                            item.imageUrl = this.season[index]
                        })
                    } else if (kindItem.imageUrl === '2') {
                        kindItem.labels.map((item, index) => {
                            item.imageUrl = this.customerGroupList[index]
                        })
                    }
                    this.allLabels = this.allLabels.concat(kindItem.labels)
                    this.allLabels = this.allLabels.map((item) => {
                        return {
                            ...item,
                            isSelected: false
                        }
                    })
                    // const labelCode = kindItem.labelCategoryCode // 类别code
                    // switch (labelCode) {
                    // case '1': // 品类
                    //     this.categoryList = kindItem.labels.concat(kindItem.labels) // 选项列表
                    //     break
                    // }
                })
            })
        },
        selectLabels (item, index, type) {
            let isSelected = !item.isSelected
            const target = this[type][index]
            this.$set(target, 'isSelected', isSelected)
        },
        onChangeTab (val) {
            if (val === 1) {
                this.customerGroupList = this.customerGroupList.map((item) => {
                    return {
                        ...item,
                        isSelected: false
                    }
                })
            } else {
                this.season = this.season.map((item) => {
                    return {
                        ...item,
                        isSelected: false
                    }
                })
            }
            this.currentTab = val
        }
    }
}
</script>
<style lang="less">
.goods-group-tab {
  .van-tabs__line {
  background-color: #3C5CF6;
  margin-bottom:4px;
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
.container {
  padding: 0 16px;
  height: calc(100vh - 60px);
  overflow: auto;
  padding-bottom: 60px;
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
      > span {
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
      > input {
        width: 154px;
        height: 36px;
        text-align: center;
        background: rgba(244,245,247,1);
        border-radius: 18px;
      }
      > span {
        padding: 0 12px;
      }
    }
  }
}
.bottom-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding-bottom: 27px;
  background-color: #fff;
  .bottom-btn {
    width: 343px;
    height: 45px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 45px;
    background: rgba(60, 92, 246, 1);
    border-radius: 25px;
  }
}

</style>
