<template>
  <layout-view style="padding-top:0">
    <div class="panel" :style="getBottomOffset(49)">
      <div class="header-top">
        <c-header slot="header" :left-arrow="true" :style="marginTop">
          <template slot="left" tag="div">
            <img class="header-img" :src="backImage" />
          </template>
        </c-header>
        <swiper class="swiper-content">
          <swiper-slide class="swiper-slide" v-for="(img, index) in slidImages" :key="index">
            <video
              id="upvideo"
              controls="controls"
              style=""
              preload="none"
              webkit-playsinline="true"
              playsinline=""
              :src="img"
              v-if="img.endsWith('.mp4')"
            >
              暂时不支持播放该视频
            </video>
            <img :src="img" v-else />
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
        <div class="title-content" :style="{ backgroundImage: bgUrlList.popularity }">
          <p>本周累计人气</p>
        </div>
        <div class="number-scroll">
          <div class="number" v-for="(item, index) in popularArray" :key="index">
            <p>{{ item }}</p>
          </div>
        </div>
        <div class="call-commit">
          <button @click="handleCall" :disabled="isVoted">给它打call</button>
        </div>
      </div>

      <!-- 买手 -->
      <div class="popular-content">
        <div class="title-content" :style="{ backgroundImage: bgUrlList.koc }">
          <p>买手</p>
        </div>
        <div class="buyer">
          <img :src="groupGoodsKoc.headPic" alt="" />
          <p class="author">{{ groupGoodsKoc.kocNickName }}</p>
          <p class="discribe">{{ groupGoodsKoc.kocDesc }}</p>
        </div>
      </div>

      <!-- 搭配解析 -->
      <div class="popular-content">
        <div class="title-content" :style="{ backgroundImage: bgUrlList.analysis }">
          <p>搭配解析</p>
        </div>
        <div class="group-analys">
          <img :src="groupDetail.analysisImg" alt="" />
        </div>
      </div>

      <!-- 要点总结 -->
      <div class="popular-content">
        <div class="title-content" :style="{ backgroundImage: bgUrlList.important }">
          <p>要点总结</p>
        </div>
        <div class="group-important">
          <div class="paragraph" v-for="(str, strIndex) in importList" :key="strIndex">
            <div class="circle"></div>
            <p>{{ str | trim }}</p>
          </div>
        </div>
      </div>

      <!-- 搭配清单 -->
      <div class="popular-content">
        <div class="title-content" :style="{ backgroundImage: bgUrlList.collocation }">
          <p>搭配清单</p>
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
              <div class="price">
                ¥ <span>{{ item.spuTshPrice }}</span>
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
        ¥<span>{{ groupDetail.totalPrice }}</span>
      </div>
      <button @click="addHall">添加至展厅</button>
    </div>
  </layout-view>
</template>

