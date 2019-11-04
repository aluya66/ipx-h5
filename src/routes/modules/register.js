export default {
  path: '/register',
  name: 'register',
  meta: {
    title: '立即注册',
    keepAlive: true
  },
  component: () => import('@/views/register.vue')
}
