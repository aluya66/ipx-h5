<template>
  <div class="app-container">
    <transition :name="pageDirection" @leave="setRouterMap">
      <keep-alive v-if="this.keepAlive === true && $route.meta.keepAlive !== false">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </transition>
  </div>
</template>
<script>
import utils from 'utils'
console.log(utils)

let curRoutes = utils.getStore('ROUTERCHAIN', sessionStorage) || []

export default {
  name: 'app-container',
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    try {
      curRoutes = this.$route.path !== '/' ? JSON.parse(curRoutes) : []
    } catch (error) {
      curRoutes = []
    }
    return {
      addCount: curRoutes.length,
      routerMap: {},
      pageDirection: 'fade',
      routeChain: curRoutes
    }
  },
  methods: {
    addRouteChain (route) {
      if (this.addCount === 0 && curRoutes.length > 0) {
        // 排除刷新的时候
        this.addCount = 1
      } else {
        if ((this.addCount !== 0 && this.routeChain[this.routeChain.length - 1].path !== route.path) || this.addCount === 0) {
          this.routeChain.push({
            path: route.path
          })
          utils.setStore('ROUTERCHAIN', JSON.stringify(this.routeChain), sessionStorage)
          this.addCount++
        }
      }
    },
    popRouteChain () {
      this.routeChain.pop()
      utils.setStore('ROUTERCHAIN', JSON.stringify(this.routeChain), sessionStorage)
    },
    setPageDirection ({ dir, to, from }) {
      this.pageDirection = dir
      this.routerMap['to'] = to.path
      this.routerMap['from'] = from.path
    },
    setRouterMap () {
      let dir = this.pageDirection
      let to = this.routerMap.to.replace(/\//g, '_')
      let from = this.routerMap.from.replace(/\//g, '_')
      try {
        if (dir === 'slide-left') {
          // 进入
          this.routerMap[from] = document.getElementById(from).scrollTop
        } else if (dir === 'slide-right') {
          // 返回
          if (this.keepAlive === true && this.$route.meta.keepAlive !== false) {
            document.getElementById(to).scrollTop = this.routerMap[to]
          }
        } else {
        }
      } catch (error) {
      }
    }
  },
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      // 定义一个可以记录路由路径变化的数据，这里用sessionStorage,或者在window.routeChain等变量
      let routeLength = this.routeChain.length
      if (routeLength === 0 || this.addCount === 0) {
        this.setPageDirection({ dir: 'slide-left', to, from })
        this.addRouteChain(from)
        this.addRouteChain(to)
      } else if (routeLength === 1) {
        this.setPageDirection({ dir: 'slide-left', to, from })
        this.addRouteChain(to)
      } else {
        let lastBeforeRoute = this.routeChain[routeLength - 2]
        if (lastBeforeRoute.path === to.path && to.meta.slideLeft !== true) {
          this.popRouteChain()
          this.setPageDirection({ dir: 'slide-right', to, from })
        } else {
          this.addRouteChain(to)
          this.setPageDirection({ dir: 'slide-left', to, from })
        }
      }
      next()
    })
  }
}
</script>

<style lang="less">
.app-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backface-visibility: hidden;
  perspective: 1000;
}

</style>
