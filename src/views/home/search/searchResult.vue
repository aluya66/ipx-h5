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
            v-if="menuIndex == 0"
            :loading="loading"
            :finished="finished"
            emptyType="search"
            emptyDesc="无搜索结果，可以试试其他关键词"
            :listItems="productDatas"
            :isWaterFall="true"
            :hasPullRefresh="true"
            :immediateCheck="false"
            @on-refresh="handleRefresh"
            @load-data="handleMore"
            >
            <div
                class="item"
                v-for="item in productDatas"
                :key="item.productCode"
            >
                <img :src="item.mainPic" alt="" @click="productDetail(item)"/>
                <div class="product_info">
                    <p class="product_title">{{ item.productName }}</p>
                    <div class="product_retail_price">
                        <p>{{parseFloat(item.retailPrice).toFixed(2)}}</p>
                        <span>建议零售价</span>
                    </div>
                    <div class="product_price">
                        <p>{{parseFloat(item.tshPrice).toFixed(2)}}</p>
                        <img :src="item.isCollect === 1 ? selectIcon : unselectIcon" @click="collectProduct(item)"/>
                    </div>
                </div>
            </div>
            </c-list>
            <c-list
            ref="grouplist"
            class="groupList"
            :style="getBottomOffset(0)"
            v-else-if="menuIndex == 1"
            :loading="loading"
            :finished="finished"
            emptyType="search"
            emptyDesc="无搜索结果，可以试试其他关键词"
            :listItems="groupDatas"
            :hasPullRefresh="true"
            :immediateCheck="false"
            @on-refresh="handleRefresh"
            @load-data="handleMore"
            >
            <div
                class="groupItem"
                v-for="item in groupDatas"
                :key="item.groupCode"
                @click="groupDetail(item)"
            >
            <img :src="item.groupImg" alt="">
            <div class="infoContain">
                <div class="group_title">
                    <p class="group_name">{{item.groupTitle}}</p>
                    <div class="percentage">
                        <p> &nbsp; 时尚指数 {{item.fashionIndexNum}}% &nbsp;</p>
                        <p>&nbsp; 推荐指数 {{item.adviceIndexNum}}% &nbsp;</p>
                    </div>
                    <span class="hot_number">&nbsp; 热销指数 {{item.hotIndexNum}}% &nbsp;</span>
                </div>
                <div class="price">
                    <div class="group_retail_price">
                        <p>{{parseFloat(item.totalRetailPrice).toFixed(2)}}</p>
                        <span>建议零售价</span>
                    </div>
                    <p>{{parseFloat(item.totalPrice).toFixed(2)}}</p>
                </div>
            </div>
            </div>
            </c-list>

   </div>

   </layout-view>
</template>

