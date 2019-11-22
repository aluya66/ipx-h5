import Http from '../utils/request'

const context = process.env.VUE_APP_serverPath

/**
 * 组货筛选条件过滤页面
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getSearchListsAjax = params => Http.fetch(`${context}/v1/group/goods/search`, params, {
    method: 'get',
    mockFile: 'groupGoods'
})

/**
 * 组货清单详情
 * @param {*} params params数据对象
 */
export const getGroupListDetail = params => Http.fetch(`${context}/v1/group/goods/detail`, params, {
    method: 'get',
    hasErrMsg: true
})

// 临时接口
export const getSeletedProductList = params => Http.fetch(`${context}/v1/group/seletedproduct`, params, {
    method: 'post',
    hasErrMsg: true
})
