import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 充值额度、赠送额度配置
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getRechargeInfo = params => Http.fetch(`${context}/v1/account/rechargeconfigsearch`, params, {
    method: 'get'
})

/**
 * 账户记录查询
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getAccontHistory = params => Http.fetch(`${context}/v1/account/historysearch`, params, {
    method: 'get'
})

/**
 * 用户余额信息查询
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getBalance = params => Http.fetch(`${context}/v1/account/detailsearch`, params, {
    method: 'get'
})

/**
 * 充值
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const recharge = params => Http.fetch(`${context}/v1/account/recharge`, params, {
    method: 'post'
})
