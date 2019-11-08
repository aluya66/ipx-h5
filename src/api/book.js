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

/**
 * 订货会测款商品投票
 * @param {*} params params数据对象
*/
export const bookGoodsVote = params => Http.fetch(`${context}/v1/bookactivity/measurevote`, params, {
  method: 'post',
  hasErrMsg: true
})
/**
 * 订货会，测款数据报告页面，投票列表查询
 * @param {*} params params数据对象
*/
export const bookRankList = params => Http.fetch(`${context}/v1/bookactivity/votequery`, params, {
  method: 'get'
})

