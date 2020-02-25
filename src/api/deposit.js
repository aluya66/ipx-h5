import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 获取押金方案
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getDepositConfig = params => Http.fetch(`${context}/v1/deposit/config`, params, {
    method: 'get'
})
