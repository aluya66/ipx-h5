export default {
  methods: {
    /**
     * 国际化翻译
     * @param {*} name 需要处理的i18n 的key值
     * @param {*} model key对应的对象
     */
    translate (name, model) {
      const hasKey = model ? this.$te(`${model}.${name}`) : this.$te(name)

      if (hasKey) {
        const curVal = model ? this.$t(`${model}.${name}`) : this.$t(name)

        return curVal
      }
      return name
    },
    /**
     * 路由跳转，支持push、replace，location
     * @param {*} to
     * @param {*} replace
     * @param {*} url
     */
    routerLink (to, replace, url) {
      const {
        $router
      } = this
      if (to && $router) {
        $router[replace ? 'replace' : 'push'](to)
      } else if (url) {
        replace ? location.replace(url) : (location.href = url)
      }
    },

    /**
     * 路由打开新窗口
     * 还可以通过<router-link target="_blank" 和 <a target="_blank"这两种方式开新窗口
     */
    openNewWin (routerOpts) {
      const {
        $router
      } = this
      let routePath = ''
      if (routerOpts.url) {
        routePath = routerOpts.url
      } else {
        routePath = $router.resolve({
          name: routerOpts.name,
          query: routerOpts.query,
          params: routerOpts.params
        })
      }
      window.open(routePath, '_blank')
    },
    /**
     *  统一跳转到登陆页面
     */
    goToLogin (time = 1.5, type = 'push') {
      setTimeout(() => {
        this.$router[type]({
          path: `/login?redirect=${this.$route.fullPath}`
        })
      }, time * 1000)
    }
  }
}
