import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 【 get 】 获取tabbar订单角标值
 * @param {*} params params数据对象 {shop_id: 2}
 */
export const deliverCount = params => Http.fetch(`${context}/orders/deliver-count`, params, {
  method: 'get'
})

/**
 * 【 get 】 获取订单列表
 * @param {*} params params数据对象
 */
export const getList = params => Http.fetch(`${context}/orders/list`, params, {
  method: 'get'
})
