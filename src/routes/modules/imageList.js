export default {
    path: '/picture/imageList',
    name: 'imageList',
    meta: {
        title: 'imageList',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/views/picture/imageList.vue')
}
