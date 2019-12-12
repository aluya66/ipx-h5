import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 【 get 】 获取店铺列表
 * @param {*} params params数据对象
 */
export const getUserShop = params => Http.fetch(`${context}/shop/getUserShop`, params, {
  method: 'get'
})

/**
 * 【 get 】 获取指定店铺信息
 * @param {*} params params数据对象 {shop_id: 2}
 */
export const showById = params => Http.fetch(`${context}/shop/shop`, params, {
  method: 'get'
})

/**
 * 【 get 】 根据指定店铺获取全部店铺成员
 * @param {*} params params数据对象 {shop_id: 2}
 */
export const getStaffById = params => Http.fetch(`${context}/shop/staff`, params, {
  method: 'get'
})
