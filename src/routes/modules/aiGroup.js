export default {
    path: '/groupGoods/aiGroup',
    name: 'aiGroup',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/groupGoods/aiGroup/index.vue')
}
