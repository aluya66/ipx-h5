export default {
  path: '/orderProduct',
  name: 'orderProduct',
  meta: {
    keepAlive: true
  },
  component: () => import('@/views/orderProduct/index.vue')
}
