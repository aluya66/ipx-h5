import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 组货筛选条件过滤页面
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getSearchListsAjax = params => Http.fetch(`${context}/v1/group/goods/search`, params, {
    method: 'get',
    hasErrMsg: false
})

/**
 * 组货清单详情
 * @param {*} params params数据对象
 */
export const getGroupListDetail = params => Http.fetch(`${context}/v1/group/goods/detail`, params, {
    method: 'get',
    hasErrMsg: true
})

/**
 * 组货清单详情修改
 * @param {*} params params数据对象
 */
export const updateGroupListDetail = params => Http.fetch(`${context}/v1/group/goods`, params, {
    method: 'put',
    hasErrMsg: true
})

/**
 * 获取组货详情
 * @param {*} params params数据对象
 */
export const getGroupDetail = params => Http.fetch(`${context}/v1/group/goods/info/detail`, params, {
    method: 'get'
})

/**
 * 完成组货
 * @param {*} params params数据对象
 */
export const groupGoods = params => Http.fetch(`${context}/v1/group/goods`, params, {
    method: 'post',
    hasErrMsg: true
})
// 组货搜索
export const searchGroup = params => Http.fetch(`${context}/v1/group/goods/info`, params, {
    method: 'post',
    hasErrMsg: true
})
// 组货top10
export const groupRank = params => Http.fetch(`${context}/v1/group/goods/top`, params, {
    method: 'get',
    hasErrMsg: true
})

// 周累计人气
export const groupWeekPopular = params => Http.fetch(`${context}/v1/group/goods/popularity`, params, {
    method: 'get'
})

// 打call
export const postCall = params => Http.fetch(`${context}/v1/group/goods/popularity`, params, {
    method: 'post',
    hasErrMsg: true
})
