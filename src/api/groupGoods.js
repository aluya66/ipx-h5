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
    hasErrMsg: false
})
// 组货top10
export const groupRank = params => Http.fetch(`${context}/v1/group/goods/top`, params, {
    method: 'get',
    hasErrMsg: false
})

// 周累计人气
export const groupWeekPopular = params => Http.fetch(`${context}/v1/group/goods/popularity`, params, {
    method: 'get'
})

// 打call
export const postCall = params => Http.fetch(`${context}/v1/group/goods/popularity`, params, {
    method: 'post',
    hasErrMsg: false
})

// 一键补货
export const suplyGoods = params => Http.fetch(`${context}/v1/group/goods/replent`, params, {
    method: 'get'
})

/**
 * 门店热门组货
 * @param params
 * @returns {prmoise对象}
 */
export const getHotGroup = params => Http.fetch(`${context}/v1/home/examplelist`, params, {
    method: 'get'
})

/**
 * 本季上新
 * @param params
 * @returns {prmoise对象}
 */
export const getQuarterLatest = params => Http.fetch(`${context}/v1/home/latestlist`, params, {
    method: 'get'
})

/**
 * 精选热门组货
 * @param params
 * @returns {prmoise对象}
 */
export const getSelectedGroup = params => Http.fetch(`${context}/v1/home/featuredgrouplist`, params, {
    method: 'get'
})

/**
 * 【 get 】样衣搜索
 * @param {*} params
 */
export const searchProductList = params => Http.fetch(`${context}/v1/product/search`, params, {
    method: 'get'
})

/**
 * 【 get 】组货搜索
 * @param {*} params
 */
export const searchGroupList = params => Http.fetch(`${context}/v1/group/search`, params, {
    method: 'get'
})

/**
 * 【 get 是否能够购买
 * @param {*} params
 */
export const oauthPurchase = params => Http.fetch(`${context}/v1/member/oauth`, params, {
    method: 'get'
})
