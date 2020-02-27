<template>
   <layout-view>
   <c-header slot="header" :left-arrow="true">
       <div slot="title">填写意向单</div>
       <!-- <template slot="right" tag="div">
           <img class="header-img" :src="headerSearchImg" />
       </template> -->
   </c-header>

    <div class="content">
        <p>请填写以下信息，我们会根据您的需求推荐更合适的方案～</p>

        <div class="info-input">
            <span>姓名</span>
            <field
            class="input"
            v-model="userName"
            :border="false"
            placeholder="请输入您的姓名"
            maxlength="20"
            :error="showUserNameError"
            @blur="handleVerifyUserName"
            @focus="handleHeight"
            />
        </div>
        <div class="info-input">
            <span>电话</span>
            <field
                class="input"
                v-model="userPhone"
                type="number"
                maxlength="11"
                :border="false"
                placeholder="请输入您的电话"
                :error="showPhoneError"
                @blur="handleVerifyPhone"
                @focus="handleHeight"
            />
        </div>
        <div class="info-input">
            <span>地区</span>
            <div class="input" @click="chooseAddress">
                <span class="placeholder" v-if="address === ''">请选择开店地区</span>
                <span class="showText" v-else>{{address}}</span>
                <img src="../../themes/images/app/icon_next_gray@3x.png">
            </div>
        </div>
        <div class="info-input">
            <span>风格</span>
            <div class="input" @click="chooseStyle">
                <span class="placeholder" v-if="busiStyle === ''">请选择经营风格</span>
                <span class="showText" v-else>{{busiStyle}}</span>
                <img src="../../themes/images/app/icon_next_gray@3x.png">
            </div>
        </div>
        <div class="info-input">
            <span>价格</span>
            <div class="range-price">
                {{demo.demo8.value[0]}}元 - {{demo.demo8.value[1]===9900 ? "不限" : demo.demo8.value[1]+"元"}}
            </div>
        </div>

        <vue-slider ref="slider3" v-bind="demo.demo8" v-model="demo.demo8.value" style="margin-top: 0.1rem; height: 0.04rem;">
        </vue-slider>

    </div>

    <div class="footview" :style="getBottomOffset(0)">
        <button @click="commitForm">确定</button>
    </div>

   </layout-view>
</template>

<script>
import { Field } from 'vant'
import utils from 'utils'

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
    components: {
        VueSlider,
        Field
    },
    data () {
        return {
            userName: '',
            userPhone: '',
            address: '',
            busiStyle: '',

            demo: {
                demo8: {
                    width: '95%',
                    show: true,
                    value: [0, 9900],
                    min: 0,
                    max: 9900,
                    interval: 100,
                    piecewiseLabel: true,
                    tooltip: 'always',
                    tooltipDir: [
                        'bottom',
                        'top'
                    ]
                }
            },
            value: 0
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        chooseAddress() {
            const params = {
                jumpUrl: 'chooseAddress://'
            }
            utils.postMessage('', params)
            window.getAddressInfo = (adrs) => {
                this.address = adrs
            }
        },
        chooseStyle() { //选择风格
            this.$router.push({
                path: '/chooseBusiStyle'
            })
        },
        commitForm() { //提交

        },
        refreshSlider (val) {
            this.$nextTick(() => {
                this.$refs.slider3.refresh()
            })
        }
   
    }
}
</script>

<style lang="less">
.content {
    .vue-slider-rail {
        .vue-slider-process {
            background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
            border-radius:2px;
        }
        .vue-slider-dot-handle {
            height: 24px;
            width: 24px;
            box-shadow:0px 2px 10px 0px rgba(33,44,98,0.06);
            margin-top: -12px;
        }
        .vue-slider-dot-tooltip-top { ///
            // display: none;
            width:12px;
            height:12px;
            background:rgba(250,217,97,1);
            border-radius:6px;
            left: 12px;
            top: 6px;
            .vue-slider-dot-tooltip-inner {
                display: none;
            }
        }
    }
}

</style>

<style lang='less' scoped>

.content {
  margin: 16px;
    .info-input {
        display: flex;
        justify-content: space-between;
        > span {
            height:44px;
            font-size:14px;
            font-weight:500;
            color:rgba(88,91,102,1);
            line-height:44px;
            margin-top: 16px;
            align-self: center;
        }
        .input {
            position: relative;
            width: calc(100vw - 76px);
            height: 44px;
            border-radius: 4px;
            background-color: @color-c8;
            margin-top: 16px;
            font-size: 14px;
            align-items: center;
            .placeholder {
                font-size:14px;
                font-weight:500;
                color:@color-c4;
                line-height:44px;
                margin-left: 20px;
            }
            .showText {
                font-size:14px;
                font-weight:500;
                color:@color-c2;
                line-height:44px;
                margin-left: 20px;
            }
            > img {
                position: absolute;
                right: 16px;
                width: 20px;
                height: 20px;
                margin-top: 12px;
            }
        }
        .range-price {
            width: calc(100vw - 96px);
            margin-top: 16px;
            margin-left: 20px;
            font-size:12px;
            font-weight:500;
            color:rgba(36,71,242,1);
            line-height:44px;
            align-self: center;
        }

    }
}

.footview {
    position: fixed;
    bottom: 0;
    left: 16px;
    > button {
        width: calc(100vw - 32px);
        height:50px;
        background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
        border-radius:25px;
        font-size:18px;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
}

</style>
