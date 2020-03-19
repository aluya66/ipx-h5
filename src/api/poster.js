import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 好赚 组货海报
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getGroupPosterInfo = params => Http.fetch(`${context}/v1/interest/groupposter`, params, {
    method: 'post'
})

/**
 * 【 get 】 好赚 商品海报
 * @param {*} params params数据对象
 */
export const getProductPosterInfo = params => Http.fetch(`${context}/v1/interest/productposter`, params, {
    method: 'post'
})

/**
 * 图片列表
 * @param params
 * @returns {prmoise对象}
 */
export const getSkuList = params => Http.fetch(`${context}/v1/interest/skulist`, params, {
    method: 'get'
})
