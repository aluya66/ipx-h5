<template>
  <div style="min-height:100px">
    <div v-show="content" id="content-html" class="video-content" v-html="content"></div>
    <!-- {{content}} -->
  </div>
</template>

<script>
window.onerror = function (err) {
    console.log('window.onerror: ' + err)
}
/* 这段代码是固定的，必须要放到js中 */
function setupWebViewJavascriptBridge (callback) {
    // console.log(WebViewJavascriptBridge)
    let WebViewJavascriptBridge = callback
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge) }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}
export default {
    components: {
    },
    data () {
        return {
            content: '',
            imagList: [],
            loading: true
        }
    },
    mounted: function () {
    },
    methods: {
        getImg () {
            this.imagList = []
            let slef = this
            let bridgeS =
        window.WebViewJavascriptBridge || window.WKWebViewJavascriptBridge
            let wrap = document.getElementById('content-html')
            let imgTag = wrap.getElementsByTagName('img')
            let jointImgs = wrap.getElementsByClassName('joint-img-margin')
            var u = navigator.userAgent
            // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            if (jointImgs && jointImgs.length > 0) {
                for (let j = 0; j < jointImgs.length; j++) {
                    jointImgs[j].parentNode.style.margin = '0'
                }
            }
            for (let j = 0; j < imgTag.length; j++) {
                if (imgTag[j].src !== '') {
                    imgTag[j].setAttribute('class', 'imgClass')
                }
            }
            let imgs = wrap.getElementsByClassName('imgClass')
            for (let i = 0; i < imgs.length; i++) {
                imgs[i].setAttribute('width', '')
                imgs[i].setAttribute('class', 'imgClass img_loading')
                let id = imgs[i].getAttribute('data-id')
                // let newItem = document.createElement('img')
                let width = parseFloat(imgs[i].getAttribute('data-w'))
                // let parentDom = null
                // parentDom = imgs[i].parentElement
                let Htmlwidth = document.getElementById('content-html').clientWidth
                if (width > Htmlwidth) width = Htmlwidth
                let ratio = parseFloat(imgs[i].getAttribute('data-ratio'))
                let img = {
                    src: imgs[i].src,
                    id: id
                }
                if (imgs[i].getAttribute('src')) {
                    slef.imagList.push(img)
                    imgs[i].setAttribute('data-src', imgs[i].getAttribute('src'))
                    imgs[i].setAttribute('src', 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==')
                    // imgs[i].setAttribute("style", "width:" + width + "px;height:" + (width * ratio) + "px")
                    // 表情包样式
                    if (imgs[i].style.maxWidth !== '40%') {
                        imgs[i].style.width = width + 'px'
                        imgs[i].style.height = (width * ratio) + 'px'
                    }
                }
                let bridgesData = {
                    list: slef.imagList,
                    index: i,
                    id: id
                }
                // newItem.className = "img_loading";
                // newItem.id = "img_loading" + i;
                // newItem.style.width = width + "px";
                // newItem.style.height = (width * ratio) + "px";
                // newItem.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
                // parentDom.insertBefore(newItem, imgs[i])
                if (isiOS) {
                    // wrap.setAttribute("style", "margin-bottom:2rem")
                    /* 与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS */
                    setupWebViewJavascriptBridge(function (bridge) {
                        /* Initialize your app here */

                        /* 我们在这注册一个js调用OC的方法，不带参数，且不用ObjC端反馈结果给JS：打开本demo对应的博文 */
                        bridge.registerHandler('openWebviewBridgeArticle', function () {
                            console.log('openWebviewBridgeArticle was called with by ObjC')
                        })
                        /* JS给ObjC提供公开的API，在ObjC端可以手动调用JS的这个API。接收ObjC传过来的参数，且可以回调ObjC */
                        bridge.registerHandler('getUserInfos', function (data, responseCallback) {
                            console.log('Get user information from ObjC: ', data)
                            responseCallback({ 'userId': '123456', 'blog': '' })
                        })

                        /* JS给ObjC提供公开的API，ObjC端通过注册，就可以在JS端调用此API时，得到回调。ObjC端可以在处理完成后，反馈给JS，这样写就是在载入页面完成时就先调用 */
                        bridge.callHandler('getUserIdFromObjC', function (responseData) {
                            console.log("JS call ObjC's getUserIdFromObjC function, and js received response:", responseData)
                        })

                        imgs[i].onclick = function (e) {
                            console.log('------callBackData', bridgesData)
                            bridge.callHandler('BridgeCallHandler', bridgesData, function (response) {
                                console.log('JS got response', response)
                            })
                        }
                        console.log('------callBackData', bridgesData)
                    })
                } else {
                    console.log('------callBackData', bridgesData)
                    imgs[i].onclick = function () {
                        // jsClick(slef.imagList, i, id)
                        bridgeS.send(JSON.stringify(bridgesData), (callBackData) => {
                            // 处理返回数据
                            console.log('------callBackData', callBackData)
                        })
                        // alert('------callback data')
                        // window.location.href='http://www.baidu.com?id=11111111111111';
                    }
                }
                if (imgs[i].style.margin === '0px' && imgs[i].style.display === 'inline-block') {
                    imgs[i].onload = function () {
                        imgs[i].style.backgroundImage = 'none'
                    }
                }
                // imgs[i].onload = function () {
                //   document.getElementById("img_loading" + i).style = "display: none"
                //   imgs[i].setAttribute("style", "display: ''")
                // }
            }
            if (isiOS) {
                if (window.screen.height === 812 || window.screen.height === 896) wrap.setAttribute('style', 'padding-bottom:34px')
                else wrap.setAttribute('style', 'padding-bottom:8px')
                // let num = document.getElementsByTagName('img').length;
                // let img = document.getElementsByTagName("img");
                let num = document.getElementsByClassName('imgClass').length
                let img = document.getElementsByClassName('imgClass')
                let n = 0
                this.lazyload(n, num, img) // 页面载入完毕加载可是区域内的图片
                window.onscroll = this.lazyload
                // function lazyload () { // 监听页面滚动事件
                //   let seeHeight = document.documentElement.clientHeight // 可见区域高度
                //   let scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动条距离顶部高度
                //   for (let i = n; i < num; i++) {
                //     if (img[i].offsetTop < seeHeight + scrollTop) {
                //       if (img[i].getAttribute('src') == 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==') {
                //         img[i].src = img[i].getAttribute('data-src')
                //       }
                //       n = i + 1
                //     }
                //   }
                // }
            } else {
                // const io = new IntersectionObserver(callback);
                // let imgsRc = document.querySelectorAll('[data-src]');
                // function callback (entries) {
                //   entries.forEach((item) => {
                //     if (item.isIntersecting) {
                //       item.target.src = item.target.dataset.src
                //       io.unobserve(item.target)
                //     }

                //   })
                // }
                // imgsRc.forEach((item) => {
                //   io.observe(item)
                // })
            }
            let num = document.getElementsByTagName('img').length
            let img = document.getElementsByTagName('img')
            let n = 0
            for (let i = n; i < num; i++) {
                if (img[i].getAttribute('src') === 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==') {
                    img[i].src = img[i].getAttribute('data-src')
                }
                n = i + 1
            }
        },
        lazyload (n, num, img) { // 监听页面滚动事件
            let seeHeight = document.documentElement.clientHeight // 可见区域高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动条距离顶部高度
            for (let i = n; i < num; i++) {
                if (img[i].offsetTop < seeHeight + scrollTop) {
                    if (img[i].getAttribute('src') === 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==') {
                        img[i].src = img[i].getAttribute('data-src')
                    }
                    n = i + 1
                }
            }
        },
        getFeed (id) {
            let params = {
                id: id
            }
            this.$api.news
                .getNewsDetail(params)
                .then(res => {
                    console.log(res)
                    this.loading = false
                    if (res && res.data && res.data.content) {
                        this.content = res.data.content
                        setTimeout(() => {
                            this.getImg()
                        })
                    } else {
                        this.content = '无数据'
                    }
                })
                .catch(err => {
                    console.log(err)
                    // if (err.response && err.response.data && err.response.data.message) {
                    //     this.$message({
                    //     message: err.response.data.message,
                    //     type: "error"
                    //     });
                    // } else {
                    //     this.$message({
                    //     message: "评论加载失败",
                    //     type: "error"
                    //     });
                    // }
                })
        }
    },
    created () {
        this.getFeed(this.$route.query.id)
    }
}
</script>
<style  lang="less">
.video-content {
  color: #2A2B33;
  font-size: 14px;
  width: 100% !important;
  line-height: 24px;
  text-align: left;
  display: inline-block;
  // background-color: #f7f7f7;
  // padding-bottom: 30px !important;
  background-color: #fff;
  // height: calc(100vh);
  // overflow: auto;
  p {
    text-align: left;
    background: none !important;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding: 0 16px!important;
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
    // background-image: url(../assets/img/loading2.png);
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
@media screen and (min-width: 1024px) {
  .video-content {
    width: 750px;
    margin: 0 auto;
  }
}
</style>
