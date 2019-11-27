export default {
    path: '/error/bannerError',
    name: 'bannerError',
    meta: {
        title: '',
        keepAlive: true
    },
    component: () => import('@/views/error/bannerError')
}