<script>
import utils from 'utils'
import { Dialog } from 'vant'
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
            backImage: require('@/themes/images/app/circle_nav_back@3x.png'),
            popularNum: '',
            productList: [],
            groupDetail: {},
            importList: [],
            groupGoodsKoc: {},
            popularArray: [],
            slidImages: [],
            showList: false,
            isVoted: false,
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
                popularity: 'url(' + require('../../themes/images/app/popularity@2x.png') + ')',
                koc: 'url(' + require('../../themes/images/app/koc@2x.png') + ')',
                analysis: 'url(' + require('../../themes/images/app/analysis@2x.png') + ')',
                important: 'url(' + require('../../themes/images/app/essentials@2x.png') + ')',
                collocation: 'url(' + require('../../themes/images/app/collocation@2x.png') + ')'
            }
        }
    },
    activated() {
        this.productList = []
        this.importList = []
        this.slidImages = []
        this.isVoted = false
        this.getGroupDetail()
        this.getWeekData()
    },
    mounted() {
    // 上报页面事件
        window.sa.track('IPX_WEB', {
            page: 'groupDetail',
            type: 'pageView',
            event: 'pageView'
        })
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
        }
    },
    methods: {
        findvideocover() {
            let _this = this
            this.$nextTick(() => {
                let videos = _this.slidImages.filter(item => {
                    return item.endsWith('.mp4')
                })
                let video = document.getElementById('upvideo')
                let source = document.createElement('source')
                source.src = videos[0]
                source.type = 'video/mp4'
                video.appendChild(source)
                // video.addEventListener('loadeddata', function() {
                debugger
                var canvas = document.createElement('canvas')
                canvas.width = '320'
                canvas.height = '320'
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.width)
                // var img = document.createElement('img')
                let imgsrc = canvas.toDataURL('image/png')
                _this.Videoframehandle(imgsrc.split(',')[1])
                // })
            })
        },
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        jumpToProduct(product) {
            window.sa.track('IPX_WEB', {
                page: 'groupDetail', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'editItemClick' // 按钮唯一标识，取个语义化且不重名的名字
            })
            const params = {
                jumpUrl: 'productDetail://',
                productCode: product.productCode
            }
            utils.postMessage('', params)
        },
        handleCall() {
            window.sa.track('IPX_WEB', {
                page: 'groupDetail', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'detailCall' // 按钮唯一标识，取个语义化且不重名的名字
            })
            const params = {
                vo: {
                    groupCode: this.groupDetail.groupCode
                }
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
                    this.cricleLists[0].actualPercent = Number(this.groupDetail.fashionIndexNum) + ''
                    this.cricleLists[1].actualPercent = Number(this.groupDetail.adviceIndexNum) + ''
                    this.cricleLists[2].actualPercent = Number(this.groupDetail.hotIndexNum) + ''
                    this.importList = this.groupDetail.groupDesc.trim().split('\n')
                    this.isVoted = this.groupDetail.ishaveVoted === 1
                    this.findvideocover()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addHall() {
            window.sa.track('IPX_WEB', {
                page: 'groupDetail', // 页面名字
                type: 'click', // 固定参数，表明是点击事件
                event: 'addTohall' // 按钮唯一标识，取个语义化且不重名的名字
            })
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
                        let groupGoodsId = res.data.groupGoodsId
                        Dialog.confirm({
                            title: '添加成功',
                            message: '该组货方案已添加至我的展厅',
                            confirmButtonText: '编辑组货方案',
                            cancelButtonText: '继续逛逛',
                            confirmButtonColor: '#007AFF'
                        })
                            .then(() => {
                                window.sa.track('IPX_WEB', {
                                    page: 'groupDetail', // 页面名字
                                    type: 'click', // 固定参数，表明是点击事件
                                    event: 'editGroupPlan' // 按钮唯一标识，取个语义化且不重名的名字
                                })
                                this.$router.push({
                                    path: '/hall/groupListDetail',
                                    query: { groupId: groupGoodsId }
                                })
                            })
                            .catch(() => {
                                // on cancel
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style lang="less">
.panel {
  .c-header {
    position: fixed;
    .header-img {
      display: block;
      width: 32px;
      height: 32px;
      object-fit: cover;
    }
  }
}
</style>

<style lang="less" scoped>
.panel {
  background-color: white;
  height: 100%;
  overflow: auto;
  .header-top {
    .swiper-content {
      width: 100%;
      height: 421px;
      position: relative;
      z-index: 0;
      .swiper-slide {
        width: 100%;
        position: relative;
        overflow: hidden;
        background-color: black;
        > video {
          display: block;
          width: 100%;
          object-fit: cover;
          height: auto;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
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
      font-weight: 500;
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
    //   margin-top: 25px;
    margin-bottom: 56px;
    .title-content {
      text-align: center;
      background-repeat: no-repeat;
      background-position: center;
      height: 40px;
      padding-top: 10px;
      > p {
        font-size: 20px;
        font-weight: 600;
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
        background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
        border-radius: 25px;
        font-size: 16px;
        font-weight: 500;
        color: white;
      }
      > button:disabled {
        background: @color-c7;
        color: @color-c2;
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
          flex: 1 0 auto;
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
        }
        .product-info {
          margin-left: 12px;
          width: calc(100vw - 150px);
          > p {
            line-height: 22px;
            font-size: 16px;
            font-weight: 500;
            color: @color-c1;
            .ellipsis();
          }
          .sku-list {
            margin-top: 8px;
            margin-bottom: 16px;
            height: 38px;
            overflow: hidden;
            overflow-y: auto;
            > p {
              font-size: 12px;
              font-weight: 400;
              color: @color-c3;
              line-height: 16px;
              margin: 8px 0;
            }
          }
          .price {
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
  padding: 0 16px;
  .price {
    font-size: 12px;
    font-weight: 400;
    color: rgba(245, 48, 48, 1);
    line-height: 49px;
    font-family: "alibabaRegular";
    > span {
      font-size: 20px;
      font-weight: bold;
      color: rgba(245, 48, 48, 1);
      line-height: 49px;
      font-family: "alibabaBold";
    }
  }
  > button {
    width: 110px;
    height: 40px;
    background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    align-self: center;
  }
}
</style>
