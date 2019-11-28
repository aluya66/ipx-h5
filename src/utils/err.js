/**
 * 统一异常处理
 *
 * @param {*} context vue上下文
 * @param {*} err 错误信息对象
 * @param {*} callback 异常处理回调函数
 * @returns null
 *
 */
export default (err, callBackFun, time) => {
    const errCode = err.code
    let errMsg = ''
    switch (errCode) {
    case 11:
        errMsg = err.message
        window.$utils.postMessage('user_authentication', '')
        break
    case 101:
        errMsg = '鉴权失败'
        window.$utils.postMessage('user_authentication', '')
        break
    case 102:
        errMsg = '服务器异常，请稍后重试'
        break
    default:
        errMsg = err.message
        break
    }
    window.globalVue.$toast(`${errMsg}`, time)
    // console.log(`${errCode}【${errMsg}】`)
    callBackFun && callBackFun(err)
}
