<template>
  <layout-view style="padding-top:0">
    <div class="panel" :style="getBottomOffset(49)">
      <div class="header-top">
        <c-header
          slot="header"
          :left-arrow="true"
          :style="marginTop"
          :pageOutStatus="isNative"
        >
          <template slot="left" tag="div">
            <img class="header-img" :src="backImage" />
          </template>
          <template slot="right"  tag="div">
              <img
                  class="header-img"
                  :src="hallIcon"
                  @click="handleToHall"
              />
          </template>
        </c-header>
        <swiper class="swiper-content" ref="imageSwiper">
          <swiper-slide
            class="swiper-slide"
            v-for="(img, index) in slidImages"
            :key="img"
          >
            <video
              id="upvideo"
              controls="controls"
              preload="auto"
              webkit-playsinline="true"
              playsinline=""
              :src="img"
              v-if="img.endsWith('.mp4')"
            >
              暂时不支持播放该视频
            </video>
            <img :src="img" v-else @click="previewSlide(slidImages, index)" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="progress-title">
        <p>{{ groupDetail.groupTitle }}</p>
      </div>
      <div class="group-progress">
        <template v-for="(item, index) in cricleLists">
          <progress-cricle
            :key="index"
            :actualPercent="item.actualPercent"
            :actualText="item.actualText"
            :chartType="item.chartType"
          />
        </template>
      </div>

      <!--  人气排行-->
      <div class="popular-content">
        <div class="title-content">
          <img :src="bgUrlList.popularity" alt="" />
          <span>本周累计人气</span>
        </div>
        <div class="number-scroll">
          <div
            class="number"
            v-for="(item, index) in popularArray"
            :key="index"
          >
            <p>{{ item }}</p>
          </div>
        </div>
        <div class="call-commit">
          <button @click="handleCall" :disabled="isVoted">
            {{ isVoted ? "已打call" : "给它打call" }}
          </button>
        </div>
      </div>

      <!-- 买手 -->
      <div class="popular-content">
        <div class="title-content">
          <img :src="bgUrlList.koc" alt="" />
          <span>买手</span>
        </div>
        <div class="buyer">
          <img :src="groupGoodsKoc.headPic" alt="" />
          <p class="author">{{ groupGoodsKoc.kocNickName }}</p>
          <p class="discribe">{{ groupGoodsKoc.kocDesc }}</p>
        </div>
      </div>

      <!-- 搭配解析 -->
      <div class="popular-content">
        <div class="title-content">
          <img :src="bgUrlList.analysis" alt="" />
          <span>搭配解析</span>
        </div>
        <div class="group-analys">
          <img :src="groupDetail.analysisImg" alt="" />
        </div>
      </div>

      <!-- 要点总结 -->
      <div class="popular-content">
        <div class="title-content">
          <img :src="bgUrlList.important" alt="" />
          <span>要点总结</span>
        </div>
        <div class="group-important">
          <div
            class="paragraph"
            v-for="(str, strIndex) in importList"
            :key="strIndex"
          >
            <div class="circle"></div>
            <p>{{ str | trim }}</p>
          </div>
        </div>
      </div>

      <!-- 搭配清单 -->
      <div class="popular-content">
        <div class="title-content">
          <img :src="bgUrlList.collocation" alt="" />
          <span>搭配清单</span>
        </div>
        <div class="collocation-list">
          <div
            class="product-cell"
            v-for="(item, index) in productList"
            :key="index"
            @click="jumpToProduct(item)"
          >
            <img :src="goodPicture(item)" alt="" />
            <div class="product-info">
              <p>{{ item.productName }}</p>
              <div class="sku-list">
                <p for="" v-for="(sku, i) in item.colorSkuList" :key="i">
                  {{ sku | selectSkuStr }}
                </p>
              </div>
              <div class="sale_price">
                <span class="price">¥<span>{{ cashFormat(item.spuRetailPrice) }}</span></span>
                <span class="tip_title">建议零售价</span>
              </div>
              <div class="price">
                <span class="price_value" :style="isShowPrice ? '' : 'font-family: PingFangSC-Semibold,PingFang SC'">¥ <span>{{ isShowPrice ? cashFormat(item.spuTshPrice) : '???'}}</span></span>
                <span class="tip_group_price" v-show="!isShowPrice">入驻可得拿货价</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer" :style="getBottomOffset(0)">
      <div
        class="
      price"
      >
        <div class="group_price">
          <span class="price" :style="isShowPrice ? '' : 'font-family: PingFangSC-Semibold,PingFang SC'">¥<span>{{ isShowPrice ? cashFormat(groupDetail.totalPrice) : '???' }}</span></span>
          <span class="tip_group_price" v-show="!isShowPrice">入驻可得拿货价</span>
        </div>
        <div class="sale_price">
          <span class="price">¥<span>{{ cashFormat(groupDetail.totalRetailPrice) }}</span></span>
          <span class="tip_title">建议零售价</span>
        </div>
      </div>
      <div class="group_tool_btn">
        <button class="poster" @click="addHall">收藏到展厅</button>
        <button class="hall" @click="handlePurchase">立即购买</button>
      </div>
    </div>
    <img class="poster-icon" :style="handlePosterIconBottom()" :src="postIcon" alt="" @click="addPoster">
  </layout-view>
