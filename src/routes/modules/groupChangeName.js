
export default {
    path: '/group/changeGroupName',
    name: 'changeGroupName',
    meta: {
        title: '编辑组货名称',
        keepAlive: true
    },
    component: () => import('@/views/user/hall/changeGroupName.vue')
}
