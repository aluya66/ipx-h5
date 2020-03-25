/**
 * 上传文件
 *  由于使用第三方七牛云服务，需要先获取七牛云token，然后在进行上传。
 * @param {*} context vue上下文
 * @param {*} file 上传文件列表
 * @param {*} Promise  回调
 * @returns null
 *
 */

import Http from './request'
import store from './libs/store'
import * as qiniu from 'qiniu-js'

const day = Math.ceil(
    (new Date() - new Date(new Date().getFullYear().toString())) /
                    (24 * 60 * 60 * 1000)
) + 1
const context = process.env.VUE_APP_serverPath
const photoHost = process.env.VUE_APP_UploadImg

const qiConfig = {
    timeout: 10000,
    useCdnDomain: true, // 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
    region: qiniu.region.z2 // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
}

const putExtra = {
    fname: '', // 文件原文件名
    params: {}, // 用来放置自定义变量
    mimeType: null // 用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
}

async function upload(file = []) {
    let token = await getToken().catch(err => {
        console.log('err:', err)
        return new Promise((resolve, reject) => {
            reject(err)
        })
    })
    console.info(token, '获取七牛云token')
    let state = 0; let imgData = []
    return new Promise((resolve, reject) => {
        for (let i = 0; i < file.length; i++) {
            let key = new Date().getFullYear().toString().replace('20', '') + '/' + day + '/' + new Date().getTime()
            let observable = qiniu.upload(file[i], key, token, putExtra, qiConfig)
            state++
            observable.subscribe({
                next: (result) => {
                    console.info(result) // 此处可添加上传图片的上传进度提示
                },
                error: (errResult) => {
                    console.info('errResult:', errResult) // 此处提示上传图片的过程中错误信息
                    reject(errResult)
                },
                complete: (result) => {
                    imgData.push(photoHost + result.key)
                    console.info(result, '上传之后返回的结果')
                    // imgData.push(baseImgUrl+result.key);
                    if (state === file.length) {
                        resolve(imgData)
                    }
                }
            })
        }
    })
}

// 获取token
function getToken() {
    return new Promise((resolve, reject) => {
        // 判断是否本地存在token
        const params = {
            type: 1
        }
        // if (store.getSessionStore('qiniuToken')) {
        // resolve(store.getSessionStore('qiniuToken'))
        //     return
        // }
        Http.fetch(`${context}/v1/image/token`, params, {
            method: 'get'
        }).then(res => {
            store.setSessionStore('qiniuToken', res)
            resolve(res)
        }).catch(err => {
            reject(err.message)
        })
    })
}

export default upload
