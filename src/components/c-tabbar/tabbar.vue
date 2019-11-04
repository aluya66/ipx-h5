<template>
  <div :class="bem()">
    <van-tabbar v-model="active" @change="changeTabbar(active)" :fixed="fixed">
      <van-tabbar-item :icon="routeLinks[0].icon">{{routeLinks[0].title}}</van-tabbar-item>
      <van-tabbar-item :icon="routeLinks[1].icon">{{routeLinks[1].title}}</van-tabbar-item>
      <van-tabbar-item info="3">
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? customIcon.active : customIcon.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item :icon="routeLinks[3].icon">{{routeLinks[0].title}}</van-tabbar-item>
      <van-tabbar-item :icon="routeLinks[4].icon">{{routeLinks[4].title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import create from 'utils/create'
import { Tabbar, TabbarItem } from 'vant'

export default create({
  name: 'tabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {
    routeLinks: {
      type: Array,
      default () {
        return [{
          title: '',
          link: '/',
          icon: ''
        }]
      }
    },
    fixed: {
      type: Boolean,
      default: false
    },
    customIcon: {
      type: Object,
      default () {
        return {
          normal: '',
          active: ''
        }
      }
    }
  },
  data () {
    return {
      active: 0
    }
  },
  created () {
    this.changeTabBarActive()
  },
  updated () {
    this.changeTabBarActive()
  },
  methods: {
    changeTabbar (active) {
      this.$store.commit('APP_DIRECTION', 'forward')
      this.$router.push(this.routeLinks[active].link)
    },
    // 判断路径
    changeTabBarActive () {
      this.active = this.routeLinks.findIndex(item => item.link === this.$route.path)
    }
  }
})
</script>
