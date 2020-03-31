export default {
    path: '/mask/purchaseNum',
    name: 'purchaseNum',
    meta: {
        title: '',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/views/mask/purchaseNum.vue')
}
