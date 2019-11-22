
export default {
    path: '/hall/groupListDetail',
    name: 'groupListDetail',
    meta: {
        title: '组货清单详情',
        keepAlive: true
    },
    component: () => import('@/views/user/hall/groupListDetail.vue')
}
