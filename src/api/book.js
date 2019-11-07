import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * mock模拟数据 示例
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const bookMainInfo = params => Http.fetch(`${context}/v1/bookactivity/list`, params, {
  method: 'get'
})
