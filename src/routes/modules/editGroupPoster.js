export default {
    path: '/poster/editGroupPoster',
    name: 'editGroupPoster',
    meta: {
        title: 'editGroupPoster',
        keepAlive: true
    },
    component: () => import('@/views/groupGoods/poster/createGroupPoster.vue')
}
