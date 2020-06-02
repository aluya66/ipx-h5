export default {
    path: '/recharge/history',
    name: 'rechargeHistory',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/recharge/rechargeHistory.vue')
}
