export default {
    path: '/user/aiGroup/matchRank',
    name: 'aiGroup',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/user/aiGroup/matchRank.vue')
}
