<template>
   <layout-view>
   <c-header
      slot="header"
      class="hall-header"
      :left-arrow="true"
      :pageOutStatus="isNative"
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
          class="product-list"
          :style="getBottomOffset(0)"
          v-if="menuIndex == 0"
          :loading="loading"
          :finished="finished"
          finished-text="已到底，没有更多数据"
          emptyType="build"
          emptyDesc="搜索结果是空的"
          :listItems="productDatas"
          :isWaterFall="true"
          @load-data="handleMore"
        >
          <div
            class="item"
            v-for="item in productDatas"
            :key="item.productCode"
          >
            <img :src="item.mainPic" alt="" />
            <div class="product_info">
                <p class="product_title">{{ item.productName }}</p>
                <div class="product_retail_price">
                    <p>{{item.tshPrice}}</p>
                    <span>建议零售价</span>
                </div>
                <div class="product_price">
                    <p>{{item.tshPrice}}</p>
                    <img :src="item.isCollect === 1 ? selectIcon : unselectIcon"/>
                </div>
            </div>
          </div>
        </c-list>
   </div>

   </layout-view>
</template>

<script>
            // @click.stop="handleSelectProduct(item)"
import { Search } from 'vant'
import utils from 'utils'
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
            isNative: false,
            menuIndex: 0,
            searchKey: '',
            groupDatas: [],
            productDatas: [],
            pageNo: 0, // 当前页码
            pageSize: 10, // 每页请求数
            finished: false, // 加载完标识
            loading: false, // 加载更多标识
            unselectIcon: require('@/themes/images/designer/icon_collect_def_16_16@2x.png'),
            selectIcon: require('@/themes/images/designer/icon_collect_sel_16_16@2x.png'),
            headerSearchImg_gray: require('@/themes/images/app/icon_search_gray.png'),
            clearIcon: require('@/themes/images/app/control_delete.png')
        }
    },
    activated() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        this.searchKey = this.$route.query.keyWords
        this.resetParams()
        this.handleRefresh()
    },
    methods: {
        // 是否iPhoneX底部
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleSearchClear() {
            this.searchKey = ''
            this.handleRefresh()
        },
        changeActive(value) {
            this.menuIndex = value
            this.resetParams()
            this.handleRefresh()
        },
        resetParams() {
            this.pageNo = 1
            this.finished = false
            this.loading = false
        },
        // 刷新
        handleRefresh() {
            this.resetParams()
            if (this.menuIndex === 0) {
                this.handleRequestProduct()
            } else {
                this.handleRequestGroup()
            }
        },
        // 加载更多
        handleMore() {
            if (this.menuIndex === 0) {
                if (this.productDatas.length > 0) {
                    this.pageNo += 1
                    this.handleRequestProduct()
                }
            } else { // 组货
                if (this.groupDatas.length > 0) {
                    this.pageNo += 1
                    this.handleRequestGroup()
                }
            }
        },
        handleRequestProduct() {
            const params = {
                keyword: this.searchKey,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }
            this.$api.groupGoods.searchProductList(params).then(res =>{
                this.productDatas = res
            })
        },
        handleRequestGroup() {

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
.product-list {
  display: flex; // height: 100%;
  background: #fff;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 16px; // overflow: auto;
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
.search_result_content {
  position: relative;
  height: 100%;
  overflow: auto;
    .product-list {
        margin-top: 8px;
        .item {
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 10px 0px rgba(33,44,98,0.08);
            border-radius:8px;
            width: calc(50vw - 20.5px);
            margin-top: 8px;
            position: relative;
            > img {
                object-fit: cover;
                width: 100%;
                background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(249,250,252,1) 100%);
                height: calc(50vw - 20.5px);
            }
            .product_info {
                padding: 12px;
                .product_title {
                    font-size:13px;
                    font-weight:400;
                    color: @color-c1;
                    line-height:18px;
                }
                .product_retail_price {
                    display: flex;
                    margin-top: 8px;
                    > p {
                        font-family: "alibabaBold";
                        font-size:14px;
                        font-weight:bold;
                        color: @color-c1;
                        &::before {
                            content: '¥ ';
                            font-weight:400;
                            line-height: 14px;
                            font-size: 12px;
                            font-family: "alibabaRegular";
                        }
                    }
                    > span {
                        margin-left: 10px;
                        font-size:10px;
                        font-weight:bold;
                        color: @color-c3;
                        line-height:12px;
                        background:rgba(244,245,247,1);
                        padding: 2px 4px;
                    }
                }
                .product_price {
                    display: flex;
                    justify-content:space-between;
                    margin-top: 6px;
                    > p {
                        font-size:16px;
                        font-weight:bold;
                        color:@color-rc;
                        font-family: "alibabaBold";
                        bottom: 0;
                        &::before {
                            content: '¥ ';
                            font-family: "alibabaRegular";
                            font-weight:400;
                            line-height: 20px;
                            font-size: 12px;
                        }
                    }
                    > img {
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }
    }
}
</style>
