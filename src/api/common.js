import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * mock模拟数据 示例
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const mockList = params => Http.fetch(`${context}/mockList`, params, {
  mockFile: `list${params.type}`
})

/**
 * 【 post 】 登录
 * @param {*} params params数据对象
 */
// export const login = params => Http.fetch(`${context}/user/login`, params)

/**
 * 【 post 】 退出
 * @param {*} params params数据对象
 */
// export const logout = params => Http.fetch(`${context}/user/logout`, params)

/**
 * 【 get 】 检查用户登录状态
 * @param {*} params params数据对象
 */
export const checkLogin = params => Http.fetch(`${context}/user/checkLogin`, params, {
  method: 'get'
})
