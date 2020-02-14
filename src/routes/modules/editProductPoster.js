export default {
    path: '/poster/editProductPoster',
    name: 'editProductPoster',
    meta: {
        title: 'editProductPoster',
        keepAlive: true
    },
    component: () => import('@/views/groupGoods/poster/createProductPoster.vue')
}
