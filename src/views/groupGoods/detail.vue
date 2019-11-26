<template>
  <layout-view>
    <div class="panel">
      <div class="header-top">
          <c-header
            slot="header"
            :left-arrow="true"
          >
          </c-header>
        <swiper class="swiper-content">
          <swiper-slide class="swiper-slide">
            <video
              controls="controls"
              style=""
              preload="none"
              webkit-playsinline="true"
              playsinline=""
              src="https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/4f9747cd241241042224418817/v.f20.mp4?dockingId=ab3e8bc9-64a0-4a5d-84b4-335aa34928cb&amp;storageSource=3"
            >暂时不支持播放该视频</video>
          </swiper-slide>
          <swiper-slide class="swiper-slide">
            <img src="../../themes/images/app/invalid-name@2x.png">
          </swiper-slide>
          <swiper-slide class="swiper-slide">
            <img src="../../themes/images/app/invalid-name@2x.png">
          </swiper-slide>
        </swiper>
      </div>
      <div class="progress-title">
        <p>秋装百搭组货</p>
      </div>
      <div class="group-progress">
        <progress-cricle
          actualPercent="78"
          actualText="时尚指数"
          chartType="1"
        />
        <progress-cricle
          actualPercent="100"
          actualText="推荐指数"
          chartType="2"
        />
        <progress-cricle
          actualPercent="30"
          actualText="热销指数"
          chartType="3"
        />
      </div>

      <!--  人气排行-->
      <div class="popular-content">
        <div class="title-content">
          <p>本周累计人气</p>
        </div>
        <div class="number-scroll">
          <div
            class="number"
            v-for="(item,index) in popularArray"
            :key="index"
          >
            <p>{{item}}</p>
          </div>
        </div>
        <div class="call-commit">
          <button>给他打call</button>
        </div>
      </div>

      <!-- 买手 -->
      <div class="popular-content">
        <div class="title-content">
          <p>买手</p>
        </div>
        <div class="buyer">
          <img
            src="../../themes/images/app/invalid-name@2x.png"
            alt=""
          >
          <p class="author">左导</p>
          <p class="discribe">时尚行业从事10多年，擅长潮牌搭配</p>
        </div>
      </div>

      <!-- 搭配解析 -->
      <div class="popular-content">
        <div class="title-content">
          <p>搭配解析</p>
        </div>
        <div class="group-analys">
          <img
            src="../../themes/images/app/invalid-name@2x.png"
            alt=""
          >
        </div>
      </div>

      <!-- 要点总结 -->
      <div class="popular-content">
        <div class="title-content">
          <p>要点总结</p>
        </div>
        <div class="group-important">
          <p>韩版女装的特点宽松、休闲、时尚韩版服装简洁、大方容易搭配，制造不同效果尤其以明媚的可爱颜色选择为主，营造一种甜甜可爱的女孩味道</p>
        </div>
      </div>

      <!-- 搭配清单 -->
      <div class="popular-content">
        <div class="title-content">
          <p>搭配清单</p>
        </div>
        <div class="collocation-list">
          <!-- v-for="(item,index) in seletedDetails" :key="index" item.mainPic {{item.productName}} {{item.tshPrice}}-->
          <div
            class="product-cell"
            v-for="(item,index) in productList"
            :key="index"
          >
            <img
              :src="item.mainPic"
              alt=""
            >
            <div class="product-info">
              <p>{{item.productName}}</p>
              <div class="sku-list">
                <p
                  for=""
                  v-for="(sku,i) in item.colorSkuList"
                  :key="i"
                >{{sku.attrColorValue}}</p>
              </div>
              <p class="price">¥{{item.tshPrice}}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="footer">
      <div class="price">¥<span>198.89</span></div>
      <button @click="addHall">添加至展厅</button>
    </div>
  </layout-view>
</template>

<script>
import { Dialog } from "vant";
import progressCricle from "@/views/common/cricleProgress.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");

