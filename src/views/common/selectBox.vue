<template>
<div class="item-wrapper">
  <div class="title">{{sectionTitle}}<span>{{sectionSubTitle}}</span></div>
  <div :class="['item-box', itemBoxClass]">
    <div :class="[itemClass?itemClass:'item-common',isSlot?'': item.isSelected? 'item-selected' : 'item-default']" v-for="(item,index) in allItems" :key="index" @click="handleSelect(item)">
      <slot v-if="isSlot" name='selectItem' :item="item"></slot>
      <p>{{isSlot ?"":item.labelName}}</p>
    </div>
  </div>
  <div class="bottom-line" v-if="dataSource.hasExpand" @click="handleExpand">
    <section></section>
    <p>{{dataSource.isExpand?"收起":"展开"}}<img :src='dataSource.isExpand?upImg:downImg' alt=""></p>
  </div>
</div>
</template>

<script>
export default {
    components: {

    },
    props: {
        dataSource: {
            type: Object,
            default () {
                return {}
            }
        },
        sectionTitle: {
            type: String,
            default: ''
        },
        sectionSubTitle: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default () {
                return []
            }
        },
        itemBoxClass: {
            type: String,
            default: ''
        },
        itemClass: {
            type: String,
            default: null
        },
        isSlot: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            downImg: require('@/themes/images/app/control_drop_down.png'),
            upImg: require('@/themes/images/app/control_drop_up.png'),
            allItems: []
        }
    },
    watch: {
        items(val) {
            this.allItems = val
        }
    },
    methods: {
        handleSelect(item) {
            this.$set(item, 'isSelected', !item.isSelected)
            this.$emit('onSelect', item)
        },
        handleExpand() {
            this.dataSource.isExpand = !this.dataSource.isExpand
            this.allItems = this.dataSource.isExpand ? this.items : this.items.slice(0, 8)
        }
    },
    mounted() {
        this.allItems = this.dataSource.isExpand ? this.items : this.items.slice(0, 8)
    }
}
</script>

<style lang='less' scoped>
.bottom-line {
  padding-bottom: 16px;
  section {
    background: #E1E2E6;
    height: 0.5px;
  }
  p {
    font-size: 12px;
    font-weight: 400;
    color: #B2B5C1;
    line-height: 16px;
    height: 16px; // vertical-align: middle;
    text-align: center;
    margin-top: 8px;
    img {
      vertical-align: bottom;
      width: 16px;
      height: 16px; // display: block;
    }
  }
}

.item-wrapper {
  position: relative;
  margin-bottom: 32px;
  &:first-child {
    .title {
      padding-top: 20px;
    }
  }
  .title {
    padding-bottom: 13px;
    color: #585b66;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(88, 91, 102, 1);
    line-height: 20px;
    >span {
      margin-left: 4px;
      color: #b2b5c1;
      font-size: 12px;
    }
  }
  .item-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .item-auto {
      margin-bottom: 12px;
      font-size: 12px;
      font-weight: 700;
      text-align: center;
      border-radius: 14px;
      height: 28px;
      margin-right: 11px;
      p {
        padding: 0 16px;
      }
    }
    .item-common {
      margin-bottom: 12px;
      margin-right: 11px;
      width: calc(25vw - 17px);
      height: 28px;
      font-size: 12px;
      font-weight: 700;
      text-align: center;
      border-radius: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
    .item-default {
      color: @color-c1;
      background: @color-c8;
      border: 0;
      line-height: 28px;
      padding: 0 8px;
    }
    .item-selected {
      color: @color-ec;
      line-height: 26px;
      padding: 0 7px;
      background: @color-ec-gray;
      border: 1px solid @color-ec3;
    }
  }
  .price-box {
    align-items: center;
    >input {
      width: 154px;
      height: 36px;
      text-align: center;
      background: rgba(244, 245, 247, 1);
      border-radius: 18px;
    }
    >span {
      padding: 0 12px;
    }
  }
  .image-box {
    display: flex; // justify-content: space-between;
    .image-item {
      position: relative;
      .image-img {
        margin-bottom: 8px;
        background: rgba(231, 235, 255, 1);
      }
      .image-name {
        margin: 0; // font-family: PingFangSC-Regular, PingFang SC;
        text-align: center;
        color: @color-c1;
        line-height: 22px;
        font-weight: 0
      }
      .image-info {
        margin: 0;
        font-size: 14px;
        font-family: P ingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: @color-c1;
        line-height: 16px;
      }
      .check-box {
        position: absolute;
        right: 20px;
        top: 1px;
        width: 20px;
        height: 20px;
      }
      .check-box-img {
        position: absolute;
        right: 20px;
        top: 12px;
        width: 20px;
        height: 20px;
      }
    }
  }
  .customer-box {
    padding: 16px 0; // width: 343px;
    height: 236px; // text-align: center;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.08);
    border-radius: 8px;
    .image-item {
      width: calc(33vw - 10px);
      text-align: center;
      .image-img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
      .image-name {
        font-size: 12px;
      }
    }
  }
  .category-box {
    justify-content: flex-start;
    box-shadow: 0px 2px 10px 0px rgba(33, 44, 98, 0.08);
    border-radius: 8px;
    height: 114px;
    .image-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 12px;
      width: calc((100vw - 32px) / 4);
      .image-img {
        display: block;
        margin-bottom: 11px;
        width: 44px;
        height: 44px; // background-color: red;
        border-radius: 22px;
        object-fit: cover;
      }
    }
  }
  .format-box {
    .image-img {
      width: 107px;
      height: 66px;
    }
  }
}
</style>
