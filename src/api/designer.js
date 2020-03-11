// /v1/exhibithall
import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath
export const getDesignerHall = params => Http.fetch(`${context}/v1/exhibithall`, params, {
    method: 'get'
})
export const getDesignerSamples = params => Http.fetch(`${context}/v1/product/list`, params, {
    method: 'get'
})
export const postCollectSample = params => Http.fetch(`${context}/v1/collect/add`, params, {
    method: 'post'
})
export const postUnCollectSample = params => Http.fetch(`${context}/v1/collect/cancle`, params, {
    method: 'put'
})
