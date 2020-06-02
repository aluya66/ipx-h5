export default {
    path: '/deposit/account',
    name: 'depositAccount',
    meta: {
        title: '',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/views/deposit/depositAccount.vue')
}
