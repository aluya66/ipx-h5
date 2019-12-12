import utils from 'utils'
/**
 * 混合开发  H5传值给APP
 * @param {*} obj  //data
 * @param method // 默认page_in
 */
export const postMessage = (method, data) => {
  let baseParams = utils.getStore('baseParams')
  let params = {
    'success': true,
    'message': '',
    'code': 0,
    'method': method || 'page_in',
    'data': data,
    'uiData': '',
    'callBack': ''
  }
  if (baseParams.platform === 'ios') {
    window.webkit.messageHandlers.IPX.postMessage(params)
  } else if (baseParams.platform === 'android' && method !== 'changeStatus') {
    window.IPX.postMessage(JSON.stringify(params))
  }
}

export default {
  postMessage
}
