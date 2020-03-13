
export default {
    path: '/customSamples',
    name: 'customSamples',
    meta: {
        title: '',
        keepAlive: true,
        isUserCache: false
    },
    component: () => import('@/views/designer/customMadeSamples.vue')
}
