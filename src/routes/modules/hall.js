export default {
    path: '/user/hall',
    name: 'userHall',
    meta: {
        title: 'userHall',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/views/user/hall/index.vue')
}
