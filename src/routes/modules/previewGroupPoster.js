export default {
    path: '/poster/previewGroupPoster',
    name: 'previewGroupPoster',
    meta: {
        title: '预览海报',
        keepAlive: true
    },
    component: () => import('@/views/groupGoods/poster/groupPosterPreview.vue')
}
