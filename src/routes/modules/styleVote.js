export default {
    path: '/testStyle/vote',
    name: 'styleVote',
    meta: {
      title: '选择偏爱款式',
      keepAlive: true
    },
    component: () => import('@/views/testStyle/styleVote.vue')
  }
  