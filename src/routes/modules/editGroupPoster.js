export default {
    path: '/poster/editGroupPoster',
    name: 'editGroupPoster',
    meta: {
        title: 'editGroupPoster',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/views/groupGoods/poster/createGroupPoster.vue')
}
