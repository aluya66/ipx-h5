<template>
  <popup
    v-model="isShow"
    closeable
    round
    position="bottom"
    class="contain apply-popup"
    @close="handleClose"
    :style="{ height: '4.59rem', bottom: handleBottom}"
  >
    <h3>报名参会</h3>
    <div class="content">
      <p>订货会为私享定向邀请制，需提交报名审核通过方可入场</p>
      <field
        class="input"
        v-model="userName"
        :border="false"
        placeholder="请输入姓名"
        maxlength="20"
        :error="showUserNameError"
        @blur="handleVerifyUserName"
        @focus="handleHeight"
      />
      <field
        class="input"
        v-model="userPhone"
        type="number"
        maxlength="11"
        :border="false"
        placeholder="请输入手机号"
        :error="showPhoneError"
        @blur="handleVerifyPhone"
        @focus="handleHeight"
      />
      <field
        class="input"
        v-model="userCity"
        :border="false"
        placeholder="请输入您所在城市"
        maxlength="20"
        :error="showUserCityError"
        @blur="handleVerifyUserCity"
        @focus="handleHeight"
      />
      <p class="secHeader">经营类型:</p>
      <div class="manage">
        <section
          :class="handleContainItem(item.tradeCode) ? 'manageItem itemSelect' :'manageItem itemDefault' "
          v-for="(item ,index) in manageTypes"
          :key="index"
          @click="handleSelect(item.tradeCode)"
        >{{item.tradeDesc}}</section>
      </div>
      <div :class="['submit',submitState?'enable':'disable']" @click="handleApply">提交报名</div>
    </div>
  </popup>
</template>

<script>
import { Popup, Field } from 'vant'
import utils from 'utils'

export default {
    components: {
        Popup,
        Field
    },
    props: {
        showPopup: {
            type: Boolean,
            default: false
        },
        manageTypes: {
            type: Array,
            default () {
                return []
            }
        },
        phoneNumber: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            timer: null,
            isShow: false,
            safeAreaInsetStatus: true,
            phoneFormartResult: false,
            userNameFormartResult: false,
            userCityFormartResult: false,
            showPhoneError: false,
            showUserNameError: false,
            showUserCityError: false,
            userName: '',
            userPhone: '',
            userCity: '',
            selectCode: '',
            handlePosition: 'fixed',
            handleBottom: 0
            // selectItems: []
        }
    },
    watch: {
        phoneNumber (val) {
            this.userPhone = val || ''
        },
        showPopup (val) {
            this.isShow = val
        },
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
            // let reg = /^[\u0391-\uFFE5A-Za-z]+$/
            // let reg = /^\[a-zA-Z\s\u4e00-\u9fa5]+$/
            let reg = /^[a-zA-Z\s\u4e00-\u9fa5]+$/
            // let reg = /^[\u0391-\uFFE5\s\A-Za-z]+$/
            let spacingReg = /^[ ]+$/
            if (spacingReg.test(val)) {
                this.userName = ''
            }
            // else {
            //   let rs = ''
            //   for (let i = 0; i < val.length; i++) {
            //     if (reg.test(val.substr(i, 1))) {
            //       rs = rs + val.substr(i, 1)
            //     }
            //   }
            //   this.userName = rs
            // }

            // this.userName = val.replace(filterSpecharsReg, '')
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
        },
        userCity (val) {
            let reg = /^[a-zA-Z\s\u4e00-\u9fa5]+$/
            // let reg = /^\S[a-zA-Z\s\u4e00-\u9fa5]+\S$/
            // let reg = /^[\u0391-\uFFE5\s\A-Za-z]+$/
            let spacingReg = /^[ ]+$/
            if (spacingReg.test(val)) {
                this.userCity = ''
            }
            // else {
            //   let rs = ''
            //   for (let i = 0; i < val.length; i++) {
            //     if (reg.test(val.substr(i, 1))) {
            //       rs = rs + val.substr(i, 1)
            //     }
            //   }
            //   this.userCity = rs
            // }
            let userCityResult = reg.test(val)
            if (!userCityResult) {
                this.userCityFormartResult = false
                this.showUserCityError = true
                // this.$toast('请输入正确的城市')
                this.$toast('请输入中英文字符')
            } else {
                this.userCityFormartResult = true
                this.showUserCityError = false
            }
        }
    },
    created () {
        this.userPhone = this.phoneNumber || ''
    },
    computed: {
        submitState () {
            if (
                this.userName.length &&
        this.userCity.length &&
        this.selectCode.length &&
        this.phoneFormartResult &&
        this.userNameFormartResult &&
        this.userCityFormartResult
            ) {
                return true
            }
            return false
        }
    },
    methods: {
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
        handleVerifyUserCity () {
            this.handleBottom = '0'
        },
        handleHeight () {
            let platform = utils.getStore('baseParams').platform
            if (platform === 'android') {
                this.handleBottom = '300px'
            }
        },
        // 处理选择经营类型
        handleSelect (itemCode) {
            this.selectCode = itemCode
            // this.selectItems = []
            // let result = this.selectItems.indexOf(itemCode)
            // if (result > -1) {
            //   this.selectItems.splice(result, 1)
            // } else {
            //   this.selectItems.push(itemCode)
            // }
        },
        // 判断是否选中
        handleContainItem (itemCode) {
            // let result = this.selectItems.indexOf(itemCode)
            return this.selectCode === itemCode
        },
        handleClose () {
            this.$emit('onClose')
        },
        handleApply () {
            // 上报按钮事件
            window.sensors.track('click', {
                // String 类型
                pagename: 'submitApplication'
            })
            if (this.submitState) {
                let info = {
                    userName: this.userName,
                    userPhone: this.userPhone,
                    userCity: this.userCity,
                    manageCode: this.selectCode
                }
                this.$emit('submit', info)
            }
        }
    }
}
</script>

