import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 【 get 】 获取全部客户列表
 * @param {*} params params数据对象
 */
export const getCustom = params => Http.fetch(`${context}/custom`, params, {
  method: 'get'
})
