export default {
  path: '/personalAdd',
  name: 'personalAdd',
  meta: {
    title: '添加就诊人',
    keepAlive: true
  },
  component: () => import('@/demos/personal/add.vue')
}
