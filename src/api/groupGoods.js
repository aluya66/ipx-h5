import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 组货筛选条件过滤页面
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getSearchListsAjax = params => Http.fetch(`${context}/v1/group/goods/search`, params, {
    method: 'get',
    mockFile: 'groupGoods'
})
