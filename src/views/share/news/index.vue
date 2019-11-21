<template>
  <layout-view>
    <div class="display-app">
      <div v-if="activeName === 13">
        <div class="display-prompt" v-if="prompt">左右滑动可切换图片</div>
        <div class="display-demo" style="background: black">
          <swiper :options="swiperOption">
            <swiper-slide
              style="height: 100vh;width: 100%;position: relative;"
              v-for="(image, index) in feed.images"
              :key="index"
            >
              <img
                style="position: relative;
                        max-width: 100%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);"
                :src="image.image_src"
              />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <!-- <vue-preview :slides="slide" @close="handleClose"></vue-preview> -->
        </div>
      </div>
      <div v-if="activeName === 11">
        <div class="display-demo">
          <div class="display-img">
            <div class="display-video">
              <video
                controls
                webkit-playsinline
                playsinline="true"
                preload="none"
                id="videoElement"
                v-show="showVideo"
                @click="paly()"
                ref="video"
                :src="feed.video_src"
                style="width: 100%;background-color: #000000;  cursor: pointer;"
              ></video>
              <img
                style="width: 100%;  cursor: pointer;"
                v-show="!showVideo"
                v-if="feed&&feed.cover_src"
                :src="feed.cover_src"
              />
            </div>
            <div v-show="palyShow" @click="paly()" class="display-paly">
              <!-- <i class="el-icon-caret-right"></i> -->
              <!-- <van-icon name="play-circle-o" /> -->
            </div>
          </div>
          <div class="img-video">
            <span class="left">{{feed.channel_name}}</span>
            <span class="right">{{feed.release_time}}</span>
          </div>
          <div v-if="feed&&feed.title" class="video-title">{{feed.title}}</div>
          <div class="video-cover">
            <div class="cover" :style="{backgroundImage:'url(' + feed.user_avatar + ')'}"></div>
            <div class="name">{{feed.user_name}}</div>
            <div class="text">{{feed.user_bio}}</div>
          </div>
          <div class="video-content" v-html="feed.summary"></div>
          <div class="video-tags">
            <div class="tag" v-for="keyword in (feed.keywords)" :key="keyword">{{keyword}}</div>
          </div>
          <!-- <comments :show-dialog="showDialog" :comments="comments"></comments> -->
        </div>
      </div>
      <div v-if="activeName === 10">
        <div class="display-demo">
          <div class="display-img display-share-img">
            <img style :src="feed.cover_src" />
            <div class="img-text">
              <span class="left">{{feed.channel_name}}</span>
              <span class="right">{{feed.release_time}}</span>
            </div>
          </div>
          <div v-if="feed&&feed.title" class="video-title">{{feed.title}}</div>
          <div class="video-cover">
            <div class="cover" :style="{backgroundImage:'url(' + feed.user_avatar + ')'}"></div>
            <div class="name">{{feed.user_name}}</div>
            <div class="text">{{feed.user_bio}}</div>
          </div>
          <div v-if="feed.summary" class="video-summary" v-html="feed.summary"></div>
          <div class="video-content" v-html="feed.content" id="content-html"></div>
          <div class="video-tags">
            <div class="tag" v-for="(keyword, index) in (feed.keywords)" :key="index">{{keyword}}</div>
          </div>
          <!-- <comments :show-dialog="showDialog" :comments="comments"></comments> -->
        </div>
      </div>
      <div v-if="activeName === 12">
        <div class="display-demo">
          <div class="display-img" style="padding: 0px 12px;">
            <ul
              class="ul"
              v-if="feed.images&&feed.images.length!==1&&feed.images.length!==2&&feed.images.length!==4"
            >
              <li class="li" v-for="(image, index) in feed.images" :key="index">
                <div class="div">
                  <img
                    :src="image.image_preview_src"
                    :large="image.image_src"
                    preview="0"
                    class="img"
                  />
                </div>
              </li>
            </ul>
            <ul class="ul" v-if="feed.images&&feed.images.length===1">
              <li class="li-1" v-for="(image, index) in feed.images" :key="index">
                <div class="div">
                  <img
                    :src="image.image_preview_src"
                    :large="image.image_src"
                    preview="1"
                    class="img"
                  />
                </div>
              </li>
            </ul>
            <ul class="ul" v-if="feed.images&&(feed.images.length===2||feed.images.length===4)">
              <li class="li-2" v-for="(image, index) in feed.images" :key="index">
                <div class="div">
                  <img
                    :src="image.image_preview_src"
                    :large="image.image_src"
                    preview="2"
                    class="img"
                  />
                </div>
              </li>
            </ul>
            <div class="img-text">
              <span class="left">{{feed.channel_name}}</span>
              <span class="right">{{feed.release_time}}</span>
            </div>
          </div>

          <div v-if="feed&&feed.title" class="video-title">{{feed.title}}</div>
          <div class="video-cover">
            <div class="cover" :style="{backgroundImage:'url(' + feed.user_avatar + ')'}"></div>
            <div class="name">{{feed.user_name}}</div>
            <div class="text">{{feed.user_bio}}</div>
          </div>
          <div class="video-content" v-html="feed.summary"></div>
          <div class="video-tags">
            <div class="tag" v-for="(keyword, index) in (feed.keywords)" :key="index">{{keyword}}</div>
          </div>
        </div>
      </div>
    </div>
    <v-share-footer></v-share-footer>
  </layout-view>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import vShareFooter from '../common/footer'

