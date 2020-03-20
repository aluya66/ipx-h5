export default {
    path: '/searchResult',
    name: 'searchResult',
    meta: {
        title: '搜索结果',
        keepAlive: true
    },
    component: () => import('@/views/home/search/searchResult.vue')
}