<style lang="less">
.apply-popup{
  .van-field__control{
    font-weight: 600;
    color: #2a2b33;
    &::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #b2b5c1;
    }
  }
}
</style>
<style lang='less' scoped>
.contain {
  h3 {
    display: block;
    height: 52px;
    width: 100%;
    line-height: 52px;
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: @color-c1;
    text-align: center;
  }

  .content {
    border-top: 0.5px solid #e3e2e6;
    padding: 0 16px;
    > p {
      // height: 16px;
      font-family: PingFangSC;
      font-size: 12px;
      line-height: 16px;
      color: #585b66;
      margin: 20px 0 0 0;
      text-align: center;
    }
    .input {
      height: 40px;
      border-radius: 4px;
      background-color: @color-c8;
      margin-top: 16px;
      font-size: 14px;
      align-items: center;
    }
    .secHeader {
      text-align: left;
      font-size: 12px;
      line-height: 16px;
      color: @color-c1;
      margin-top: 16px;
    }
    .manage {
      margin-top: 12px;
      overflow: auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      .manageItem {
        width: 77px;
        height: 32px;
        border-radius: 16px;
        background-color: #f4f5f7;
        line-height: 32px;
        font-size: 12px;
        font-weight: 600;
        margin-left: 12px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        &:first-child {
          margin-left: 0;
        }
      }
      .itemDefault {
        color: @color-c1;
        border: solid 1px #f4f5f7;
      }
      .itemSelect {
        border: solid 1px #3c5cf6;
        background-color: #ebeeff;
        color: #3c5cf6;
      }
    }
    .submit {
      height: 50px;
      line-height: 50px;
      border-radius: 25px;
      // box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
      margin: 32px 0 38px;
      font-size: 18px;
      font-weight: 600;
      // line-height: 1.44;
      color: #ffffff;
      text-align: center;
    }
    .enable {
      background-image: linear-gradient(to right, #557af4, #724fff);
    }
    .disable {
      background-image: linear-gradient(to right, @color-c5, @color-c5);
    }
  }
}
</style>
