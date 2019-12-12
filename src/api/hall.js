import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 展厅 样衣列表
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getHallCollectList = params => Http.fetch(`${context}/v1/collect/list`, params, {
  method: 'get',
  hasErrMsg: true
})

/**
 * 展厅 样衣列表批量删除
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const deleteCollects = params => Http.fetch(`${context}/v1/collect/delete`, params, {
  method: 'put'
})

/**
 * 组货清单
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getGroupGoods = params => Http.fetch(`${context}/v1/group/goods`, params, {
  method: 'get',
  hasErrMsg: true
  // mockFile: 'groupGoods'
})

/**
 * 组货清单
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const deleteGroupGoods = params => Http.fetch(`${context}/v1/group/goods/del`, params, {
  method: 'put'
  // mockFile: 'groupGoods'
})
