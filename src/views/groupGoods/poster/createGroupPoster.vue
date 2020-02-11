<template>
    <layout-view>
        <c-header slot="header" :left-arrow="true">
            <div slot="title">生成销售海报</div>
        </c-header>
        <div class="contain" :style="getBottomOffset(49)">
            <title-content title="组货名称及描述">
                <template slot="content">
                    <div class="group-descContain">
                        <field :class='["field-common","group-title"]' autosize placeholder="请输入组货名称" clearable v-model="groupTitle" />
                        <field :class='["field-common","group-desc"]'
                            autosize
                            type="textarea"
                            placeholder="请输入组货描述"
                            v-model="groupDesc"
                        />
                    </div>
                </template>
            </title-content>

            <title-content title="组货及商品图片">
                <template slot="content">
                    <div class="product-list"
                        v-for="imageUrl in groupImages" :key="imageUrl"
                    >
                        <img class="image-item" :src="imageUrl">
                    </div>
                </template>
            </title-content>

            <title-content title="价格显示" subTitle="顾客将在海报上看到你设置的价格">
                <template slot="content">
                    <div class="price-contain">
                        <div class="price-menu">
                            <section :class='[menuTitle === selectPriceTitle?"price-select":"price-unSelect"]'  v-for="menuTitle in priceMenu" :key="menuTitle" @click="handleChoosePriceTitle(menuTitle)">
                                {{menuTitle}}
                                <div class="price-line" v-show="menuTitle === selectPriceTitle"></div>
                            </section>
                        </div>
                        <p v-if="selectPriceTitle==='建议零售价'" class="price-suggest">各商品均按建议零售价显示(预览查看)</p>
                        <div v-else class="price-custom">
                            <p class="price-custom-title">各单品均加价(预览查看)</p>
                            <field class="price-input"/>
                            <p class="price-symbol">¥</p>
                        </div>
                    </div>
                </template>
            </title-content>

            <title-content title="联系手机(选填)">
                <template slot="content">
                    <div style="padding:0.12rem 0.16rem">
                        <field :class='["field-common","group-title"]' placeholder="请填写联系手机" clearable v-model="phone" />
                    </div>
                </template>
            </title-content>
            <p class="bottom-prompt">海报可以分享至微信好友、朋友圈</p>
        </div>
        <fixed-view>
            <template slot="footerContain">
                <div class="footer-view">
                    <section :class='["section-common","button-default"]' @click="handlePreviewPoster">预览海报</section>
                    <section :class='["section-common","button-select"]' @click="handleCreatePoster">生成海报</section>
                </div>
            </template>
        </fixed-view>
    </layout-view>
</template>

<script>
import TitleContent from '../../common/titleContent.vue'
import { Field } from 'vant'
import FixedView from '../../common/bottomFixedView.vue'
import utils from 'utils'

export default {
    components: {
        TitleContent,
        Field,
        FixedView
    },
    data() {
        return {
            groupTitle: '百变街头日常穿搭',
            groupDesc: '绿色卫衣简约休闲营造随意氛围\n镭射材质别具魅力隐约彰显出街头的个性\n即便只用简单的黑色也能搭配出别样的质感造型',
            groupImages: [],
            selectPriceTitle: '自主定价',
            priceMenu: ['自主定价', '建议零售价'],
            customPrice: '',
            phone: ''
        }
    },
    methods: {
        getBottomOffset(offset) {
            return utils.bottomOffset(offset)
        },
        handleChoosePriceTitle(title) {
            this.selectPriceTitle = title
        },
        handlePreviewPoster() {

        },
        handleCreatePoster() {

        }
    }
}
</script>

<style lang='less' scoped>
.contain {
    overflow: auto;
    height: 100%;
    .field-common {
        background:rgba(249,250,252,1);
        border-radius:4px;
        width: calc(100vw - 32px);
    }
    .group-descContain {
        .group-title {
            margin: 12px 16px 0;
            height: 40px;
            font-size:14px;
            font-weight:500;
            color:@color-c1;
        }
        .group-desc {
            font-size:14px;
            font-weight:500;
            color:@color-c1;
            margin: 10px 16px 16px;
        }
    }
    .product-list {
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        padding: 16px;
        margin-top: 12px;
        margin-bottom: 16px;
        background:@color-c8;
        overflow: scroll;
        .image-item {
            width: 74px;
            height: 74px;
            margin-left: 12px;
            object-fit: contain;
        }
    }
    .price-contain {
        .price-menu {
            margin: 11px 16px 0;
            height: 40px;
            line-height: 40px;
            text-align: center;
            display: flex;
            flex-direction: row;
            align-content: flex-start;
        }
        .price-select {
            flex: 1;
            position: relative;
            font-size:14px;
            font-weight:500;
            color:@color-ec;
        }
        .price-unSelect {
            flex: 1;
            position: relative;
            font-size:14px;
            font-weight:500;
            color:@color-c3;
        }
        .price-line {
            position:absolute;
            bottom: 0;
            width:24px;
            height:2px;
            background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
            border-radius:1px;
            left: 50%;
            transform: translateX(-50%)
        }
        .price-suggest {
            margin: 16px 16px;
            font-size:12px;
            font-weight:400;
            color:@color-c1;
            line-height:16px;
        }
        .price-custom {
            display: flex;
            flex-direction: row;
            align-content: flex-start;
            margin: 16px 16px 0;
            .price-custom-title {
                line-height: 16px;
                font-size:12px;
                font-weight:400;
                color:@color-c1;
                line-height: 40px;
            }
            .price-input {
                width: 68px;
                height: 40px;
                background:rgba(249,250,252,1);
                font-size:14px;
                font-weight:500;
                color:rgba(42,43,51,1);
                margin-left: 12px;
            }
            .price-symbol {
                font-size:12px;
                font-weight:400;
                color:@color-c1;
                line-height:40px;
                margin-left: 4px;
            }
        }
    }
    .bottom-prompt {
        height: 40px;
        font-size:10px;
        font-weight:400;
        color: @color-ec;
        line-height:40px;
        text-align: center;
    }
}
.footer-view {
        margin: 5px 24px 0;
        display: flex;
        width: calc(100vw - 48px);
        flex-direction: row;
        justify-content :space-between;
        .section-common {
            font-size:14px;
            font-weight:500;
            line-height:20px;
        }
        .button-default {
            .btn-select(calc(50vw - 31.5px),40px,false);
        }
        .button-select {
            .btn-select(calc(50vw - 31.5px),40px,true);
        }
    }
</style>
