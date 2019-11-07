<template>
  <layout-view>
    <c-header
      slot="header"
      :left-arrow="true"
    ></c-header>
    <c-list class="list-scroll">
      <share-list
        :productList="list"
        @selectClick="selected"
      ></share-list>
    </c-list>
    <button
      class="submit"
      @click="commit"
    >提交投票</button>
  </layout-view>
</template>

<script>
import shareList from '@/views/common/shareList'
import components from 'components'
import { Dialog } from 'vant'
const { CHeader } = components
export default {
  components: {
    CHeader,
    shareList
  },
  data () {
    return {
      list: [
        {
          mainPic: '',
          title: '针织拼接外套',
          isSelect: false
        },
        {
          mainPic: '',
          title: '针织拼接外套',
          isSelect: false
        },
        {
          mainPic: '',
          title: '针织拼接外套',
          isSelect: false
        },
        {
          mainPic: '',
          title: '发发发斤斤计较京津冀',
          isSelect: false
        },
        {
          mainPic: '',
          title: '韩版毛领连帽大衣冒烟哈哈哈',
          isSelect: false
        },
        {
          mainPic: '',
          title: '针织拼接外套',
          isSelect: false
        },
        {
          mainPic: '',
          title: '发发发斤斤计较京津冀',
          isSelect: false
        },
        {
          mainPic: '',
          title: '韩版毛领连帽大衣冒烟哈哈哈',
          isSelect: false
        },
        {
          mainPic: '',
          title: '针织拼接外套',
          isSelect: false
        },
        {
          mainPic: '',
          title: '发发发斤斤计较京津冀',
          isSelect: false
        },
        {
          mainPic: '',
          title: '韩版毛领连帽大衣冒烟哈哈哈',
          isSelect: false
        }
      ],
      selectedNum: 0
    }
  },
  methods: {
    selected (product) {
      if (!product.isSelect && this.selectedNum > 2) {
        Dialog.alert({
          title: '提示',
          message: '每人限投3票'
        })
        return
      }
      product.isSelect = !product.isSelect
      if (product.isSelect) {
        this.selectedNum += 1
      } else {
        this.selectedNum -= 1
      }
    },
    commit () {
      if (this.selectedNum > 3) {
        Dialog.alert({
          title: '提示',
          message: '每人限投3票'
        })
      } else {
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list-scroll {
  height: calc(100vh - 55px);
}
.submit {
  width: 160px;
  height: 50px;
  border-radius: 36px;
  box-shadow: 0 2px 10px 0 rgba(33, 44, 98, 0.06);
  background-image: linear-gradient(to bottom, #557af4, #724fff);
  font-family: PingFangSC;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
