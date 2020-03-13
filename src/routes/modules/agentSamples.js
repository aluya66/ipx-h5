
export default {
    path: '/agentSamples',
    name: 'agentSamples',
    meta: {
        title: '',
        keepAlive: true,
        isUserCache: false
    },
    component: () => import('@/views/designer/joinAgentSamples.vue')
}
