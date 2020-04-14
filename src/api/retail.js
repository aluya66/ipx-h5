
/*
**  分销数据（api服务在中台）
*/

import Http from '../utils/request'

const context = process.env.VUE_APP_PILLAR_serverPath

/**
 * 分销统计
 */
export const getRetailTopList = params => Http.fetch(`${context}/v1/statistics/toplist`, params, {
    'method': 'get'
})
