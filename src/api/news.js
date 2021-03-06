import Http from '../utils/request'

const context = process.env.VUE_APP_CMS_serverPath
// const context = 'https://portal.meirishanglai.com'
/**
 * 订购会主页接口
 * @param {*} params params数据对象
 * @param {Object} mockFile 接口名称对应的mock数据文件
 */
export const getNewsDetail = params => Http.fetch(`${context}/v1/cms/news/${params.id}`, '', {
    method: 'get',
    hasToken: true, // 不要token
    hasErrMsg: true
})
