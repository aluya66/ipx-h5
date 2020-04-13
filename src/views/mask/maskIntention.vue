<template>
    <layout-view class="header-bg" :style="handleAdjustHeaderBg()">
        <c-header class="header" slot="header" :left-arrow="true" :isLight='false'>
            <div class="title" slot="title">
                填写定制信息
            </div>
            <template slot="left" tag="div">
                <img class="header-img" :src="backImage"/>
            </template>
        </c-header>

        <div class="content" :style="sHeight">

            <TabView class="tab_content" :selectedIndex="stepNumber" @onSwitchTab="tabChanged"/>

            <div class="step_one" v-if="stepNumber === 0">
                <div class="info-input">
                    <span>公司名称</span>
                    <field
                        class="input"
                        v-model="companyName"
                        :border="false"
                        placeholder="请输入公司名称"
                        maxlength="50"
                        :error="showCompanyNameError"
                        @blur="handleVerifyUserName"
                        @focus="handlePosition"
                        :adjust-position='true'
                        :clearable="true"
                    />
                </div>
                <div class="info-input">
                    <span>联系人</span>
                    <field
                        class="input"
                        v-model="userName"
                        :border="false"
                        placeholder="请输入公司联系人名字"
                        maxlength="20"
                        :error="showUserNameError"
                        @blur="handleVerifyUserName"
                        @focus="handlePosition"
                        :clearable="true"
                        :adjust-position='true'
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
                        placeholder="请输入公司联系人电话"
                        :error="showPhoneError"
                        @blur="handleVerifyPhone"
                        @focus="handlePosition"
                        :clearable="true"
                        :adjust-position='true'
                    />
                </div>
                <div class="info-input">
                    <span>职位名称</span>
                    <field
                        class="input"
                        v-model="postName"
                        :border="false"
                        placeholder="请输入公司联系人的职位名称"
                        maxlength="20"
                        :error="showPostNameError"
                        @blur="handleVerifyUserName"
                        @focus="handlePosition"
                        :clearable="true"
                        :adjust-position='true'
                    />
                </div>
            </div>

            <div class="step_second" v-else-if="stepNumber === 1">

                <title-content style="padding: 0;border-radius:0;" title="版型" titleFont="14">
                    <template slot="content">
                        <van-grid class="stereotype" :border="false" :column-num="2">
                            <van-grid-item v-for="(item,index) in stereotypeData" :key="index">
                                <div :class="['stereo_item_content', item.isSelect ? 'select_item' : '']"
                                     @click="stereotypeClick(item)">
                                    <img class="photo_item" :src="item.icon" alt="">
                                    <p :class="['title_item', item.isSelect ? 'select_color' : '']">{{item.title}}</p>
                                    <p :class="['subtitle_item', item.isSelect ? 'select_color' : '']">
                                        {{item.subTitle}}</p>
                                </div>
                            </van-grid-item>
                        </van-grid>
                    </template>
                </title-content>

                <selectBox class="color_type" title="颜色" :columnNum="3" :resourceData="colorData"
                           @onSelectItem="colorClick"></selectBox>
                <selectBox class="flow_type" title="印花工艺" :columnNum="2" :gutter="18" :resourceData="flowerData"
                           @onSelectItem="flowerClick"></selectBox>

                <title-content style="padding: 0;border-radius:0;" title="功能" titleFont="14">
                    <template slot="content">
                        <van-grid class="function_type" :border="false" :column-num="5">
                            <van-grid-item v-for="(funcItem,index) in functionData" :key="index">
                                <div class="function_item_content" @click="functypeClick(funcItem)">
                                    <img class="icon_item"
                                         :src="funcItem.enabled ? (funcItem.isSelect ? funcItem.selectIcon : funcItem.icon) : funcItem.unableIcon"
                                         alt="">
                                    <p :class="['title_item', funcItem.isSelect ? 'select_color' : '', funcItem.enabled ? '': 'unable_color']">
                                        {{funcItem.title}}</p>
                                </div>
                            </van-grid-item>
                        </van-grid>
                    </template>
                </title-content>
            </div>

            <div class="step_three" v-else>

                <selectBox class="filter_type" title="滤芯" :columnNum="3" :gutter="18" :resourceData="filterData"
                           @onSelectItem="filterClick"></selectBox>
                <selectBox class="pakage_type" title="包装" :columnNum="2" :gutter="18" :resourceData="pakageData"
                           @onSelectItem="pakageClick"></selectBox>

                <title-content style="padding: 0;" title="预定数量" titleFont="14">
                    <template slot="content">
                        <div style="margin-left: 0.16rem;width: calc(100vw - 0.32rem);" class="input"
                             @click="changeBuyNumber(true)">
                            <span class="placeholder" v-if="purchaseNum === ''">请选择预定的口罩数量</span>
                            <span class="showText" v-else>{{purchaseNum}}</span>
                            <img :src="arrowIcon">
                        </div>
                    </template>
                </title-content>

                <title-content style="padding: 0.12rem 0;" title="预期交付时间" titleFont="14">
                    <template slot="content">
                        <div style="margin-left: 0.16rem;width: calc(100vw - 0.32rem);" class="input"
                             @click="changeDeliverTime">
                            <span class="placeholder" v-if="deliverTime === ''">请选择预期交付的时间</span>
                            <span class="showText" v-else>{{deliverTime}}</span>
                            <img :src="arrowIcon">
                        </div>
                    </template>
                </title-content>

                <div class="choose_photo">
                    <p>设计图上传<span>(选填)</span></p>

                    <van-grid class="pictures" :border="false" :column-num="3" :gutter="8" style="padding-left: 0;">
                        <van-grid-item v-for="(img,index) in designPictures" :key="index"
                                       v-show="designPictures.length != 0" style="padding-bottom: 8px;">
                            <img class="photo_item" :src="img" alt="">
                            <img class="photo_delete" :src="deletePic" alt="" @click="deletePhoto(img)">
                        </van-grid-item>
                        <van-grid-item style="padding-bottom: 8px;">
                            <div class="choose_content">
                                <div class="photo-choose">
                                    <img :src="choose_picture" alt="">
                                </div>
                                <input ref="inputer" type="file" @change="choosePhoto"
                                       accept="image/jpg,image/png,image/jpeg" name="imgUrls" multiple>
                            </div>
                        </van-grid-item>
                    </van-grid>

                </div>
            </div>

        </div>
        <selectBuyNumber v-show="showNumDialog" :showDialog="showNumDialog" @onClose="changeBuyNumber(false)"
                         @onSelectedCount="selectedBuyNumber"></selectBuyNumber>
        <popup v-model="showTimeDialog" position="bottom">
            <datetime-picker
                class="date_dialog"
                v-model="currentDate"
                type="date"
                title="选择时间"
                :loading="isLoadingShow"
                :min-date="minDate"
                :max-date="maxDate"
                :item-height="140"
                :formatter="formatter"
                @cancel="showTimeDialog = false"
                @confirm="confirmTime"
            />
        </popup>

        <!-- <fixed-view class="footer-shadow" id="footview" :style="getBottomOffset(60)">
            <template slot="footerContain">
                <div class="footer-view">
                    <section :class='["section-common","button-select"]' @click="commitForm">确定</section>
                </div>
            </template>
        </fixed-view> -->

        <div class="footview" id="footview" :style="getBottomOffset(0)">
            <button @click="commitForm">{{stepNumber === 2 ? '提交定制需求':'下一步'}}</button>
        </div>

        <div class="animate_content" v-show="isAnimate">
            <div class="loadding_window">
                <div class="loadding_animate" ref="matching"></div>
                <p id="tips" :style="isAnimateEnd ? 'margin-bottom: 0.04rem' : 'margin-bottom: 0.38rem'">
                    {{animateTips}}</p>
                <div class="loadding_end" v-show="isAnimateEnd">
                    <p>可联系客服了解进度</p>
                    <section></section>
                    <button @click="dismiss">我知道了</button>
                </div>
            </div>
        </div>
    </layout-view>
