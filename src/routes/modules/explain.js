
export default {
    path: '/recharge/explain',
    name: 'explain',
    meta: {
        title: '说明',
        keepAlive: true
    },
    component: () => import('@/views/recharge/explain.vue')
}