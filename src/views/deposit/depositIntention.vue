<template>
   <layout-view>
   <c-header class="my-header" slot="header" :left-arrow="true">
       <div slot="title">填写意向单</div>
   </c-header>

    <div class="content" style="height: calc(100vh - 65px)">
        <p>请填写以下信息，我们会根据您的需求推荐更合适的方案～</p>

        <div class="info-input">
            <span>姓名</span>
            <field
            class="input"
            v-model="userName"
            :border="false"
            placeholder="请输入您的姓名"
            maxlength="10"
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
                {{sliderData.value[0]}}元 - {{sliderData.value[1]===9900 ? "不限" : sliderData.value[1]+"元"}}
            </div>
        </div>

        <vue-slider ref="slider3" v-bind="sliderData" v-model="sliderData.value" style="margin-top: 0.1rem; height: 0.04rem;">
        </vue-slider>

    </div>

        <div class="footview" :style="getBottomOffset(0)" style="bottom: 0">
            <button @click="commitForm">确定</button>
        </div>

   </layout-view>
</template>

<script>
import { Field, Dialog } from 'vant'
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

            phoneFormartResult: false,
            userNameFormartResult: false,
            showPhoneError: false,
            showUserNameError: false,

            sliderData: {
                width: '94%',
                show: true,
                value: [0, 9900],
                min: 0,
                max: 9900,
                interval: 100,
                tooltip: 'always'

            },
            handleBottom: 0

        }
    },
    created() {
        this.busiStyle = ''
        utils.setStore('businStyle', '')
    },
    activated() {
        this.busiStyle = utils.getStore('businStyle')
        console.log(this.busiStyle)
    },
    watch: {
        userPhone (val) {
            let phoneResult = utils.isPhone(this.userPhone)
            this.phoneFormartResult = phoneResult
            if (val.length === 11) {
                if (!phoneResult) {
                    this.showPhoneError = true
                    this.$toast('手机格式有误')
                } else {
                    this.showPhoneError = false
                }
            } else {
                this.phoneFormartResult = false
                this.showPhoneError = false
            }
        },
        userName (val) {
            let reg = /^[a-zA-Z\s\u4e00-\u9fa5]+$/
            let spacingReg = /^[ ]+$/
            if (spacingReg.test(val)) {
                this.userName = ''
            }
            let userNameResult = reg.test(val)

            if (!userNameResult) {
                this.userNameFormartResult = false
                this.showUserNameError = true
                // this.$toast('请输入正确的姓名')
                this.$toast('请输入中英文字符')
            } else {
                this.userNameFormartResult = true
                this.showUserNameError = false
            }
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleVerifyPhone () {
            this.handleBottom = '0'
            if (this.userPhone.length < 11) {
                this.$toast('手机格式有误')
                this.showPhoneError = true
            }
        },
        handleVerifyUserName () {
            this.handleBottom = '0'
        },
        handleHeight () {
            let platform = utils.getStore('baseParams').platform
            if (platform === 'android') {
                this.handleBottom = '300px'
            }
        },
        chooseAddress() {
            const params = {
                jumpUrl: 'chooseAddress://'
            }
            utils.postMessage('', params)
            window.getAddressInfo = (adrs) => {
                this.handleBottom = '0'
                this.address = adrs
            }
        },
        chooseStyle() { // 选择风格
            this.$router.push({
                path: '/chooseBusiStyle'
            })
        },
        commitForm() { // 提交
            if (this.phoneFormartResult & this.userNameFormartResult & this.address !== '' & this.busiStyle !== '') {
                const params = {
                    phoneNumber: this.userPhone,
                    relName: this.userName,
                    address: this.address,
                    style: this.busiStyle,
                    minPrice: this.sliderData.value[0],
                    maxPrice: this.sliderData.value[1]
                }
                this.$api.deposit.createIntention(params).then(res => {
                    Dialog.alert({
                        message: '您的意向已收到！请耐心等待客服人员来电沟通哦～',
                        confirmButtonText: '我知道了'
                    }).then(() => {
                        this.$router.go(-1)
                    })
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.$toast('请完善信息')
            }
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
        background-color: @color-c7;
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
    .van-field__control {
        &::-webkit-input-placeholder {
            font-size:14px;
            font-weight:500;
            color:@color-c4;
        }
    }
}

</style>

<style lang='less' scoped>
.my-header {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: @color-c7;
  }
}
.content {
    overflow-y: scroll;
    overflow-x:hidden;
    height: 80%;
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
            font-weight:bold;
            color:@color-c1;
            .placeholder {
                font-size:14px;
                font-weight:500;
                color:@color-c4;
                line-height:44px;
                margin-left: 20px;
            }
            .showText {
                font-size:14px;
                font-weight:bold;
                color:@color-c1;
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
        margin-bottom: 5px;
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
