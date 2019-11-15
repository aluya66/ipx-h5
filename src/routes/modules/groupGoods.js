export default {
    path: '/groupGoods',
    name: 'groupGoods',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/groupGoods/index.vue')
}
