<template>
   <layout-view>
   <c-header
      slot="header"
      class="hall-header"
      :left-arrow="true"
    >
      <template slot="right" tag="div">
        <div class="searchContain">
          <form action="/">
            <search
              v-model="searchKey"
              placeholder="搜索样衣"
              shape="round"
              :left-icon="headerSearchImg_gray"
              :clearable="false"
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
      </template>
    </c-header>

   <div class="search_result_content">
        <c-tabs
          :tabs="tabs"
          :line-width="8/100+'rem'"
          :border="false"
          @change="changeActive"
        ></c-tabs>
        <c-list
          ref="productlist"
          :class="[
            'product-list',
            isStickyTop ? 'enableScroll' : 'disableScroll'
          ]"
          :style="getBottomOffset(0)"
          v-if="menuIndex == 1 && showList"
          :loading="loading"
          :finished="finished"
          finished-text="已到底，没有更多数据"
          emptyType="hallEmpty"
          emptyDesc="哎呀～样衣是空的"
          :listItems="datas"
          :isWaterFall="true"
          @load-data="handleMore"
        >
          <div
            class="item"
            v-for="item in datas"
            :key="item.productCode"
            @click.stop="handleSelectProduct(item)"
          >
            <img
              class="itemSelIcon"
              v-show="isManageState"
              :src="
                isManageState
                  ? getSelectStatus(item)
                    ? select_sel
                    : select_def
                  : ''
              "
              alt=""
            />
            <img :src="item.mainPic" alt="" />
            <p>{{ item.productName }}</p>
            <h3>¥{{ cashFormat(item.tshPrice) }}</h3>
          </div>
        </c-list>
   </div>

   </layout-view>
</template>

<script>
import { Search, Tab, Tabs } from 'vant';
import components from 'components'
const { CTabs } = components
export default {
    components: {
        Search,
        CTabs
    },
    data () {
        return {
            tabs: [
                {
                    name: 0,
                    title: '商品'
                },
                {
                    name: 1,
                    title: '组货'
                }
            ],
            searchKey: '',
            headerSearchImg_gray: require('@/themes/images/app/icon_search_gray.png'),
            clearIcon: require('@/themes/images/app/control_delete.png'),
        }
    },
    methods: {
        // 搜索
        handleRefresh() {
            
        },
        handleSearchClear() {
            this.searchKey = ''
            this.handleRefresh()
        },
        changeActive() {

        }
    }
}
</script>

<style lang="less">
.searchContain {
  .van-search {
    height: 46px;
    margin-left: 0px;
    padding-right: 0px;
    width: calc(100vw - 55px);
    background: rgba(0, 0, 0, 0) !important;
  }
  .van-field__right-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.search_result_content {
    .van-tab{
      background-color: #fff;
      &.van-tab--active{
        span{
          font-weight: bold;
          color: #3C5CF6;
          font-size:16px;
          line-height:22px;
        }
      }
      span{
        font-size: 16px;
        font-weight:bold;
        color: @color-c1;
        line-height:22px;
      }
    }
    .van-tabs__line {
      background-color: #3C5CF6;
      margin-bottom: 4px;
      border-radius: 3px;
      height: 5px;
    }
    .van-tabs {
      border-bottom: 0.5px solid #e1e2e6;
      .van-hairline--top-bottom{
        &::after{
          border: 0;
        }
      }
    }
}
</style>

<style lang='less' scoped>
</style>
