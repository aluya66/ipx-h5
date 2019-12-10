export default {
    path: '/user/hall',
    name: 'userHall',
    meta: {
        title: 'userHall',
        keepAlive: true
    },
    component: () => import('@/views/user/hall/index.vue')
}
