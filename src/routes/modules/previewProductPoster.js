export default {
    path: '/poster/previewProductPoster',
    name: 'previewProductPoster',
    meta: {
        title: '预览海报',
        keepAlive: true
    },
    component: () => import('@/views/groupGoods/poster/productPosterPreview.vue')
}
