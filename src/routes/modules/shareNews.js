export default {
  path: '/share/news',
  name: 'shareNews',
  meta: {
    keepAlive: true
  },
  component: () => import('@/views/share/news/index')
}
