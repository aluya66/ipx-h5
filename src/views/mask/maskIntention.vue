<template>
   <layout-view>
   <c-header class="my-header" slot="header" :left-arrow="true">
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
            maxlength="20"
            :error="showUserNameError"
            @blur="handleVerifyUserName"
            :clearable="true"
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
                :clearable="true"
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
            :clearable="true"
            />
        </div>

        <div class="info-input">
            <span>公司名称</span>
            <field
            class="input"
            v-model="companyName"
            :border="false"
            placeholder="请输入您的公司名称"
            maxlength="50"
            :error="showCompanyNameError"
            @blur="handleVerifyUserName"
            :clearable="true"
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

            <van-grid class="pictures" :border="false" :column-num="3" :gutter="8" style="padding-left: 0;">
                <van-grid-item v-for="(img,index) in designPictures" :key="index" v-show="designPictures.length != 0" style="padding-bottom: 8px;">
                    <img class="photo_item" :src="img" alt="">
                    <img class="photo_delete" :src="deletePic" alt="" @click="deletePhoto(img)">
                </van-grid-item>
                <van-grid-item style="padding-bottom: 8px;">
                    <div class="choose_content">
                        <div class="photo-choose"  >
                            <img :src="choose_picture" alt="">
                        </div>
                        <input ref="inputer" type="file" @change="choosePhoto" accept="image/jpg,image/png,image/jpeg" name="imgUrls" multiple>
                    </div>
                </van-grid-item>
            </van-grid>

        </div>

    </div>

        <div class="footview" :style="getBottomOffset(0)">
            <button @click="commitForm">确定</button>
        </div>
   </layout-view>
</template>

<script>
import { Field, Dialog, Grid, GridItem } from 'vant'
import utils from 'utils'
export default {
    components: {
        Field,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem
    },
    data () {
        return {
            choose_picture: require('../../themes/images/groupGoods/icon_choose_camera@3x.png'),
            deletePic: require('../../themes/images/app/control_delete_blue@3x.png'),
            userName: '',
            userPhone: '',
            purchaseNum: '',
            purchaseUse: '',
            postName: '',
            companyName: '',
            designPictures: [],
            pictureUrls: [],

            phoneFormartResult: false,
            userNameFormartResult: false,
            postFormartResult: false,
            companyFormartResult: false,

            showPhoneError: false,
            showUserNameError: false,
            showPostNameError: false,
            showCompanyNameError: false
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
            if (this.userPhone.length < 11) {
                this.$toast('手机格式有误')
                this.showPhoneError = true
            }
        },
        handleVerifyUserName () {
            window.scroll(0, 0)
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
        imgPreview (file) {
            // 创建一个reader
            let reader = new FileReader()
            // 将图片将转成 base64 格式
            reader.readAsDataURL(file)
            // 读取成功后的回调
            reader.onload = function () {
                console.log('result: ', reader.result)
                return reader.result
            }
        },
        uploadPicture(files) {
            utils.upload(files).then(result => {
                this.pictureUrls = this.pictureUrls.concat(result)
                console.log('pictureUrls: ', this.pictureUrls)
                // this.$toast('上传成功')
                // Toast.clear()
            }).catch(() => {
                // this.$toast('上传图片失败')
            })
        },
        choosePhoto(e) {
            let inputDOM = this.$refs['inputer']
            // 通过DOM取文件数据
            this.files = inputDOM.files
            if (this.files.length > 0) {
                this.files.forEach(element => {
                    let _this = this
                    let size = Math.floor(element.size / 1024)
                    console.log('size: ', size)
                    if (size > 1000) {
                        this.$toast('所选图片不能大于1M')
                        return false
                    }
                    _this.uploadPicture([element])
                    let reader = new FileReader()
                    reader.readAsDataURL(element)
                    reader.onload = function () {
                        _this.designPictures = _this.designPictures.concat(reader.result)
                    }
                })
            }
        },
        deletePhoto(img) {
            let index = this.designPictures.indexOf(img)
            this.designPictures.splice(index, 1)
            console.log(this.designPictures)
            this.pictureUrls.splice(index, 1)
        },
        // 确定提交
        commitForm() {
            if (this.userPhone !== '' & this.userName !== '' & this.postName !== '' & this.companyName !== '' & this.purchaseUse !== '' & this.purchaseNum !== '') {
                debugger
                if (!this.phoneFormartResult) {
                    this.$toast('手机号码填写有误')
                    return
                }
                if (!this.userNameFormartResult) {
                    this.$toast('联系人填写有误')
                    return
                }
                if (!this.postFormartResult) {
                    this.$toast('岗位名称填写有误')
                    return
                }
                if (!this.companyFormartResult) {
                    this.$toast('公司名称填写有误')
                    return
                }
                const params = {
                    mobile: this.userPhone,
                    realName: this.userName,
                    count: this.purchaseNum,
                    jobName: this.postName,
                    companyName: this.companyName,
                    used: this.purchaseUse
                }
                if (this.pictureUrls.length > 0) {
                    params.imgUrl = this.pictureUrls.join(',')
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
            if (this.userPhone === '') {
                this.phoneFormartResult = true
                this.showPhoneError = false
                return
            }
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

            if (!userNameResult & this.userName !== '') {
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

            if (!postNameResult & this.postName !== '') {
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

            if (!companyNameResult & this.companyName !== '') {
                this.companyFormartResult = false
                this.showCompanyNameError = true
                this.$toast('请输入中英文字符')
            } else {
                this.companyFormartResult = true
                this.showCompanyNameError = false
            }
        }
    }
}
</script>

<style lang="less">
.content {
    .van-field__control {
        &::-webkit-input-placeholder {
            font-size:14px;
            font-weight:500;
            color:@color-c4;
        }
    }
    .van-grid-item__content {
        padding: 0;
    }
    // .pictures {
        // .van-grid {
        //     padding-left: 0px;
        // }
    // }
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
    // overflow-x:hidden;
    height: 89%;
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
            border-radius: 8px;
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
        .pictures {
            // background: lightgray;
            margin-top: 12px;
            position: relative;
            .photo_item {
                width: calc(33.33vw - 16px);
                height: calc(33.33vw - 16px);
                border-radius:8px;
                object-fit: cover;
            }
            .photo_delete {
                position: absolute;
                width: 20px;
                height: 20px;
                top:0;
                right: 3px;
            }
        }
        .choose_content {
            position: relative;
            .photo-choose {
                width: calc(33.33vw - 16px);
                height: calc(33.33vw - 16px);
                background: @color-c8;
                border-radius:8px;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 100;
            }
            > input {
                position: absolute;
                width: calc(33.33vw - 16px);
                height: calc(33.33vw - 16px);
                top: 0;
                font-size: 0;
            }
            input::-webkit-file-upload-button {
                font-size: 0;
                display: none;
            }
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
