
export default {
    path: '/designerSamples',
    name: 'designerSamples',
    meta: {
        title: '',
        keepAlive: true,
        isUserCache: false
    },
    component: () => import('@/views/designer/designerAllSamples.vue')
}
