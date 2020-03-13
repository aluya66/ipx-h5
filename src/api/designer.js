// /v1/exhibithall
import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath
/**
 * 设计师展厅
 * @param params
 * @returns {prmoise对象}
 */
export const getDesignerHall = params => Http.fetch(`${context}/v1/exhibithall`, params, {
    method: 'get'
})

/**
 * 设计师样衣列表
 * @param params
 * @returns {prmoise对象}
 */
export const getDesignerSamples = params => Http.fetch(`${context}/v1/product/list`, params, {
    method: 'get'
})

/**
 * 设计师样衣添加收藏
 * @param params
 * @returns {prmoise对象}
 */
export const postCollectSample = params => Http.fetch(`${context}/v1/collect/add`, params, {
    method: 'post'
})

/**
 * 设计师样衣取消收藏
 * @param params
 * @returns {prmoise对象}
 */
export const postUnCollectSample = params => Http.fetch(`${context}/v1/collect/cancle`, params, {
    method: 'put'
})

/**
 * 设计师定制开款
 * @param params
 * @returns {prmoise对象}
 */
export const getCustomPay = params => Http.fetch(`${context}/v1/exhibithall/custom`, params, {
    method: 'get'
})
