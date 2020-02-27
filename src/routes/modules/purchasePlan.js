export default {
    path: '/deposit/purchasePlan',
    name: 'purchasePlan',
    meta: {
        title: 'purchasePlan',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/views/deposit/purchasePlanView.vue')
}
