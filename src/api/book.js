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

/**
 * 订购会报名接口
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const bookApply = params => Http.fetch(`${context}/v1/bookactivity/participate`, params, {
  method: 'post',
  hasErrMsg: true
})

/**
 * 订购会报名接口
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const bookApplyManagers = params => Http.fetch(`${context}/v1/bookactivity/tradeconfig`, params, {
  method: 'get'
})

/**
 * 我的测款分享，分享测款商品列表，查询
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getSharemeasuresList = params => Http.fetch(`${context}/v1/bookactivity/sharemeasures`, params, {
  method: 'get'
})

/**
 * 订货会，参会人，分享微信测款，分享状态修改
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const bookShared = params => Http.fetch(`${context}/v1/bookactivity/shared`, params, {
  method: 'get'
})
