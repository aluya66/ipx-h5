export default {
    path: '/user/aiGroup/matchRank',
    name: 'matchRank',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/user/aiGroup/matchRank.vue')
}
