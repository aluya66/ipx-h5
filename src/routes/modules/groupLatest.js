export default {
    path: '/group/quarterLatest',
    name: 'quarterLatest',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/groupGoods/quarterLatest.vue')
}
