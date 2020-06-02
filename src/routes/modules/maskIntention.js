export default {
    path: '/mask/intention',
    name: 'maskIntention',
    meta: {
        title: '',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/views/mask/maskIntention.vue')
}