import { Icon } from 'vant'
export default {
  components: {
    [Icon.name]: Icon,
    swiper,
    swiperSlide,
    vShareFooter
  },
  data () {
    return {
      showVideo: false,
      prompt: true,
      DialogVisible: false,
      slide: [],
      feed: {
        keywords: []
      },
      loading: false,
      palyShow: true,
      activeName: 10,
      comments: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      }

      //   pageOutStatus:
    }
  },
  mounted: function () {
    // 异步插入的图片
    // setTimeout(() => {
    //   // this.img1.push('1.jpg')
    //   this.$previewRefresh()
    // }, 2000);
    // 图片查看器打开后，打印本次查看器的实例（事件、方法、属性的示例）
    this.$preview.on('imageLoadComplete', (e, item) => {
      console.log('222222222222', this.$preview.self)
    })
  },
  methods: {
    download () {
      this.DialogVisible = false
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isiOS) {
        window.open(
          'https://apps.apple.com/cn/app/%E6%AF%8F%E6%97%A5%E5%B0%9A%E6%9D%A5/id1472490574'
        )
      } else if (isAndroid) {
        // request
        //   .get(
        //     this.$config.api + `/api/v1/client-version/android`,
        //     {},
        //     {
        //       validateStatus: status => status === 200
        //     }
        //   )
        //   .then(response => {
        //     if (
        //       response &&
        //       response.data &&
        //       response.data.data &&
        //       response.data.data.link
        //     ) {
        //       window.open(response.data.data.link)
        //     }
        //   })
        //   .catch(err => {
        //     this.$message({
        //       message: err,
        //       type: 'error'
        //     })
        //   })
      }
    },
    getImg () {
      let wrap = document.getElementById('content-html')
      let imgTag = wrap.getElementsByTagName('img')
      let jointImgs = wrap.getElementsByClassName('joint-img-margin')
      if (jointImgs && jointImgs.length > 0) {
        for (let j = 0; j < jointImgs.length; j++) {
          jointImgs[j].parentNode.style.margin = '0'
        }
      }
      for (let j = 0; j < imgTag.length; j++) {
        if (imgTag[j].src !== '') {
          // imgTag[j].remove()
          imgTag[j].setAttribute('class', 'imgClass')
        }
      }
      let imgs = wrap.getElementsByClassName('imgClass')
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute('width', '')
        imgs[i].setAttribute('class', 'imgClass img_loading')
        let width = parseFloat(imgs[i].getAttribute('data-w'))
        let ratio = parseFloat(imgs[i].getAttribute('data-ratio'))
        let Htmlwidth =
          document.getElementById('content-html').clientWidth - 32
        if (width > Htmlwidth) width = Htmlwidth
        try {
          if (imgs[i].getAttribute('src')) {
            imgs[i].setAttribute('preview', '1')
            imgs[i].setAttribute('data-src', imgs[i].getAttribute('src'))
            imgs[i].setAttribute('large', imgs[i].getAttribute('src'))
            imgs[i].setAttribute(
              'src',
              'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
            )
            // imgs[i].setAttribute("style", "width:" + width + "px;height:" + (width * ratio) + "px")
            // 表情包样式
            console.log()
            if (imgs[i].style.maxWidth !== '40%') {
              imgs[i].style.width = width + 'px'
              imgs[i].style.height = width * ratio + 'px'
            }
          }
        } catch (e) {
          console.log('wrap', e)
          console.log('wrap111', imgs[i].src)
        }
        if (
          imgs[i].style.margin === '0px' &&
          imgs[i].style.display === 'inline-block'
        ) {
          imgs[i].onload = function () {
            imgs[i].style.backgroundImage = 'none'
          }
        }
        // let id = imgs[i].getAttribute("data-id")
        // let newItem = document.createElement('img');
        // let width = parseFloat(imgs[i].getAttribute("data-w"))
        // let parentDom = null
        // parentDom = imgs[i].parentElement
        // if (width > screen.availWidth) width = screen.availWidth
        // let ratio = parseFloat(imgs[i].getAttribute("data-ratio"))
        // newItem.className = "img_loading";
        // newItem.id = "img_loading" + i;
        // newItem.style.width = width + "px";
        // newItem.style.height = (width * ratio) + "px";
        // newItem.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
      }
      let num = document.getElementsByClassName('imgClass').length
      let img = document.getElementsByClassName('imgClass')
      let n = 0
      lazyload() // 页面载入完毕加载可是区域内的图片
      window.onscroll = lazyload
      function lazyload () {
        // 监听页面滚动事件
        let seeHeight = document.documentElement.clientHeight // 可见区域高度

        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop // 滚动条距离顶部高度
        for (let i = n; i < num; i++) {
          img[i].src = img[i].getAttribute('data-src')
          if (img[i].offsetTop < seeHeight + scrollTop) {
            if (
              img[i].getAttribute('src') ===
              'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
            ) {
              img[i].src = img[i].getAttribute('data-src')
            }
            n = i + 1
          }
        }
      }
    },
    showDialog () {
      this.DialogVisible = true
    },
    handleClose () {
      console.log('close event')
    },
    paly () {
      let myVideo = this.$refs.video
      // if (myVideo.paused) {
      myVideo.play()
      this.palyShow = false
      this.showVideo = true
      // }
      // else {
      //   myVideo.pause();
      //   this.palyShow = true
      // }
    },
    getFeed (id) {
      let params = {
        id: id
      }
      this.$api.news
        .getNewsDetail(params)
        .then(res => {
          this.slide = []
          this.feed = res.data
          if (res.data.keywords) {
            this.feed.keywords = res.data.keywords.split(',')
          }
          this.activeName = res.data.csort_id
          // this.feed.release_time = this.$formatTime(this.feed.release_time)
          if (this.activeName === 12) {
            document.title = res.data.content
            this.feed.summary = this.feed.content.replace(
              /(\r\n|\n|\r)/gm,
              '<br />'
            )
          } else {
            document.title = res.data.title
            this.feed.summary = this.feed.summary.replace(
              /(\r\n|\n|\r)/gm,
              '<br />'
            )
          }
          this.feed.images.forEach(element => {
            let list = {
              src: element.image_src,
              msrc: element.image_src,
              alt: 'picture1',
              title: 'Image Caption 1',
              w: 600,
              h: 400
            }
            this.slide.push(list)
          })

          if (this.activeName === 10) {
            setTimeout(() => {
              this.getImg()
            })
          }
          if (this.activeName !== 13) {
            // this.getComments(id);
          } else {
            setTimeout(() => {
              this.prompt = false
            }, 4500)
          }
          setTimeout(() => {
            // this.img1.push('1.jpg')
            this.$previewRefresh()
            // let u = navigator.userAgent;
            // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            // if (this.activeName === 11 && this.feed.video_src.substr(-4) === '.flv' && isAndroid) {
            //   let flvjs = require('flv.js');
            //   if (flvjs.default.isSupported()) {
            //     var videoElement = document.getElementById('videoElement');
            //     var flvPlayer = flvjs.default.createPlayer({
            //       type: 'flv',
            //       url: this.feed.video_src
            //     });
            //     flvPlayer.attachMediaElement(videoElement);
            //     flvPlayer.load();
            //     // flvPlayer.play();
            //   }
            // }
          })
          this.loading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    showFeed () {
      this.activeName = this.feed.activeName
      // this.feed.release_time = this.$formatTime(this.feed.release_time)
      if (this.activeName === 12) {
        this.feed.summary = this.feed.content.replace(
          /(\r\n|\n|\r)/gm,
          '<br />'
        )
      } else {
        this.feed.summary = this.feed.summary.replace(
          /(\r\n|\n|\r)/gm,
          '<br />'
        )
      }
      this.loading = false
    }
  },
  created () {
    this.getFeed(this.$route.query.id)
    // let script = document.createElement("script");
    // script.type = "text/javascript";
    // script.src = "//openinstall.io/openinstall.js?id=1324075754908866419";
    // script.id = "_openinstall_banner";
    // // document.getElementsByTagName('head')[0].appendChild(script);
    // var u = navigator.userAgent;
    // var isAPP =
    //   u.indexOf("meirishanglai_iOS") > -1 ||
    //   u.indexOf("meirishanglai_android") > -1; //APP端
    // if (!isAPP) {
    //   document.getElementsByTagName("head")[0].appendChild(script);
    // }
    // setTimeout(() => {
    //   document.getElementsByClassName('-openinstall-banner')[0].style.display = 'block'
    // }, 3000);
  }
}
</script>

<style  lang="less">
.swiper-pagination{
    position: absolute;
    left: 0;
    top: 0;
    bottom: inherit;
    height: 0.44rem;
    font-size: 0.13rem;
    line-height: 0.44rem;
    color: #fff;
    opacity: .75;
    padding: 0 0.1rem;
    span{
      color: #fff;
    }
}

.el-dialog {
  border-radius: 0px;
}
.el-dialog__header {
  padding: 0px 20px 10px;
}
.dialog-span {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
}
.dialog-left {
  border: 1px solid rgba(51, 51, 51, 1);
  padding: 10px 43px;
  margin-right: 15px;
}
.dialog-right {
  padding: 10px 43px;
  color: rgba(255, 255, 255, 1);
  background: rgba(0, 0, 0, 1);
}

.display-video {
  width: 100%;
  height: 210px;
  video {
    height: 210px;
  }
  img {
    height: 210px;
  }
}

.display-share-img {
  width: 100% !important;
  img {
    object-fit: cover;
    object-position: top;
    width: 100% !important;
    height: 190px;
    cursor: pointer;
  }
}

.display-app {
  color: #000000;
  // font-size: 16px;
  // line-height: 24px;
  position: relative;
  width: 100% !important;
  height: 100%;
  text-align: left;
  // background: url("../assets/img/iphoneX.png") no-repeat center 0;
  background-size: 100%;
  .display-prompt {
    position: absolute;
    bottom: 5vh;
    padding: 0.3vh 1vh;
    left: 50%;
    text-align: center;
    background: rgba(0, 0, 0, 1);
    opacity: 0.5;
    color: #ffffff;
    transform: translate(-50%, 0%);
  }
  .display-heard {
    height: 60px;
    background: rgba(247, 247, 247, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    .display-left {
      border-radius: 8px;
      //   background: url("../assets/img/tou.png") no-repeat center 0;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      z-index: 11;
      width: 32px;
      height: 32px;
      left: 15px;
      top: 15px;
      position: absolute;
    }
    .display-text {
      z-index: 11;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 15px;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      left: 56px;
      top: 20px;
      position: absolute;
      right: 56px;
      top: 20px;
    }
    .display-right {
      width: 60px;
      height: 32px;
      background: rgba(0, 0, 0, 1);
      position: absolute;
      right: 16px;
      top: 15px;
      text-align: center;
      /* line-height: 31px; */
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
      cursor: pointer;
    }
  }
  .display-heard1 {
    height: 60px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
    color: #000000;
    background: rgba(247, 247, 247, 1);
    .display-left {
      border-radius: 8px;
      //   background: url("../assets/img/tou.png") no-repeat center 0;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      z-index: 11;
      width: 32px;
      height: 32px;
      left: 15px;
      top: 15px;
      position: absolute;
    }
    .display-text {
      z-index: 11;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      left: 56px;
      top: 20px;
      position: absolute;
      right: 56px;
      top: 20px;
    }
    .display-right {
      width: 60px;
      height: 32px;
      background: rgba(0, 0, 0, 1);
      position: absolute;
      right: 16px;
      top: 15px;
      text-align: center;
      /* line-height: 31px; */
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
      cursor: pointer;
    }
  }
  .display-num {
    position: absolute;
    right: 3vh;
    top: 10vh;
    z-index: 11;
    background: rgba(247, 247, 247, 0.5);
    height: 4.3vh;
    width: 4.3vh;
    color: rgba(255, 255, 255, 1);
    border-radius: 4.5vh;
    line-height: 4.5vh;
    text-align: center;
  }
  .display-cover {
    position: absolute;
    right: 5%;
    top: 25%;
    text-align: center;
    z-index: 11;
    height: 75px;
    width: 75px;
    color: rgba(255, 255, 255, 1);
    .display-cover-top {
      z-index: 11;
      //   background: url("../assets/img/iphoneX.png") no-repeat center 0;
      background-size: cover;
      height: 48px;
      width: 48px;
      color: rgba(255, 255, 255, 1);
      border-radius: 25px;
      border: 2px solid rgba(255, 255, 255, 1);
      margin: auto;
    }
    .display-cover-boom {
      z-index: 11;
      //   background: url("../assets/img/guanzhu.png") no-repeat center 0;
      height: 24px;
      width: 24px;
      color: rgba(255, 255, 255, 1);
      margin: -10px auto;
    }
  }
  .display-xin {
    position: absolute;
    right: 11.3%;
    top: 40%;
    z-index: 11;
    // background: url("../assets/img/xin.png") no-repeat center 0;
    height: 26px;
    width: 26px;
    color: rgba(255, 255, 255, 1);
    line-height: 70px;
    text-align: center;
  }
  .display-pinglun {
    position: absolute;
    right: 11.3%;
    top: 50%;
    z-index: 11;
    // background: url("../assets/img/pinglun.png") no-repeat center 0;
    height: 26px;
    width: 26px;
    color: rgba(255, 255, 255, 1);
    line-height: 70px;
    text-align: center;
  }
  .display-zan {
    position: absolute;
    right: 11.3%;
    top: 60%;
    z-index: 11;
    // background: url("../assets/img/zan.png") no-repeat center 0;
    height: 26px;
    width: 26px;
    color: rgba(255, 255, 255, 1);
    line-height: 70px;
    text-align: center;
  }
  .display-demo {
    // position: absolute;
    top: 0;
    left: 24px;
    right: 26px;
    bottom: 40px;
    overflow: auto;
    height: calc(100vh);
    // border-radius: 0 0 35px 35px;
    // border: 1px solid #edf0f4;
    border-top: none;
    background-color: #edf0f4;
    .pinlun {
      background: rgba(255, 255, 255, 1);
      .more {
        margin: 16px;
        padding: 0.5rem;
        text-align: center;
        font-size: 16px;
        background: rgba(0, 0, 0, 1);
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .title {
        padding: 16px;
        font-size: 18px;
        font-weight: 600;
      }
      .border {
        height: 1px;
        margin: 0 16px;
        background: linear-gradient(
          180deg,
          rgba(235, 235, 235, 0) 0%,
          rgba(235, 235, 235, 1) 0%,
          rgba(235, 235, 235, 1) 100%
        );
      }
      .content {
        .span {
          cursor: pointer;
          color: #4a8de2;
        }
        .heard {
          padding: 10px 16px;
          display: flex;
          align-items: center;
          .left {
            display: inline;
            .cover {
              background-size: cover;
              width: 25px;
              height: 25px;
              border-radius: 50%;
            }
          }
          .right {
            margin-left: 0.5rem;
            font-size: 14px;
            font-family: PingFangSC-Medium;
            font-weight: 600;
            color: rgba(0, 0, 0, 1);
            line-height: 25px;
          }
        }
        .body {
          padding: 0 16px;
          display: flex;
          align-items: center;
          .left {
            width: 25px;
            height: 25px;
          }
          .border-bottom {
            border-bottom: 1px solid #ebebeb;
          }
          .right {
            width: 100%;
            position: relative;
            margin-left: 0.5rem;
            .text {
              font-size: 16px;
              font-family: PingFangSC-Regular;
              font-weight: 500;
              color: rgba(0, 0, 0, 1);
              line-height: 25px;
            }
            .boom {
              padding: 0.5rem 0;
              position: relative;
            }
            .time {
              // float: left;
              // position: absolute;
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 16px;
            }
            .count {
              float: right;
              position: absolute;
              display: flex;
              right: 0;
              top: 0.5rem;
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              .top {
                padding: 0 1rem;
                // background: url("../assets/img/up.png") no-repeat;
                background-position: 0% 0;
              }
              .tread {
                padding-left: 1rem;
                // background: url("../assets/img/low.png") no-repeat;
                background-position: 0% 0;
              }
            }
          }
        }
      }
    }
  }
  .display-paly {
    width: 68px;
    height: 68px;
    background: url('../../../themes/images/app/icon_play@2x.png') no-repeat center;
    background-size: 68px;
    text-align: center;
    line-height: 68px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;

  }
  .video-title {
    font-size: 20px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 3.5vh;
    background: rgba(235, 235, 235, 1);
    padding: 2vh;
    margin-right: 6vh;
  }
  .video-cover {
    position: relative;
    padding: 16px;
    display: flex;
    align-items: center;
    .cover {
      // background: url("https://user-gold-cdn.xitu.io/2018/8/16/165413191415b344?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1");
      background-size: cover;
      width: 25px;
      height: 25px;
      z-index: 11;
      border-radius: 50%;
      float: left;
    }
    .name {
      display: inline-block;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 16px;
      margin: 0 5px;
    }
    .text {
      display: inline-block;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 16px;
    }
  }
  .video-content {
    font-size: 14px;
    width: 100%;
    padding: 16px;
    line-height: 24px;
    p {
      text-align: left;
      background: none !important;
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
    img {
      margin: 0 auto;
      display: block;
      // width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      max-height: initial !important;
    }
    .img_loading {
      background-color: #ebebeb;
      border: 1 px solid #ebebeb;
      background-size: 100px;
      background-position: center center;
      background-repeat: no-repeat;
      //   background-image: url(../assets/img/loading2.png);
    }
    .h1,
    h1 {
      display: block;
      font-size: 2em;
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      line-height: 1;
    }
    .h2,
    h2 {
      display: block;
      font-size: 1.5em;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      line-height: 1;
    }
    .h3,
    h3 {
      display: block;
      font-size: 1.17em;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      line-height: 1;
    }
    .h4,
    h4 {
      display: block;
      font-size: 1em;
      margin-block-start: 1.33em;
      margin-block-end: 1.33em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      line-height: 1;
    }
    .h5,
    h5 {
      display: block;
      font-size: 0.83em;
      margin-block-start: 1.67em;
      margin-block-end: 1.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      line-height: 1;
    }
    .h6,
    h6 {
      display: block;
      font-size: 0.67em;
      margin-block-start: 2.33em;
      margin-block-end: 2.33em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      line-height: 1;
    }
  }
  .video-tags {
    // margin: 0 0 32px 0;
    // margin: 0 0 70px 16px;
    padding: 0 0 70px 16px;
    .tag {
      display: inline-block;
      padding: 8px 5px;
      background: black;
      color: white;
      margin: 10px 16px 0 0;
    }
  }
  .display-img {
    position: relative;
    padding: 0 12px!important;
    .ul {
      max-width: 100%;
      overflow: hidden;
      font-size: 0;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      // margin: 0  -16px;
      .li {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        width: 31%;
        // height: 111px;
        margin: 0 10px 10px 0;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .div {
          padding-bottom: 100%;
          background-color: #e6e6e6;
          height: 0;
          position: relative;
          // display: inline-block;
          width: 100%;
          // height: 111px;
          .img {
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50%;
            position: absolute;
            width: 100%;
            height: 100%;
            // height: 111px;
          }
        }
      }
      .li-1 {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        width: 100%;
        // padding: 0 0.3125rem 0.3125rem 0;
        .div {
          padding-bottom: 100%;
          background-color: #e6e6e6;
          height: 0;
          position: relative;
          // display: inline-block;
          width: 100%;
          .img {
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50%;
            position: absolute;
            width: 100%;
            height: 100%;
          }
        }
      }
      .li-2 {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        width: 47.8%;
        margin: 0 12px 12px 0;
        &:nth-child(2n) {
          margin: 0;
        }
        .div {
          padding-bottom: 100%;
          background-color: #e6e6e6;
          height: 0;
          position: relative;
          // display: inline-block;
          width: 100%;
          .img {
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50%;
            position: absolute;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .img-text {
    height: 32px;
    background: rgba(247, 247, 247, 0.7);
    text-align: left;
    position: absolute;
    bottom: 0px;
    font-size: 12px;
    line-height: 32px;
    .left {
      border-right: 2px solid rgba(247, 247, 247, 0.7);
      padding-right: 10px;
      padding-left: 10px;
    }
    .right {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  .img-video {
    height: 32px;
    background: rgba(247, 247, 247, 0.7);
    text-align: left;
    font-size: 12px;
    line-height: 32px;
    padding: 0 12px;
    .left {
      border-right: 2px solid rgba(247, 247, 247, 0.7);
      padding-right: 10px;
      padding-left: 10px;
    }
    .right {
      padding-left: 10px;
      padding-right: 10px;
    }
    bottom: 20px;
  }
  .video-summary {
    color: rgba(102, 102, 102, 1);
    background: rgba(255, 255, 255, 1);
    padding: 16px;
    margin: 16px;
    font-size: 14px;
  }
}
@media screen and (min-width: 1024px) {
  .display-app {
    width: 750px;
    margin: 0 auto;
  }
}
</style>
