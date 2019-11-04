/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import utils from 'utils'

import routes from './modules'
const demos = utils.isDebug ? require('./demos').modules : {}

const Route = (VueRouter) => {
  const router = new VueRouter({
    routes: [...Object.values(routes), ...Object.values(demos)],
    mode: !utils.isDebug ? process.utils.VUE_APP_ROUTEMODEL : 'hash',
    base: !utils.isDebug ? process.utils.VUE_APP_BASEURLPATH : '',
    strict: utils.isDebug,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.keepAlive) {
          from.meta.savedPosition = document.body.scrollTop
        }
        return {
          x: 0,
          y: to.meta.savedPosition || 0
        }
      }
    }
  })

  router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.requireAuth) { // 判断该路由是否需要登录权限
      if (utils.getStore('USERINFO')) { // 通过vuex state获取当前的token是否存在
        next()
      } else {
        utils.messageTip('MSGTIP.LOGIN')
        setTimeout(() => {
          next({
            path: '/',
            query: {
              redirect: from.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }, 1500)
      }
    } else {
      next()
    }
  })
  return router
}

export default Route
