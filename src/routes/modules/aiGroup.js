export default {
    path: '/user/aiGroup',
    name: 'aiGroup',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/user/aiGroup/index.vue')
}
