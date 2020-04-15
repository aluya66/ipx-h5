export default {
    path: '/poster/savePoster',
    name: 'savePoster',
    meta: {
        title: '海报保存成功',
        keepAlive: true
    },
    component: () => import('@/views/groupGoods/poster/savePoster.vue')
}