</template>

<script>
import { Field, Grid, GridItem, DatetimePicker, Popup } from 'vant'
// import FixedView from '../common/bottomFixedView.vue'
import TitleContent from '../common/titleContent.vue'
import TabView from './maskInfoTab.vue'
import selectBox from './maskTextSelectBox.vue'
import selectBuyNumber from './dialogReserveCount.vue'
import utils from 'utils'
import lottie from 'lottie-web'
import matchingJson from '@/utils/matching.json'
import matchedJson from '@/utils/matched.json'

export default {
    components: {
        Field,
        TitleContent,
        TabView,
        selectBox,
        selectBuyNumber,
        // FixedView,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        DatetimePicker,
        Popup
    },
    data() {
        return {
            choose_picture: require('../../themes/images/groupGoods/icon_choose_camera@3x.png'),
            deletePic: require('../../themes/images/app/control_delete_blue@3x.png'),
            arrowIcon: require('@/themes/images/app/icon_next_gray@3x.png'),
            backImage: require('@/themes/images/app/icon_nav_back_white@3x.png'),
            userName: '',
            userPhone: '',
            postName: '',
            companyName: '',

            stereotypeName: '',
            colorName: '',
            flowerName: '',
            funcName: '',

            filterName: '',
            pakageName: '',
            purchaseNum: '',
            deliverTime: '',

            designPictures: [],
            pictureUrls: [],

            showNumDialog: false,
            showTimeDialog: false,
            isLoadingShow: true,

            minDate: new Date(),
            maxDate: new Date(2030, 12, 1),
            currentDate: new Date(),

            phoneFormartResult: false,
            userNameFormartResult: false,
            postFormartResult: false,
            companyFormartResult: false,

            showPhoneError: false,
            showUserNameError: false,
            showPostNameError: false,
            showCompanyNameError: false,

            isAnimate: false,
            isAnimateEnd: false,
            animateTips: '',
            sHeight: {
                minHeight: window.screen.height + 'px'
            }, // 设置当前最小高度为屏幕高度
            stepNumber: 0,
            stereotypeData: [
                {
                    icon: require('@/themes/images/mask/version_a@3x.png'),
                    title: '版型A',
                    subTitle: '单层3D明星款立体口罩',
                    subFunc: ['玻尿酸', '冰感'],
                    isSelect: false
                },
                {
                    icon: require('@/themes/images/mask/version_b@3x.png'),
                    title: '版型B',
                    subTitle: '双层两用3D口罩',
                    subFunc: [],
                    isSelect: false
                },
                {
                    icon: require('@/themes/images/mask/version_c@3x.png'),
                    title: '版型C',
                    subTitle: '杯型3D口罩',
                    subFunc: ['玻尿酸', '抗病毒', '香型', '冰感'],
                    isSelect: false
                }
                // {
                //     icon: require('@/themes/images/mask/version_d@3x.png'),
                //     title: '版型D',
                //     subTitle: '弧型3D口罩',
                //     subFunc: ['抗菌','玻尿酸','抗病毒','香型','冰感'],
                //     isSelect: false
                // }
            ],
            colorData: [
                {
                    title: '黑色',
                    isSelect: false
                },
                {
                    title: '白色',
                    isSelect: false
                },
                {
                    title: '灰色',
                    isSelect: false
                },
                {
                    title: '红色',
                    isSelect: false
                },
                {
                    title: '绿色',
                    isSelect: false
                },
                {
                    title: '黄色',
                    isSelect: false
                }
            ],
            flowerData: [
                {
                    title: '企业logo',
                    isSelect: false
                },
                {
                    title: '满底印花',
                    isSelect: false
                }
            ],
            filterData: [
                {
                    title: '不需要',
                    isSelect: false
                },
                {
                    title: '1片',
                    isSelect: false
                },
                {
                    title: '5片',
                    isSelect: false
                }
            ],
            pakageData: [
                {
                    title: '标准包装设计',
                    isSelect: false
                },
                {
                    title: '自定义设计',
                    isSelect: false
                }
            ],
            functionData: [
                {
                    icon: require('@/themes/images/mask/icon_antibacterial_def@3x.png'),
                    selectIcon: require('@/themes/images/mask/icon_antibacterial_sel@3x.png'),
                    unableIcon: require('@/themes/images/mask/icon_antibacterial_unuse@3x.png'),
                    title: '抗菌',
                    enabled: true,
                    isSelect: false
                },
                {
                    icon: require('@/themes/images/mask/icon_antiviral_def@3x.png'),
                    selectIcon: require('@/themes/images/mask/icon_antiviral_sel@3x.png'),
                    unableIcon: require('@/themes/images/mask/icon_antiviral_unuse@3x.png'),
                    title: '抗病毒',
                    enabled: true,
                    isSelect: false
                },
                {
                    icon: require('@/themes/images/mask/icon_hyaluronic_acid_def@3x.png'),
                    selectIcon: require('@/themes/images/mask/icon_hyaluronic_acid_sel@3x.png'),
                    unableIcon: require('@/themes/images/mask/icon_hyaluronic_acid_unuse@3x.png'),
                    title: '玻尿酸',
                    enabled: true,
                    isSelect: false
                },
                {
                    icon: require('@/themes/images/mask/icon_ice_def@3x.png'),
                    selectIcon: require('@/themes/images/mask/icon_ice_sel@3x.png'),
                    unableIcon: require('@/themes/images/mask/icon_ice_unuse@3x.png'),
                    title: '冰感',
                    enabled: true,
                    isSelect: false
                },
                {
                    icon: require('@/themes/images/mask/icon_aroma_def@3x.png'),
                    selectIcon: require('@/themes/images/mask/icon_aroma_sel@3x.png'),
                    unableIcon: require('@/themes/images/mask/icon_aroma_type_unuse@3x.png'),
                    title: '香型',
                    enabled: true,
                    isSelect: false
                }
            ]

        }
    },
    created() {
        this.resetData()
        // this.scrollTop()
    },
    activated() {
        utils.postMessage('changeStatus', 'light')
        // this.purchaseNum = utils.getStore('purchaseNumber')
        // this.purchaseUse = utils.getStore('purchaseUse')
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleAdjustHeaderBg() {
            let baseParams = utils.getStore('baseParams')
            if (baseParams.isIphoneX) {
                return 'background-size:100% 1.85rem'
            }
        },
        handlePosition() {
        },
        resetData() {
            utils.setStore('purchaseNumber', '')
            this.stepNumber = 0
            this.userName = ''
            this.userPhone = ''
            this.postName = ''
            this.companyName = ''

            this.stereotypeName = ''
            this.colorName = ''
            this.flowerName = ''
            this.funcName = ''

            this.filterName = ''
            this.pakageName = ''
            this.purchaseNum = ''
            this.deliverTime = ''
            this.stereotypeData.forEach(obj => {
                obj.isSelect = false
            })
            this.colorData.forEach(obj => {
                obj.isSelect = false
            })
            this.flowerData.forEach(obj => {
                obj.isSelect = false
            })
            this.functionData.forEach(obj => {
                obj.isSelect = false
            })
            this.filterData.forEach(obj => {
                obj.isSelect = false
            })
            this.pakageData.forEach(obj => {
                obj.isSelect = false
            })
            this.designPictures = []
            this.pictureUrls = []
            this.isAnimate = false
            this.isAnimateEnd = false
        },
        scrollTop() {
            let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi) || false
            if (!isIos) {
                window.onresize = () => {
                    window.setTimeout(function () {
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
        handleVerifyPhone() {
            // window.scroll(0, 0)
            // this.setposition = 'position: fixed'
            if (this.userPhone.length < 11) {
                this.$toast('手机格式有误')
                this.showPhoneError = true
            }
        },
        handleVerifyUserName() {
            // window.scroll(0, 0)
            // this.setposition = 'position: fixed'
        },
        /// 切换步骤
        tabChanged(index) {
            if (this.stepNumber === 0 & index < 2 & this.userPhone !== '' & this.userName !== '' & this.postName !== '' & this.companyName !== '') {
                this.stepNumber = index
            }
            if (this.stepNumber === 1) {
                if (index < this.stepNumber) {
                    this.stepNumber = index
                }
                if (this.stereotypeName !== '' & this.colorName !== '' & this.flowerName !== '' & (this.funcName !== '' || this.stereotypeName === '版型B')) {
                    this.stepNumber = index
                }
            }
            if (this.stepNumber === 2) {
                this.stepNumber = index
            }
        },
        changeBuyNumber(isShow) {
            this.showNumDialog = isShow
        },
        changeDeliverTime() {
            this.showTimeDialog = true
            this.isLoadingShow = true
            setTimeout(() => {
                this.isLoadingShow = false
            }, 500)
        },
        stereotypeClick(item) {
            this.stereotypeData.forEach(obj => {
                obj.isSelect = false
            })
            item.isSelect = true
            this.stereotypeName = item.title

            this.functionData.forEach(func => {
                let index = item.subFunc.indexOf(func.title)
                if (index < 0) {
                    func.enabled = false
                    func.isSelect = false
                    this.funcName = ''
                } else {
                    func.enabled = true
                }
            })
        },
        colorClick(item) {
            this.colorData.forEach(obj => {
                obj.isSelect = false
            })
            item.isSelect = true
            this.colorName = item.title
        },
        flowerClick(item) {
            this.flowerData.forEach(obj => {
                obj.isSelect = false
            })
            item.isSelect = true
            this.flowerName = item.title
        },
        functypeClick(item) {
            if (!item.enabled) {
                return
            }
            this.functionData.forEach(obj => {
                obj.isSelect = false
            })
            item.isSelect = true
            this.funcName = item.title
        },
        filterClick(item) {
            this.filterData.forEach(obj => {
                obj.isSelect = false
            })
            item.isSelect = true
            this.filterName = item.title
        },
        pakageClick(item) {
            this.pakageData.forEach(obj => {
                obj.isSelect = false
            })
            item.isSelect = true
            this.pakageName = item.title
        },
        selectedBuyNumber(item) {
            this.purchaseNum = item
        },
        confirmTime(val) {
            this.showTimeDialog = false
            let year = val.getFullYear()
            let month = val.getMonth() + 1
            let day = val.getDate()
            if (month >= 1 && month <= 9) {
                month = `0${month}`
            }
            if (day >= 1 && day <= 9) {
                day = `0${day}`
            }
            this.deliverTime = `${year}-${month}-${day}`
        },
        // 选项格式化函数
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`
            } else if (type === 'month') {
                return `${value}月`
            } else if (type === 'day') {
                return `${value}日`
            }
            return value
        },
        // changeBuyUse() {
        //     this.$router.push({
        //         path: '/mask/purchaseUse'
        //     })
        // },
        imgPreview(file) {
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
        dismiss() {
            this.resetData()
            this.$router.go(-1)
        },
        resetLott(isEnd) {
            if (isEnd) {
                this.animateTips = '已匹配设计师'
            } else {
                this.animateTips = '已收到定制需求，智能派单中...'
            }
            lottie.destroy()
            lottie.loadAnimation({
                container: this.$refs.matching, // 容器节点
                renderer: 'svg',
                loop: !isEnd,
                autoplay: true,
                animationData: isEnd ? matchedJson : matchingJson
            })
        },
        // 确定提交
        commitForm() {
            if (this.stepNumber === 0) {
                if (this.userPhone !== '' & this.userName !== '' & this.postName !== '' & this.companyName !== '') {
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
                    this.stepNumber = 1
                    return
                } else {
                    this.$toast('请填写完整信息！')
                }
            }

            if (this.stepNumber === 1) {
                if (this.stereotypeName !== '' & this.colorName !== '' & this.flowerName !== '' & (this.funcName !== '' || this.stereotypeName === '版型B')) {
                    this.stepNumber = 2
                    return
                } else {
                    this.$toast('请填写完整信息！')
                }
            }

            if (this.stepNumber === 2) {
                if (this.filterName !== '' & this.pakageName !== '' & this.purchaseNum !== '' & this.deliverTime !== '') {
                    const params = {
                        realName: this.userName,
                        mobile: this.userPhone,
                        count: this.purchaseNum,
                        jobName: this.postName,
                        companyName: this.companyName,
                        // used: this.funcName,
                        shapeName: this.stereotypeName,
                        colorName: this.colorName,
                        craftsName: this.flowerName,
                        functionName: this.stereotypeName === '版型B' ? ' ' : this.funcName,
                        filterName: this.filterName,
                        packName: this.pakageName,
                        deliverTime: this.deliverTime
                    }
                    if (this.pictureUrls.length > 0) {
                        params.imgUrl = this.pictureUrls.join(',')
                    }
                    this.$api.deposit.createMaskIntention(params).then(res => {
                        this.isAnimate = true
                        lottie.play()
                        this.resetLott(false)
                        setTimeout(() => {
                            this.isAnimateEnd = true
                            this.resetLott(true)
                        }, 3000)
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$toast('请填写完整信息后再提交！')
                }
            }
        }

    },
    watch: {
        userPhone(val) {
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
        userName(val) {
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
        postName(val) {
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
        companyName(val) {
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
    },
    deactivated() {
        window.onresize = null
    },
    mounted() {
        let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi) || false
        if (!isIos) {
            window.onresize = () => {
                if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                    window.setTimeout(function () {
                        if ('scrollIntoView' in document.activeElement) {
                            document.activeElement.scrollIntoView()
                        } else {
                            document.activeElement.scrollIntoViewIfNeeded()
                        }
                    }, 0)
                }
            }
        }
    }
}
</script>

<style lang="less">
    .content {
        position: relative;
        background-color: white;
        .van-field__control {
            &::-webkit-input-placeholder {
                font-size: 14px;
                font-weight: bold;
                color: @color-c4;
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
    .header-img {
        display: inline-block;
        vertical-align: middle;
        width: 26px;
        height: 26px;
    }

    .header-bg {
        background-image: url('../../themes/images/mask/bg_master_fill_information_top_fixed.png');
        background-repeat: no-repeat;
        background-size: 100% 88px;
    }

    .header {
        background: rgba(0, 0, 0, 0);
        // .title {
        //     height: 40px;
        // }
    }

    .content {
        overflow-y: scroll;
        // overflow-x:hidden;
        height: 89%;
        margin: 16px 0;

        .tab_content {
            /*margin-top: 16px;*/
            background-image: url('../../themes/images/mask/bg_master_fill_information_top_scroll.png');
            background-repeat: no-repeat;
            background-size: 100% 73px;
            background-attachment: scroll;

        }

        .step_one {
            background: white;
            padding-bottom: 80px;
            padding-top: 16px;

            .info-input {
                display: flex;
                justify-content: space-between;
                margin: 0 16px;

                > span {
                    height: 44px;
                    font-size: 14px;
                    font-weight: bold;
                    color: @color-c2;
                    line-height: 44px;
                    margin-top: 16px;
                    align-self: center;
                }
            }
        }

        .step_second {
            background: white;
            padding: 1px 0;
            // padding-top: 16px;
            .stereotype {
                padding: 12px 5px 0;

                .stereo_item_content {
                    width: calc(50vw - 16.5px);
                    padding-bottom: 12px;
                    margin-bottom: 12px;
                    border-radius: 8px;
                    border: 1px solid rgba(225, 226, 230, 1);
                    display: flex;
                    flex-direction: column;
                    text-align: center;

                    .photo_item {
                        width: 100%;
                        height: 103px;
                    }

                    .title_item {
                        margin-top: 12px;
                        font-size: 14px;
                        font-weight: 400;
                        color: @color-c1;
                        line-height: 20px;
                    }

                    .subtitle_item {
                        margin-top: 4px;
                        font-size: 12px;
                        font-weight: 400;
                        color: @color-c3;
                        line-height: 16px;
                    }

                    .select_color {
                        color: @color-ec;
                    }
                }

                .select_item {
                    border: 1px solid rgba(60, 92, 246, 1);

                    .title_item {
                        font-weight: bold;
                    }
                }
            }

            .color_type {
                margin-top: -12px;
            }

            .flow_type {
                margin-top: -12px;
            }

            .function_type {
                margin-top: 18px;
                margin-bottom: 40px;

                .function_item_content {
                    .icon_item {
                        width: 40px;
                        height: 40px;
                    }

                    .title_item {
                        text-align: center;
                        font-size: 12px;
                        font-weight: 400;
                        color: @color-c1;
                        line-height: 16px;
                        margin-top: 2px;
                    }

                    .select_color {
                        color: @color-ec;
                    }

                    .unable_color {
                        color: @color-c4;
                    }
                }
            }
        }

        .step_three {
            background: white;
            padding: 1px 0;
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
            font-weight: bold;
            color: @color-c1;

            .placeholder {
                font-size: 14px;
                font-weight: bold;
                color: @color-c4;
                line-height: 44px;
                margin-left: 20px;
            }

            .showText {
                font-size: 14px;
                font-weight: bold;
                color: @color-c1;
                line-height: 44px;
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

        .choose_photo {
            margin: 28px 16px 40px;

            > p {
                font-size: 14px;
                font-weight: bold;
                color: @color-c2;
                line-height: 20px;

                > span {
                    margin-left: 8px;
                    font-size: 12px;
                    font-weight: 400;
                    color: @color-c3;
                    line-height: 16px;
                }
            }

            .pictures {
                // background: lightgray;
                margin-top: 12px;
                position: relative;

                .photo_item {
                    width: calc(33.33vw - 16px);
                    height: calc(33.33vw - 16px);
                    border-radius: 8px;
                    object-fit: cover;
                }

                .photo_delete {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    top: 0;
                    right: 3px;
                }
            }

            .choose_content {
                position: relative;

                .photo-choose {
                    width: calc(33.33vw - 16px);
                    height: calc(33.33vw - 16px);
                    background: @color-c8;
                    border-radius: 8px;
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

    .footer-shadow {
        border-radius: 12px 12px 0px 0px;
    }

    .footer-view {
        margin: 5px 20px;
        width: calc(100vw - 32px);

        .section-common {
            font-size: 18px;
            font-weight: bold;
            line-height: 22px;
        }

        .button-select {
            .btn-select(calc(100vw - 32px), 50px, true);
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
            height: 50px;
            background: linear-gradient(135deg, rgba(85, 122, 244, 1) 0%, rgba(114, 79, 255, 1) 100%);
            border-radius: 25px;
            font-size: 18px;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
        }
    }

    .animate_content {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.3);
        text-align: center;

        .loadding_window {
            display: inline-block;
            margin-top: calc(50vh - 160px);
            width: 270px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 14px;

            .loadding_animate {
                // width: calc(100vw - 94px);
                height: 176px;
            }

            > p {
                margin-top: 2px;
                font-size: 16px;
                font-weight: bold;
                color: @color-c1;
                line-height: 22px;
            }

            .loadding_end {
                > p {
                    font-size: 16px;
                    font-weight: bold;
                    color: @color-c1;
                    line-height: 22px;
                    margin-bottom: 12px;
                }

                > section {
                    height: 0.5px;
                    background: linear-gradient(180deg, rgba(225, 226, 230, 0) 0%, rgba(227, 226, 230, 1) 0%, rgba(225, 226, 230, 1) 100%);
                }

                > button {
                    height: 50px;
                    border-radius: 0px 0px 14px 14px;
                    font-size: 17px;
                    font-weight: bold;
                    color: rgba(0, 122, 255, 1);
                    line-height: 24px;
                    background: white;
                    background-color: transparent;
                }
            }
        }
    }
</style>
