import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 展厅 样衣列表
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getHallCollectList = params => Http.fetch(`${context}/v1/collect/list`, params, {
    method: 'get'
})

/**
 * 展厅 样衣列表批量删除
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const deleteCollects = params => Http.fetch(`${context}/v1/collect/delete`, params, {
    method: 'put'
})
