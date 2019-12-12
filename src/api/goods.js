import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 【 get 】 获取商品列表信息
 * @param {*} params params数据对象 {shop_id: 2}
 */
export const getList = params => Http.fetch(`${context}/goods/list`, params, {
  method: 'get'
})

/**
 * 【 get 】 获取出售中及仓库中的商品数量
 * @param {*} params params数据对象 {shop_id: 2}
 */
export const getCounts = params => Http.fetch(`${context}/goods/counts`, params, {
  method: 'get'
})

/**
 * 【 get 】获取商品详情
 * @param {*} params params数据对象 {shop_id: 2, goods_id: 1}
 */
export const getDetail = params => Http.fetch(`${context}/goods/detail`, params, {
  method: 'get'
})

/**
 * 【 get 】获取商品详情
 * @param {*} params params数据对象 {shop_id: 2, goods_id: 1}
 */
export const getStatistics = params => Http.fetch(`${context}/goods/statistics`, params, {
  method: 'get'
})

/**
 * 【 get 】获取商品详情
 * @param {*} params params数据对象 {shop_id: 2, goods_id: 1}
 */
export const getVisitors = params => Http.fetch(`${context}/goods/visitors`, params, {
  method: 'get'
})
