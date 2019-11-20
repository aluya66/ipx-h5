<template>
  <layout-view>
    <c-header slot="header" :left-arrow="true">
      <div slot="title">智能组货</div>
      <template slot="right" tag="div">
        <img class="header-img" :src="headerSearchImg" />
      </template>
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
      <select-box :items='customerGroupList' :isSlot='true' itemBoxClass="image-box customer-box" itemClass="image-item" sectionTitle="客户群体">
        <template #selectItem='slotProps'>
            <img class="image-img" :src="slotProps.item.icon" />
            <p class="image-name">{{slotProps.item.name}}</p>
            <p class="image-info">{{slotProps.item.age}}</p>
            <img v-if="slotProps.item.isSelected" class="check-box" src="~images/groupGoods/selected_icon.png"/>
        </template>
      </select-box>
      <select-box :items='selectList' sectionTitle="购买频次" />
      <select-box :items='selectList' sectionTitle="购买力" sectionSubTitle="(人均/次)" />
      <select-box :items='selectList' sectionTitle="消费偏好" />
    </div>
    <!-- 客户特征结束 -->

    <!-- 商品特征开始 -->
    <div class="container" v-show="currentTab === 0">
      <select-box :isSlot='true' :items='categoryList' itemBoxClass='image-box category-box' itemClass='image-item' sectionTitle="品类">
        <template #selectItem="slotProps">
              <img class="image-img" :src="slotProps.item.imageUrl" />
              <p class="image-name">{{slotProps.item.labelName}}</p>
        </template>
      </select-box>
      <select-box :items='selectList' sectionTitle="季节" />
      <select-box :items='selectList' sectionTitle="风格" />

      <div class="item-wrapper">
        <div class="title">单款价格区间(元)</div>
        <div class="item-box price-box">
          <input type="text" placeholder="最低价" maxlength="7" v-model="minPrice" @blur="setPriceSection('min')">
          <span>-</span>
          <input type="text" placeholder="最高价" maxlength="7" v-model="maxPrice" @blur="setPriceSection('max')">
        </div>
      </div>

      <select-box :items='modelList' :isSlot='true' itemBoxClass="image-box format-box" itemClass="image-item" sectionTitle="版型">
      <template #selectItem='slotProps'>
          <img class="image-img" :src="slotProps.item.icon" />
          <p class="image-name">{{slotProps.item.name}}</p>
          <img v-if="slotProps.item.isSelected" class="check-box" src="~images/groupGoods/selected_icon.png"/>
      </template>
      </select-box>
      <select-box :items='selectList' sectionTitle="材质" />
      <select-box :items='selectList' sectionTitle="色系" />
      <select-box :items='selectList' sectionTitle="厚度" />
    </div>
    <!-- 商品特征结束 -->
    <div class="bottom-box">
      <div class="bottom-btn">{{currentTab === 1? '下一步':'一键开启 智能组货'}}</div>
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
            customerGroupList: [
                {
                    icon: require('@/themes/images/groupGoods/shaonian.png'),
                    name: '少年',
                    age: '11~15岁',
                    isSelected: false
                },
                {
                    icon: require('@/themes/images/groupGoods/qingnian.png'),
                    name: '青年',
                    age: '16~30岁',
                    isSelected: false
                },
                {
                    icon: require('@/themes/images/groupGoods/zhongnian.png'),
                    name: '中年',
                    age: '30~50岁',
                    isSelected: false
                }
            ],
            modelList: [
                {
                    icon: require('@/themes/images/groupGoods/kuansong.png'),
                    name: '宽松版',
                    isSelected: false
                },
                {
                    icon: require('@/themes/images/groupGoods/heshen.png'),
                    name: '合身版',
                    isSelected: false
                },
                {
                    icon: require('@/themes/images/groupGoods/xiushen.png'),
                    name: '修身版',
                    isSelected: false
                }
            ],
            selectList: [
                {
                    name: '选项',
                    isSelected: false
                }, {
                    name: '选项',
                    isSelected: false
                }, {
                    name: '选项',
                    isSelected: false
                }, {
                    name: '选项',
                    isSelected: false
                }, {
                    name: '选项',
                    isSelected: false
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
            headerSearchImg: require('@/themes/images/groupGoods/header_search.png')
        }
    },
    created() {
        this.getSearchLists()
    },
    methods: {
        getSearchLists() {
            this.$api.groupGoods.getSearchListsAjax().then((data) => {
                let ret = data.labelCategories // 分类列表
                ret.length && ret.forEach((kindItem) => {
                    const labelCode = kindItem.labelCategoryCode // 类别code
                    switch (labelCode) {
                    case '1': // 品类
                        this.categoryList = kindItem.labels.concat(kindItem.labels) // 选项列表
                        break
                    }
                })
            })
        },
        setPriceSection(type) {
            let price = type === 'min' ? 'minPrice' : 'maxPrice'
            if (!Number(this[price]) || this[price] < 0) {
                this[price] = ''
                return this.$toast('请输入大于0数字')
            }
            if (type === 'min') {
                if (this.maxPrice && this[price] > this.maxPrice) {
                    this[price] = ''
                    return this.$toast('最低价不能高于最高价')
                }
            } else if (type === 'max') {
                if (this.minPrice && this[price] < this.minPrice) {
                    this[price] = ''
                    return this.$toast('最高价不能低于最低价')
                }
            }
            this[price] = Number(this[price]).toFixed(2)
        },
        selectLabels (item, index, type) {
            let isSelected = !item.isSelected
            const target = this[type][index]
            this.$set(target, 'isSelected', isSelected)
        },
        onChangeTab (val) {
            // console.log(val)
            if (val === 1) {
                this.customerGroupList = this.customerGroupList.map((item) => {
                    return {
                        ...item,
                        isSelected: false
                    }
                })
            } else {
                this.modelList = this.modelList.map((item) => {
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
