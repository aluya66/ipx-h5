export default {
    path: '/activity/retail',
    name: 'retail',
    meta: {
        title: '分销数据',
        keepAlive: true
    },
    component: () => import('@/views/activity/retail.vue')
}
