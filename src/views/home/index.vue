<template>
  <layout-view id="__home">
    <router-view></router-view>
    <c-tabbar slot="footer" :route-links="routeLinks" :custom-icon="customIcons"></c-tabbar>
  </layout-view>
</template>

<script>
import CTabbar from 'components/c-tabbar'

export default {
  data () {
    return {
      routeLinks: [{
        title: '商品',
        link: '/',
        icon: 'goods'
      },
      {
        title: '订单',
        link: '/order',
        icon: 'order'
      },
      {
        title: '+',
        link: '/orderAdd'
      },
      {
        title: '客户',
        link: '/customer',
        icon: 'customer'
      }, {
        title: '店铺',
        link: '/shop',
        icon: 'shop'
      }],
      customIcons: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
      }
    }
  },
  components: {
    CTabbar
  }
}
</script>
