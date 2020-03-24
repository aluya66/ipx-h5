import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 添加收藏商品
 */
export const addCollectionProduct = params => Http.fetch(`${context}/v1/collect/add`, params, {
    method: 'post'
})

/**
 * 取消收藏商品
 */
export const deleteCollectionProduct = params => Http.fetch(`${context}/v1/collect/cancle`, params, {
    method: 'put'
})
