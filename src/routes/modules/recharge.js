export default {
    path: '/recharge',
    name: 'recharge',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/recharge/index.vue')
}