export default {
  components: {
    progressCricle,
    swiperSlide,
    swiper
  },
  data() {
    return {
      popularNum: "183340",
      productList: [
        {
          mainPic: "../../themes/images/app/invalid-name@2x.png",
          productName: "色发是个都是割发代首风格色发是德国",
          tshPrice: "34.88",
          colorSkus: [
            {
              attrColorValue: "红色, XL, s"
            }
          ]
        },
        {
          mainPic: "../../themes/images/app/invalid-name@2x.png",
          productName: "色发是个都是割发代首风格色发是德国",
          tshPrice: "34.88",
          colorSkus: [
            {
              attrColorValue: "红色, XL, s"
            }
          ]
        },
        {
          mainPic: "../../themes/images/app/invalid-name@2x.png",
          productName: "色发是个都是割发代首风格色发是德国",
          tshPrice: "34.88",
          colorSkus: [
            {
              attrColorValue: "红色, XL, s"
            }
          ]
        }
      ],
      groupDetail: {},
    };
  },
  computed: {
    popularArray() {
      return this.popularNum.split("");
    }
  },
  activated() {
      this.getGroupDetail()
  },
  methods: {
    getGroupDetail() {
        const params = {
            groupCode: "g001111"
        }
        this.$api.groupGoods.getGroupDetail(params).then(res => {
            this.groupDetail = res
            this.productList = res.groupGoodsSpus
        }).catch((err) => {
            console.log(err)
        })
    },
    addHall() {
      let params = {
        groupGoodsInfos: [
          {
            groupGoodsRecords: [
              {
                num: 2,
                productAtrNumber: "19Y9302QL480",
                productCode: "051705137353",
                productSkuCode: "051705137353000",
                starasSkuCode: "19Y9302QL480XWKX"
              },
              {
                num: 3,
                productAtrNumber: "19Y9302QL480",
                productCode: "051705137353",
                productSkuCode: "051705137353002",
                starasSkuCode: "19Y9302QL480XWEW"
              },
              {
                num: 1,
                productAtrNumber: "1HZ9401S2552",
                productCode: "052205137352",
                productSkuCode: "052205137352000",
                starasSkuCode: "1HZ9401S2552XWHM"
              }
            ],
            name: "测试组货完成"
          }
        ]
      };
      this.$api.groupGoods
        .groupGoods(params)
        .then(res => {
          if (res.code === 0) {
            Dialog.confirm({
              title: "添加成功",
              message: "该组货方案已添加至我的展厅",
              confirmButtonText: "编辑组货方案",
              cancelButtonText: "继续逛逛"
            })
              .then(() => {
                this.$router.push("/hall/groupListDetail");
              })
              .catch(() => {
                // on cancel
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

<style lang="less">
.panel {
  .c-header {
    position: fixed;
    top: 0;
  }
}
</style>

<style lang='less' scoped>
.panel {
  background-color: white;
  height: calc(100vh - 51px);
  overflow-y: scroll;
  .header-top {
    .swiper-content {
      width: 100%;
      height: 421px;
      position: relative;
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
    margin-top: 16px;
    > p {
      font-size: 18px;
      font-weight: 500;
      color: rgba(42, 43, 51, 1);
      line-height: 26px;
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
      background: url("../../themes/images/app/popularity@2x.png") no-repeat;
      background-position: center;
      //   background-size: length();
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
        background: linear-gradient(
          135deg,
          rgba(85, 122, 244, 1) 0%,
          rgba(114, 79, 255, 1) 100%
        );
        border-radius: 25px;
        font-size: 16px;
        font-weight: 500;
        color: white;
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
      }
      .author {
        font-size: 16px;
        font-weight: 400;
        color: @color-c1;
        line-height: 22px;
      }
      .discribe {
        margin-top: 4px;
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
      > p {
        font-size: 16px;
        font-weight: 400;
        color: @color-c1;
        line-height: 22px;
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
          // margin-right: 16px;
          width: calc(100vw - 150px);
          > p {
            font-size: 16px;
            font-weight: 500;
            color: @color-c1;
            .ellipsis();
          }
          .sku-list {
            margin-top: 8px;
            margin-bottom: 16px;
            height: 45px;
            // max-height: 80px;
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
            font-size: 22px;
            font-weight: 500;
            color: @color-rc;
            margin-bottom: 0;
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
  height: 49px;
  background: white;
  box-shadow: 0px -1px 6px 0px rgba(33, 44, 98, 0.06);
  border-radius: 12px 12px 0px 0px;
  padding: 0 16px;
  .price {
    font-size: 12px;
    font-weight: 400;
    color: rgba(245, 48, 48, 1);
    line-height: 49px;
    > span {
      font-size: 20px;
      font-weight: bold;
      color: rgba(245, 48, 48, 1);
      line-height: 49px;
    }
  }
  > button {
    width: 110px;
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
  }
}
</style>
