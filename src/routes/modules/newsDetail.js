export default {
  path: '/news/detail',
  name: 'newsDetail',
  meta: {
    keepAlive: true
  },
  component: () => import('@/views/news/detail/index')
}
