import axios from 'axios'
import utils from 'utils'

import errFun from './err'

let cancel = null
const promiseArr = {}
// const CancelToken = axios.CancelToken;
const instance = axios.create({
  baseURL: '', // !utils.isDebug ? process.env.VUE_APP_serverUrl : '',
  timeout: 10000
})

instance.interceptors.request.use((config) => {
  const arrFlag = `${config.url}?${JSON.stringify(config.data)}`
  // 重复请求取消操作
  if (promiseArr[arrFlag]) {
    promiseArr[arrFlag]('_CACHE_')
    promiseArr[arrFlag] = cancel
  } else {
    promiseArr[arrFlag] = cancel
  }
  // 当loading为false时，不需要全局loading效果
  if (config.customConfig.loading) {
    // loadingInstace = null;
    // window.globalVue.$toast({
    //   mask: true,
    //   message: '加载中...'
    // });
    // loadingInstace = window.globalVue.$loading({
    //   fullscreen: true
    // });
  }
  return config
}, err => Promise.reject(err))

// 拦截返回的信息，做统一异常处理
instance.interceptors.response.use((response) => {
  const {
    data
  } = response
  if (data.code === 200 || data.retcode === 0) {
    // 正常返回数据，指返回data;
    return response.data
  }
  // 异常返回数据，返回
  if (!promiseArr.isGlobalErr) {
    errFun && errFun(data)
  }
  return data
})

/**
 * 根据method设置header相关设置
 *
 * @param {*} mtd 当前传入的请求方式
 * @returns {Object} 返回请求方式和header的contentType设置
 */
const setHeaderMethod = mtd => {
  let method = 'get'
  let contentType = 'application/json'
  switch (method) {
    case 'post':
    case 'put':
      method = mtd
      contentType = 'application/x-www-form-urlencoded'
      break
    case 'postJson':
      method = 'post'
      break
  }
  return {
    method,
    contentType
  }
}

/**
 * 开发debug下，mock模拟数据
 * @param {*} mockFile 请求接口名称
 * @returns
 */
const setProxy = mockFile => `/mock/${mockFile}`

/**
 *  加工请求参数，默认post
 *
 * @param {*} url 接口地址
 * @param {*} [params={}] 接口参数
 * @param {*} [opt={
 *  method : 'get' //以get方式请求，默认为post
 *  cache : '缓存名' //接口数据需要缓存时配置，默认不缓存
 *  token : 是否传入token，默认取本地存储
 * }]
 * @returns axios params
 */

const setParams = (url, params = {}, opt = {}) => {
  promiseArr.isGlobalErr = !!opt.hasErrMsg
  // 所有接口统一参数
  params = {
    // 参数全局配置
    // code...
    ...params
  }
  // 请求个性化配置
  instance.defaults.customConfig = {
    loading: true,
    ...opt
  }

  // 开发阶段本地mock数据时，以get请求本地文件
  if (opt.mockFile && utils.isDebug) {
    opt.method = 'get'
    url = setProxy(opt.mockFile)
  }
  // 设置header和method
  const {
    method,
    contentType
  } = setHeaderMethod(opt.method)

  let curParams = {
    url,
    headers: {
      'Content-Type': contentType,
      'xg-token': utils.getStore('token') || opt.token || 'ac7232af1afebd5f0ea64c2f5616263b'
    },
    method
  }
  // get请求和post请求参数和
  if (method === 'get') {
    curParams = {
      params: opt.splitStr ? utils.serializeParam(params, opt.splitStr) : params,
      ...curParams
    }
  } else {
    curParams = {
      data: contentType === 'application/x-www-form-urlencoded' ? utils.serializeParam(params)
        : params,
      ...curParams
    }
  }
  return curParams
}

export default {
  /**
   * 同时支持get、post、put请求
   *
   * @param {*} url 接口地址
   * @param {*} [params={}] 接口参数
   * @param {*} [opt={
   *  type : true, //将params参数以key/value形式拼接,method为get时生效
   *  method : 'get' //以get方式请求，默认为post
   *  cache : '缓存名' //接口数据需要缓存时配置，默认不缓存
   * }]
   * @returns prmoise对象
   */
  fetch (url, params = {}, opt = {}) {
    const options = setParams(url, params, opt)
    return new Promise((resolve, reject) => {
      // 判断是否需要缓存
      if (opt.cache && utils.getStore(opt.cache)) {
        resolve(utils.getStore(opt.cache))
      } else {
        instance(options).then((res) => {
          if (res.code !== 200 && res.retcode !== 0) {
            if (opt.hasErrMsg) {
              resolve(res)
            } else {
              reject(res.msg || res.retmsg)
            }
          } else {
            opt.cache && utils.setStore(opt.cache, res.data || res)
            resolve(opt.hasErrMsg ? res : res.data)
          }
        }).catch((error) => {
          reject(error)
        }).finally((a, b, c) => {
          if (utils.debug) {
            console.log('========== 当前请求 ============')
            console.log('请求地址：' + url)
            console.log('请求token：' + utils.getStore('token'))
            console.log('请求接口参数：' + JSON.stringify(params))
            console.log('请求配置项：' + JSON.stringify(opt))
            console.log('返回数据：' + JSON.stringify(a, b, c))
            console.log('========== 当前请求 =============')
          }
        })
      }
    })
  }
}