</template>

<script>
import cash from '@/views/user/hall/cashFormat.js'
import utils from 'utils'
import { Dialog, ImagePreview } from 'vant'
import progressCricle from '@/views/common/cricleProgress.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')

export default {
    components: {
        progressCricle,
        swiperSlide,
        swiper
    },
    data() {
        return {
            postIcon: require('@/themes/images/app/btn_create_poster_def@3x.png'),
            backImage: require('@/themes/images/app/circle_nav_back@3x.png'),
            hallIcon: require('@/themes/images/app/circle_nav_exhibition@3x.png'),
            popularNum: '',
            timer: '',
            productList: [],
            groupDetail: {},
            importList: [],
            groupGoodsKoc: {},
            popularArray: [],
            slidImages: [],
            showList: false,
            isVoted: false,
            isNative: false,
            isShowPrice: false,
            cricleLists: [
                {
                    actualPercent: '',
                    actualText: '时尚指数',
                    chartType: '1'
                },
                {
                    actualPercent: '',
                    actualText: '推荐指数',
                    chartType: '2'
                },
                {
                    actualPercent: '',
                    actualText: '热销指数',
                    chartType: '3'
                }
            ],
            bgUrlList: {
                popularity: require('../../themes/images/app/popularity@2x.png'),
                koc: require('../../themes/images/app/koc@2x.png'),
                analysis: require('../../themes/images/app/analysis@2x.png'),
                important: require('../../themes/images/app/essentials@2x.png'),
                collocation: require('../../themes/images/app/collocation@2x.png')
            }
        }
    },
    activated() {
    // 上报页面事件
        window.sa.track('IPX_WEB', {
            page: 'groupDetail',
            type: 'pageView',
            event: 'pageView'
        })
        this.groupDetail = {}
        this.productList = []
        this.importList = []
        this.slidImages = []
        this.isVoted = false
        this.isNative = false
        if (this.$route.query.fromNative === '1') {
            this.isNative = true
        }
        utils.setStore('isFromGroupDetail', false)
        let basepara = utils.getStore('baseParams')
        if (basepara.isHide === 1) {
            this.isShowPrice = true
        } else {
            this.isShowPrice = false
        }
        this.getGroupDetail()
        this.getWeekData()
        this.timeOutRequest()
        let swiper = this.$refs.imageSwiper.swiper
        swiper.slideTo(0, 0, false)
        utils.postMessage('changeStatus', 'default')
    },
    mounted() {
        this.showList = false
        setTimeout(() => {
            this.showList = true
        }, 300)
    },
    watch: {
        popularNum(val) {
            let numStr = val + ''
            this.popularArray = numStr.split('')
        }
    },
    filters: {
        selectSkuStr(val) {
            let str = val.attrColorValue + '：'
            let arr = []
            val.skuList.forEach(item => {
                arr.push(item.attrSpecValue)
            })
            return str + arr.join('，')
        }
    },
    computed: {
        marginTop() {
            let basepara = utils.getStore('baseParams')
            if (basepara.isIphoneX) {
                return 'top:0.44rem'
            }
            return 'top:0.2rem'
        },
        goodPicture() {
            return function(good) {
                return good.colorSkuList[0].imgUrl
            }
        },
        videoImg() {
            return function(url) {
                var xhr = new XMLHttpRequest()
                xhr.open('get', url, true)
                xhr.responseType = 'blob'
                xhr.onload = function() {
                    if (this.status === 200) {
                        // 获取视频文件大小
                        console.log(this.response.size / 1000000 + 'MB')
                        // 截取第一帧的图片,解决了获取图片时跨域
                        let video = document.getElementById('upvideo')
                        video.src = URL.createObjectURL(this.response)
                    }
                }
                xhr.send()
            }
        }
    },
    methods: {
        handlePosterIconBottom() {
            let baseparams = utils.getStore('baseParams')
            let btm = 57 + 8
            if (baseparams.isIphoneX) {
                btm = 91 + 8
            }
            return `bottom:${btm / 100}rem`
        },
        handlePurchase() {
            let token = utils.getStore('token')
            if (token === 'undefined' || token === '') {
                window.globalVue.$utils.postMessage('user_authentication', '')
                return
            }
            let baseParams = utils.getStore('baseParams')
            if (baseParams.isHide === 0) {
                this.isShowPrice = false
                Dialog.confirm({
                    title: '填写邀请码可用',
                    message: '该功能仅对定制化用户开放！请填写业务邀请码获得专属服务',
                    cancelButtonText: '暂不需要',
                    cancelButtonColor: '#007AFF',
                    confirmButtonText: '获取邀请码',
                    confirmButtonColor: '#007AFF'
                }).then(() => {
                    const params = {
                        jumpUrl: 'toBandSale://'
                    }
                    utils.postMessage('', params)
                })
                return
            }
            this.$api.groupGoods.oauthPurchase().then(res => {
                if (res.isRecharge === 0 && res.isDeposit === 0) {
                    Dialog.confirm({
                        message: '您要先充值或支付押金才可以购买商品哦～',
                        cancelButtonText: '暂不购买',
                        cancelButtonColor: '#007AFF',
                        confirmButtonText: '立即充值',
                        confirmButtonColor: '#007AFF'
                    }).then(() => {
                        this.$router.push({
                            path: '/recharge'
                        })
                    })
                } else {
                    this.$router.push({
                        path: '/group/skuPurchase',
                        query: { groupDetail: this.groupDetail }
                    })
                }
            }).catch(() => {})
        },
        cashFormat(price) {
            return cash.changeFormat(price)
        },
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        jumpToProduct(product) {
            const params = {
                jumpUrl: 'productDetail://',
                productCode: product.productCode
            }
            utils.postMessage('', params)
        },
        handleToHall() {
            this.$router.push({
                path: '/user/hall',
                query: {
                    isFromWeb: true
                }
            })
        },
        timeOutRequest() {
            this.timer = setInterval(this.getWeekData, 30000)
        },
        handleCall() {
            window.sa.track('IPX_WEB', {
                page: 'groupDetail', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'detailCall' // 按钮唯一标识，取个语义化且不重名的名字
            })
            const params = {
                groupCode: this.groupDetail.groupCode
            }
            this.$api.groupGoods
                .postCall(params)
                .then(res => {
                    this.$toast('打call成功')
                    this.isVoted = true
                    this.getWeekData()
                })
                .catch(() => {})
        },
        getWeekData() {
            const params = {
                groupCode: this.$route.query.groupCode
            }
            this.$api.groupGoods
                .groupWeekPopular(params)
                .then(res => {
                    this.popularNum = res.popularityCount
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getGroupDetail() {
            const params = {
                groupCode: this.$route.query.groupCode
            }
            this.$api.groupGoods
                .getGroupDetail(params)
                .then(res => {
                    this.groupDetail = res
                    this.productList = res.groupGoodsSpus
                    this.groupGoodsKoc = res.groupGoodsKoc
                    this.slidImages = res.detailImgs
                    this.cricleLists[0].actualPercent =
            Number(this.groupDetail.fashionIndexNum) + ''
                    this.cricleLists[1].actualPercent =
            Number(this.groupDetail.adviceIndexNum) + ''
                    this.cricleLists[2].actualPercent =
            Number(this.groupDetail.hotIndexNum) + ''
                    this.importList = this.groupDetail.groupDesc.trim().split('\n')
                    this.isVoted = this.groupDetail.ishaveVoted === 1
                    // this.findvideocover();
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addPoster() {
            let token = utils.getStore('token')
            if (token === 'undefined' || token === '') {
                window.globalVue.$utils.postMessage('user_authentication', '')
                return
            }
            let baseParams = utils.getStore('baseParams')
            if (baseParams.isHide === 0) {
                this.isShowPrice = false
                Dialog.confirm({
                    title: '填写邀请码可用',
                    message: '该功能仅对定制化用户开放！请填写业务邀请码获得专属服务',
                    cancelButtonText: '暂不需要',
                    cancelButtonColor: '#007AFF',
                    confirmButtonText: '获取邀请码',
                    confirmButtonColor: '#007AFF'
                }).then(() => {
                    const params = {
                        jumpUrl: 'toBandSale://'
                    }
                    utils.postMessage('', params)
                })
                return
            }
            let products = this.productList.filter(item => item.productShelves !== 0)
            if (products.length === 0) {
                this.$toast('该组货所有商品已失效，无法生成海报')
                return
            }

            utils.setStore('isFromGroupDetail', true)
            this.$router.push({
                path: '/poster/editGroupPoster', /// poster/eidtGroupProducts
                query: { groupCode: this.groupDetail.groupCode }
            })
        },
        addHall() {
            window.sa.track('IPX_WEB', {
                page: 'groupDetail', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'addTohall' // 按钮唯一标识，取个语义化且不重名的名字
            })
            let token = utils.getStore('token')
            if (token === 'undefined' || token === '') {
                window.globalVue.$utils.postMessage('user_authentication', '')
                return
            }
            let params = {}
            let groupInfos = []
            let groupProductInfo = {
                name: this.groupDetail.groupTitle,
                groupCode: this.groupDetail.groupCode
            }
            let groupProducts = []
            this.productList.forEach((good, goodIndex) => {
                good.colorSkuList.forEach((item, index) => {
                    item.skuList.forEach((skuItem, skuIndex) => {
                        let sku = {
                            num: skuItem.num,
                            productName: good.productName,
                            productAtrNumber: good.productAtrNumber,
                            productCode: good.productCode,
                            productSkuCode: skuItem.productSkuCode,
                            starasSkuCode: skuItem.starasSkuCode
                        }
                        groupProducts.push(sku)
                    })
                })
            })
            groupProductInfo.groupGoodsRecords = groupProducts
            groupInfos.push(groupProductInfo)
            params.groupGoodsInfos = groupInfos
            this.$api.groupGoods
                .groupGoods(params)
                .then(res => {
                    if (res.code === 0) {
                        // let groupGoodsId = res.data.groupGoodsId
                        this.$toast(' \n 收藏成功，\n 可在“我的展厅”查看 \n ')
                        window.sa.track('IPX_WEB', {
                            page: 'groupDetail', // 页面名字
                            type: 'click', // 固定参数，表明是点击事件
                            event: 'editGroupPlan' // 按钮唯一标识，取个语义化且不重名的名字
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        previewSlide(slidImages, index) {
            let imgs = slidImages.filter((item) => {
                return !item.endsWith('.mp4')
            })
            ImagePreview({
                images: imgs,
                startPosition: index,
                loop: false,
                onClose() {
                    // do something
                }
            })
        }
    },
    deactivated() {
        clearInterval(this.timer)
    }
}
</script>

<style lang="less">
.panel {
  .c-header {
    position: fixed;
    .van-nav-bar__right {
      right: calc(-100vw + 0px);
    }
    .header-img {
      display: block;
      width: 32px;
      height: 32px;
      object-fit: cover;
      // display: inline-block;
      // vertical-align: middle;
    }
  }
}
.van-image__img {
  width: 100%;
  height: auto !important;
  object-fit: cover !important;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%)
}
.van-image-preview__image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
// .van-image-preview__overlay {
//     background-color: black !important;
// }
// .van-overlay {
//   background-color:black !important;
// }
</style>

<style lang="less" scoped>
.poster-icon {
  display: block;
  width: 80px;
  height: 80px;
  position: absolute;
  right: 8px;
}
.poster-icon:active {
    // background: rgba(0, 0, 0, 0.3);
    opacity: 0.7;
}
.panel {
  background-color: white;
  height: 100%;
  overflow: auto;
  .header-top {
    .swiper-content {
      width: 100%;
      height: auto;
      position: relative;
      z-index: 0;
      .swiper-slide {
        width: 100%;
        position: relative;
        overflow: hidden;
        // background-color: black;
        > video {
          display: block;
          width: 100%;
          object-fit: cover;
          max-height: 421px;
          position: relative;
        }
        > img {
          display: block;
          width: 100%;
          object-fit: cover;
          height: 100%;
        }
      }
    }
  }
  .progress-title {
    text-align: center;
    // margin-top: 16px;
    margin: 16px 16px 0;
    > p {
      font-size: 18px;
      font-weight: bold;
      color: rgba(42, 43, 51, 1);
      line-height: 26px;
      // .ellipsis();
    }
  }
  .group-progress {
    display: flex;
    justify-content: space-between;
    margin: 24px 16px 0;
    > progress-cricle {
      width: 40%;
    }
  }
  .popular-content {
    margin-bottom: 56px;
    .title-content {
      position: relative;
      text-align: center;
      height: 40px;
      padding-top: 10px;
      width: 100%;
      > img {
        position: absolute;
        object-fit: cover;
        height: 24px;
        width: auto;
        transform: translate(-50%, -4px);
      }
      > span {
        position: absolute;
        font-size: 20px;
        font-weight: bold;
        transform: translateX(-50%);
        color: @color-c1;
        line-height: 28px;
      }
    }
    .number-scroll {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      .number {
        width: 32px;
        height: 36px;
        background: #f4f5f7;
        text-align: center;
        border-radius: 4px;
        margin-right: 8px;
        &:last-child {
          margin-right: 0;
        }
        > p {
          font-size: 20px;
          font-weight: bold;
          color: rgba(42, 43, 51, 1);
          line-height: 36px;
        }
      }
    }
    .call-commit {
      text-align: center;
      margin-top: 24px;
      > button {
        width: 187px;
        height: 50px;
        background: linear-gradient(
          135deg,
          rgba(85, 122, 244, 1) 0%,
          rgba(114, 79, 255, 1) 100%
        );
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        color: white;
      }
      > button:disabled {
        background: @color-c7;
        color: @color-c2;
      }
      > button:active:disabled {
        background: @color-c7;
        color: @color-c2;
      }
      > button:active {
        color: rgba(255, 255, 255, 0.3);
        // background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(91, 64, 204, 1) 100%);
      }
    }
    .buyer {
      text-align: center;
      margin-top: 20px;
      > img {
        width: 96px;
        height: 96px;
        border-radius: 48px;
        margin-bottom: 8px;
        object-fit: cover;
      }
      .author {
        font-size: 16px;
        font-weight: 400;
        color: @color-c1;
        line-height: 22px;
      }
      .discribe {
        margin: 4px 16px 0;
        font-size: 12px;
        font-weight: 400;
        color: @color-c3;
        line-height: 16px;
      }
    }
    .group-analys {
      margin: 20px 0 0;
      > img {
        width: 100%;
        height: auto;
      }
    }
    .group-important {
      margin: 20px 16px 0;
      .paragraph {
        display: flex;
        .circle {
          flex: 0 0 auto;
          background-color: #2a2b33;
          margin-right: 8px;
          margin-top: 8px;
          width: 4px;
          height: 4px;
          border-radius: 2px;
        }
        > p {
          line-height: 22px;
          font-size: 16px;
          font-weight: 400;
          color: @color-c1;
          line-height: 22px;
          margin-bottom: 8px;
        }
      }
    }
    .collocation-list {
      margin-top: 20px;
      .product-cell {
        background: white;
        border-radius: 8px;
        padding: 0 16px;
        height: 106px;
        margin-bottom: 32px;
        display: flex;
        > img {
          flex: none;
          width: 106px;
          height: 106px;
          border-radius: 4px;
          object-fit: cover;
          border: 1px solid @color-c7;
          background-color: @color-c8;
        }
        .product-info {
          margin-left: 12px;
          width: calc(100vw - 150px);
          > p {
            line-height: 22px;
            font-size: 16px;
            font-weight: bold;
            color: @color-c1;
            .ellipsis();
          }
          .sku-list {
            margin-top: 8px;
            margin-bottom: 16px;
            // height: 38px;
            // overflow: hidden;
            // overflow-y: auto;
            > p {
              font-size: 12px;
              font-weight: 400;
              color: @color-c3;
              line-height: 16px;
              margin: 8px 0;
            }
          }
          .sale_price {
            margin-bottom: 4px;
            .price {
              font-size: 12px;
              font-weight: 400;
              color: @color-c1;
              line-height: 14px;
              font-family: "alibabaRegular";
              > span {
                font-size: 14px;
                font-weight: bold;
                color: @color-c1;
                line-height: 14px;
                font-family: "alibabaBold";
              }
            }
            .tip_title {
              font-size:10px;
              font-weight:bold;
              color: @color-c3;
              line-height:12px;
              background:rgba(244,245,247,1);
              margin-left: 10px;
              padding: 2px;
              border-radius:0px 4px 4px 4px;
            }
          }
          .price {
            .price_value {
              font-size: 12px;
              font-weight: 400;
              color: @color-rc;
              margin-bottom: 0;
              font-family: "alibabaRegular";
              > span {
                font-size: 22px;
                font-weight: bold;
                color: @color-rc;
                font-family: "alibabaBold";
              }
            }
            .tip_group_price {
              font-size:10px;
              font-weight:bold;
              color: @color-rc;
              line-height:14px;
              background:rgba(255,235,237,1);
              margin-left: 10px;
              padding: 2px;
              border-radius:0px 4px 4px 4px;
            }
          }
        }
      }
    }
  }
}
.footer {
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  width: 100%;
  // height: 49px;
  background: white;
  box-shadow: 0px -1px 6px 0px rgba(33, 44, 98, 0.06);
  border-radius: 12px 12px 0px 0px;
  padding: 5px 16px 5px;
  .group_price {
    .price {
      font-size: 12px;
      font-weight: 400;
      color: rgba(245, 48, 48, 1);
      line-height: 24px;
      font-family: "alibabaRegular";
      > span {
        font-size: 20px;
        font-weight: bold;
        color: rgba(245, 48, 48, 1);
        line-height: 24px;
        font-family: "alibabaBold";
      }
    }
    .tip_group_price {
      font-size:10px;
      font-weight:bold;
      color: @color-rc;
      line-height:14px;
      background:rgba(255,235,237,1);
      margin-left: 10px;
      padding: 2px;
      border-radius:0px 4px 4px 4px;
    }
  }
  .sale_price {
    margin-bottom: 5px;
    .price {
      font-size: 12px;
      font-weight: 400;
      color: @color-c1;
      line-height: 14px;
      font-family: "alibabaRegular";
      > span {
        font-size: 14px;
        font-weight: bold;
        color: @color-c1;
        line-height: 14px;
        font-family: "alibabaBold";
      }
    }
    .tip_title {
      font-size:10px;
      font-weight:bold;
      color: @color-c3;
      line-height:12px;
      background:rgba(244,245,247,1);
      margin-left: 4px;
      padding: 2px;
      border-radius:0px 4px 4px 4px;
    }
  }
  .group_tool_btn {
    display: flex;
    margin-bottom: 5px;
     .poster {
      width: 88px;
      height: 40px;
      background:linear-gradient(322deg,rgba(238,236,255,1) 0%,rgba(216,212,255,1) 100%);
      border-radius:20px;
      font-size:14px;
      font-weight:bold;
      color:rgba(60,92,246,1);
      padding: 0;
      align-self: center;
    }
    .poster:active {
      color: rgba(60,92,246, 0.3);
        // background: linear-gradient(322deg, rgba(238,236,255,1) 0%, rgb(240, 239, 239) 100%);
    }
    .hall {
      width: 88px;
      height: 40px;
      background: linear-gradient(
        135deg,
        rgba(85, 122, 244, 1) 0%,
        rgba(114, 79, 255, 1) 100%
      );
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
      color: white;
      align-self: center;
      margin-left: 12px;
    }
    .hall:active {
        color: rgba(255,255,255, 0.3);
        // background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(91, 64, 204, 1) 100%);
    }
  }

}
</style>
