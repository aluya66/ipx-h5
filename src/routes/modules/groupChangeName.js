
export default {
    path: '/changeGroupName/:name',
    name: 'changeGroupName',
    meta: {
        title: '编辑组货名称',
        keepAlive: true
    },
    component: () => import('@/views/user/hall/changeGroupName.vue')
}
