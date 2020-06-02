export default {
    path: '/group/skuPurchase',
    name: 'groupSkuPurchase',
    meta: {
        title: '',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/views/groupGoods/groupSkuPurchase.vue')
}
