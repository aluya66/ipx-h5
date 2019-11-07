<template>
<div>
  <swiper class="o-swiperClass"  :options="swiperOption">
    <swiper-slide id='index' :class="index === currentPage ? 'o-swiper-slide currPage':'o-swiper-slide'" v-for="(item, index) in imageData" :key="index">
      <!-- <c-image class="o-image" :poster-url="item.mainPic" img-view="?imageView2/1/w/320/h/426"></c-image> -->
      <img class="o-image" :src="item.mainPic" alt="">
    </swiper-slide>
  </swiper>
  <p class="swiper-title">{{productTitle}}</p>
</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')

export default {
  components: {
    swiperSlide,
    swiper
  },
  props: {
    imageData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    const self = this
    return {
      currentPage: 0,
      percentValue: 0,
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 13 * window.devicePixelRatio,
        centeredSlides: true,
        on: {
          // 滑动之后回调函数
          progress: function (e) {
            /* realIndex为滚动到当前的slide索引值 */
            self.percentValue = e
            // that.imgIndex = this.realIndex - 1
          },
          slideNextTransitionEnd (e) {
            self.currentPage += 1
          },
          slidePrevTransitionEnd (e) {
            self.currentPage -= 1
          }
        }
      }
    }
  },
  computed: {
    productTitle () {
      return this.imageData.length > 0 ? this.imageData[this.currentPage].productName : ''
    }
  }
}
</script>

<style lang='less' scoped>
.swiper-title {
  display: inline-block;
  width: 100%;
  height: 22px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height:22px;
  letter-spacing: normal;
  color: #2a2b33;
  text-align: center;
  margin:12px 0 32px 0;
}
.o-swiperClass {
  width: 100%;
  height: 426px;
  position: relative;
  .o-swiper-slide{
    width: calc(100vw - 64px);
    transform:scale(0.98);
    position: relative;
    overflow: hidden;
    // margin-right: 16px!important;
    .o-image {
      display: block;
      width: 100%;
      object-fit: cover;
      height: 100%;
      border-radius: 8px;
      // margin: 0 12px 0 -6px;
    }
  }
  .currPage{
      transform:scale(1);
  }

}
</style>
