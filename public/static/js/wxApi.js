import Http from '../utils/request'

const context = 'weixin'

/**
 * 获取微信code信息
 * @param {*} params params数据对象
 */
export const authCode = params => Http.fetch(`${context}/connect/oauth2/authorize`, params, {
  method: 'get'
})

/**
 * 获取微信token信息
 * @param {*} params params数据对象
 */
export const getWxToken = params => Http.fetch(`${context}/cgi-bin/token`, params, {
  method: 'get'
})
