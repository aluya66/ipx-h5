export default {
    path: '/intention',
    name: 'intention',
    meta: {
        title: '',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/views/deposit/depositIntention.vue')
}
