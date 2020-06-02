export default {
    path: '/groupMain',
    name: 'groupMain',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/groupGoods/groupMainPage.vue')
}