<script>
import { Search } from 'vant'
import utils from 'utils'
import CList from 'components/c-list'
import components from 'components'
const { CTabs } = components
export default {
    components: {
        Search,
        CTabs,
        CList
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
            loadOffset: 10,
            searchKey: '',
            groupDatas: [],
            productDatas: [],
            pageNo: 0, // 当前页码
            pageSize: 10, // 每页请求数
            finished: false, // 加载完标识
            loading: false, // 加载更多标识
            unselectIcon: require('@/themes/images/app/icon_collect_unselect@3x.png'),
            selectIcon: require('@/themes/images/app/icon_collect_select@3x.png'),
            headerSearchImg_gray: require('@/themes/images/app/icon_search_gray.png'),
            clearIcon: require('@/themes/images/app/control_delete.png')
        }
    },
    created() {
        this.searchKey = this.$route.query.keyWords
    },
    activated() {
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        this.handleRefresh()
        // this.handleScroll()
    },
    methods: {
        // 是否iPhoneX底部
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleSearchClear() {
            this.searchKey = ''
            let method = 'page_out'
            if (this.isNative) {
                utils.postMessage(method, '')
            } else {
                this.$router.go(-1)
            }
        },
        changeActive(value) {
            this.menuIndex = value
            this.handleRefresh()
        },
        resetParams() {
            // this.groupDatas = []
            // this.productDatas = []
            this.pageNo = 1
            this.finished = false
            this.loading = false
        },
        setSuccessStatus() {
            this.loading = false
        },
        setFailureStatus() {
            this.pageNo -= 1
            this.finished = true
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
        productDetail(product) {
            const params = {
                jumpUrl: 'productDetail://',
                productCode: product.productCode
            }
            utils.postMessage('', params)
        },
        groupDetail(group) {
            this.$router.push({
                path: '/groupDetail',
                query: {
                    groupCode: group.groupCode
                }
            })
        },
        collectProduct(product) { /// 收藏商品
            const params = {
                productName: product.productName,
                productCode: product.productCode,
                productPrice: product.tshPrice,
                shopId: product.shopId
            }
            if (product.isCollect === 1) {
                // 取消收藏
                params.isCollect = 2
                this.$api.product.deleteCollectionProduct(params).then(res => {
                    product.isCollect = 2
                }).catch(err => {
                    console.log(err)
                })
            } else { // 添加收藏
                params.isCollect = 1
                this.$api.product.addCollectionProduct(params).then(res => {
                    product.isCollect = 1
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        handleRequestProduct() {
            const params = {
                keyword: this.searchKey,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }
            this.loading = true
            this.$api.groupGoods.searchProductList(params).then(res => {
                this.loading = false
                if (res instanceof Array && res.length > 0) {
                    if (this.pageNo === 1) {
                        this.productDatas = res
                    } else {
                        this.productDatas = this.productDatas.concat(res)
                    }
                    if (res.length < this.pageSize) {
                        this.finished = true
                    } else {
                        this.finished = false
                    }
                } else {
                    if (this.pageNo === 1) {
                        this.productDatas = []
                    }
                    this.finished = true
                }
            }).catch(() => {
                this.setFailureStatus()
            })
        },
        handleRequestGroup() {
            const params = {
                keyword: this.searchKey,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }
            this.loading = true
            this.$api.groupGoods.searchGroupList(params).then(res => {
                this.setSuccessStatus()
                if (res instanceof Array && res.length > 0) {
                    if (this.pageNo === 1) {
                        this.groupDatas = res
                    } else {
                        this.groupDatas = this.groupDatas.concat(res)
                    }
                    if (res.length < this.pageSize) {
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
            }).catch(() => {
                this.setFailureStatus()
            })
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
  height: calc(100vh - 85px);
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
    .product-list {
        margin: 12px 11px 20px;
        .item {
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 10px 0px rgba(33,44,98,0.08);
            border-radius:8px;
            width: calc(50vw - 21px);
            margin: 4px 5px;
            position: relative;
            > img {
                object-fit: cover;
                width: 100%;
                border-radius: 12px;
                background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(249,250,252,1) 100%);
                // height: calc(50vw - 20.5px);
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
                        border-radius: 0 4px 4px 4px;
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

    .groupList {
        height: calc(100vh - 85px);
        .groupItem {
            height: 100%;
            overflow: auto;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 10px 0px rgba(33,44,98,0.08);
            border-radius:12px;
            padding: 16px;
            display: flex;
            margin: 16px 0;
            >img {
                width:123px;
                min-width: 123px;
                height:138px;
                object-fit: cover;
                border-radius:4px;
                border:0.5px solid rgba(230,230,230,1);
            }
            .infoContain {
                margin-left: 17px;
                .group_title {
                    .group_name {
                        font-size:16px;
                        font-weight:bold;
                        color: @color-c1;
                        line-height:22px;
                    }
                    .percentage {
                        display: flex;
                        margin: 9px 0;
                        p {
                            display: inline-block;
                            font-size:10px;
                            font-weight:bold;
                            line-height:14px;
                            border-radius:0px 4px 4px 4px;
                            padding: 1px 2px;
                            &:nth-child(1) {
                                color:@color-ec;
                                background: @color-ec1;
                            }
                            &:nth-child(2){
                                color:@color-oc;
                                background: @color-oc1;
                                margin-left:10px;
                            }
                        }
                    }
                    .hot_number {
                        font-size:10px;
                        font-weight:bold;
                        color: @color-rc;
                        line-height:14px;
                        background:rgba(255,235,237,1);
                        border-radius:0px 4px 4px 4px;
                        padding: 1px 2px;
                    }
                }
                .price {
                    margin-top: 30px;
                    .group_retail_price {
                        display: flex;
                        margin-bottom: 4px;
                        > p {
                            font-family: "alibabaBold";
                            font-size:14px;
                            font-weight:bold;
                            color: @color-c1;
                            &::before {
                                content: '¥ ';
                                font-weight:400;
                                line-height: 16px;
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
                            border-radius:4px;
                        }
                    }
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
                }
            }
        }
    }

}
</style>
