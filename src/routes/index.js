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
        // mode: !utils.isDebug ? process.env.VUE_APP_ROUTEMODEL : 'hash',
        mode: !utils.isDebug ? process.env.VUE_APP_ROUTEMODEL : 'history',
        base: !utils.isDebug ? process.env.VUE_APP_BASEURLPATH : '',
        strict: utils.isDebug,
        scrollBehavior (to, from, savedPosition) {
            if (savedPosition) {
                console.log(savedPosition)
                return savedPosition
            } else {
                console.log(document.body.scrollTop)
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
            let token = utils.getStore('token')
            if (token !== 'undefined' && token.length > 0) { // 通过vuex state获取当前的token是否存在
                next()
            } else {
                window.globalVue.$utils.postMessage('user_authentication', '')

                // setTimeout(() => {
                // next({
                //     path: '/',
                //     query: {
                //         redirect: to.fullPath
                //     } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                // })
                // }, 1500)
            }
        } else {
            next()
        }
    })
    return router
}

export default Route
