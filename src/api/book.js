import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 订购会主页接口
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const bookMainInfo = params => Http.fetch(`${context}/v1/bookactivity/list`, params, {
  method: 'get'
})

/**
 * 订购会报名接口
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const bookApply = params => Http.fetch(`${context}/v1/bookactivity/participate`, params, {
  method: 'post'
})

/**
 * 订购会报名接口
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const bookApplyManagers = params => Http.fetch(`${context}/v1/bookactivity/tradeconfig`, params, {
  method: 'get'
})
