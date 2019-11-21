export default {
  path: '/oauth',
  name: 'oauth',
  meta: {
    keepAlive: true
  },
  component: () => import('@/views/share/oauth')
}
