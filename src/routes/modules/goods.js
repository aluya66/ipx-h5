export default {
  path: '/goods/detail/:id',
  name: 'goodDetail',
  meta: {
    title: 'goodsDetail',
    keepAlive: true
  },
  component: () => import('@/views/goods/detail/index.vue')
}
