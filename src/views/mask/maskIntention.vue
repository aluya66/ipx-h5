<template>
   <layout-view>
   <c-header slot="header" :left-arrow="true">
       <div slot="title">填写定制信息</div>
   </c-header>

       <div class="content">
        <p>请填写相关采购信息，确认提交后我们会尽快联系您</p>

        <div class="info-input">
            <span>联系人</span>
            <field
            class="input"
            v-model="userName"
            :border="false"
            placeholder="请输入您的姓名"
            maxlength="10"
            :error="showUserNameError"
            @blur="handleVerifyUserName"
            />
        </div>
        <div class="info-input">
            <span>联系电话</span>
            <field
                class="input"
                v-model="userPhone"
                type="number"
                maxlength="11"
                :border="false"
                placeholder="请输入您的电话"
                :error="showPhoneError"
                @blur="handleVerifyPhone"
            />
        </div>
        <div class="info-input">
            <span>采购数量</span>
            <div class="input" @click="changeBuyNumber">
                <span class="placeholder" v-if="purchaseNum === ''">请选择采购数量</span>
                <span class="showText" v-else>{{purchaseNum}}</span>
                <img src="../../themes/images/app/icon_next_gray@3x.png">
            </div>
        </div>

        <div class="info-input">
            <span>岗位名称</span>
            <field
            class="input"
            v-model="postName"
            :border="false"
            placeholder="请输入您的岗位名称"
            maxlength="20"
            :error="showPostNameError"
            @blur="handleVerifyUserName"
            />
        </div>

        <div class="info-input">
            <span>公司名称</span>
            <field
            class="input"
            v-model="companyName"
            :border="false"
            placeholder="请输入您的公司名称"
            maxlength="20"
            :error="showCompanyNameError"
            @blur="handleVerifyUserName"
            />
        </div>

        <div class="info-input">
            <span>采购用途</span>
            <div class="input" @click="changeBuyUse">
                <span class="placeholder" v-if="purchaseUse === ''">请选择采购用途</span>
                <span class="showText" v-else>{{purchaseUse}}</span>
                <img src="../../themes/images/app/icon_next_gray@3x.png">
            </div>
        </div>

        <div class="choose_photo">
            <p>设计图上传<span>(选填)</span></p>
            <div class="photo-choose"  >
                <img :src="choose_picture" alt="">
            </div>
        </div>

    </div>

        <div class="footview" :style="getBottomOffset(0)">
            <button @click="commitForm">确定</button>
        </div>
   </layout-view>
</template>

<script>
import { Field, Dialog } from 'vant'
import utils from 'utils'
export default {
    components: {
        Field
    },
    data () {
        return {
            choose_picture: require('../../themes/images/groupGoods/icon_choose_camera@3x.png'),
            userName: '',
            userPhone: '',
            purchaseNum: '',
            purchaseUse: '',
            postName: '',
            companyName: '',

            phoneFormartResult: false,
            userNameFormartResult: false,
            postFormartResult: false,
            companyFormartResult: false,

            showPhoneError: false,
            showUserNameError: false,
            showPostNameError: false,
            showCompanyNameError: false,
        }
    },
    created() {
        this.purchaseNum = ''
        this.purchaseUse = ''
        utils.setStore('purchaseNumber', '')
        utils.setStore('purchaseUse', '')
        this.scrollTop()
    },
    activated() {
        this.purchaseNum = utils.getStore('purchaseNumber')
        this.purchaseUse = utils.getStore('purchaseUse')
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        scrollTop() {
            let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi) || false
            if (!isIos) {
                window.onresize = () => {
                    window.setTimeout(function() {
                        if ('scrollIntoView' in document.activeElement) {
                            window.scroll(0, 0)
                            document.getElementById('footview').scrollIntoView(false)
                        } else {
                            document.activeElement.scrollIntoViewIfNeeded()
                        }
                    }, 100)
                }
            }
        },
        handleVerifyPhone () {
            window.scroll(0, 0)
            this.handleBottom = '0'
            if (this.userPhone.length < 11) {
                this.$toast('手机格式有误')
                this.showPhoneError = true
            }
        },
        handleVerifyUserName () {
            window.scroll(0, 0)
            this.handleBottom = '0'
        },
        changeBuyNumber() {
            this.$router.push({
                path: '/mask/purchaseNum' 
            })
        },
        changeBuyUse() {
            this.$router.push({
                path: '/mask/purchaseUse' 
            })
        },
        // 确定提交 
        commitForm() {
            if (this.phoneFormartResult & this.userNameFormartResult & this.postFormartResult & this.companyFormartResult & this.purchaseUse !== '' & this.purchaseNum !== '') {
                const params = {
                    mobile: this.userPhone,
                    realName: this.userName,
                    count: this.purchaseNum,
                    jobName: this.postName,
                    companyName: this.companyName,
                    used: this.purchaseUse
                }
                
                this.$api.deposit.createMaskIntention(params).then(res => {
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
                this.$toast('请填写完整信息后再提交！')
            }
        }

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
                this.$toast('请输入中英文字符')
            } else {
                this.userNameFormartResult = true
                this.showUserNameError = false
            }
        },
        postName (val) {
            let reg = /^[a-zA-Z\s\u4e00-\u9fa5]+$/
            let spacingReg = /^[ ]+$/
            if (spacingReg.test(val)) {
                this.postName = ''
            }
            let postNameResult = reg.test(val)

            if (!postNameResult) {
                this.postFormartResult = false
                this.showPostNameError = true
                this.$toast('请输入中英文字符')
            } else {
                this.postFormartResult = true
                this.showPostNameError = false
            }
        },
        companyName (val) {
            let reg = /^[a-zA-Z\s\u4e00-\u9fa5]+$/
            let spacingReg = /^[ ]+$/
            if (spacingReg.test(val)) {
                this.companyName = ''
            }
            let companyNameResult = reg.test(val)

            if (!companyNameResult) {
                this.companyFormartResult = false
                this.showCompanyNameError = true
                this.$toast('请输入中英文字符')
            } else {
                this.companyFormartResult = true
                this.showCompanyNameError = false
            }
        }
    },
}
</script>

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
    // overflow-x:hidden;
    // height: 80%;
    margin: 16px 0;
    > p {
        margin: 0 16px 4px;
        font-size:13px;
        font-weight:400;
        color: @color-c2;
        line-height:18px;
    }
    .info-input {
        display: flex;
        justify-content: space-between;
        margin: 0 16px;
        > span {
            height:44px;
            font-size:14px;
            font-weight:bold;
            color: @color-c2;
            line-height:44px;
            margin-top: 16px;
            align-self: center;
        }
        .input {
            position: relative;
            width: calc(100vw - 104px);
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
                font-weight:bold;
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


    }
    
    .choose_photo {
        margin: 28px 16px 32px;
        > p {
            font-size:14px;
            font-weight:bold;
            color: @color-c2;
            line-height:20px;
            > span {
                margin-left: 8px;
                font-size:12px;
                font-weight:400;
                color: @color-c3;
                line-height:16px;
            }
        }
        .photo-choose {
            margin-top: 12px;
            width:109px;
            height:109px;
            background:rgba(244,245,247,1);
            border-radius:4px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }


}

    .footview {
        // position: absolute;
        // margin: 0 16px 5px;
        bottom: 0;
        position: fixed;
        left: 16px;
        margin-bottom: 5px;
        > button {
            width: calc(100vw - 32px);
            height:50px;
            background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
            border-radius:25px;
            font-size:18px;
            font-weight:bold;
            color:rgba(255,255,255,1);
        }
    }
</style>
