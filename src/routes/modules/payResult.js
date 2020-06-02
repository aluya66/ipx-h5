export default {
    path: '/recharge/payResult',
    name: 'payResult',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/recharge/payResult.vue')
}
