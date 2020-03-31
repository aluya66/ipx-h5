export default {
    path: '/mask/purchaseUse',
    name: 'purchaseUse',
    meta: {
        title: '',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/views/mask/purchaseUse.vue')
}
