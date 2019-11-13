import Http from '../utils/request'

const context = 'https://openapi.yosar.com'
// const context = 'https://portal.meirishanglai.com'
/**
 * 获取openID
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getOauth = params => Http.fetch(`${context}/oauth`, params, {
  method: 'get',
  hasErrMsg: true
})
