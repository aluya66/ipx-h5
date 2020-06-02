export default {
    path: '/news/detail',
    name: 'newsDetail',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/share/news/index.vue')
}
