export default {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
    keepAlive: true
  },
  component: () => import('@/views/login.vue')
}
