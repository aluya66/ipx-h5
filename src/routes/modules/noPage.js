export default {
  path: '*',
  name: 'noPage',
  component: () => import('@/views/common/noPage.vue'),
  redirect: '/noPage',
  children: [{
    path: 'noPage'
  }]
}
