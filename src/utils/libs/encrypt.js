/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/prefer-default-export */

import sha256 from 'crypto-js/sha256'
import hmacSHA265 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import md5 from 'crypto-js/md5'

import utils from 'utils'

const APPID = '100000000000000000'
const APPKEY = 'dc5af4fb5bf04fd6' // sid_health_appkey_ver_1
const SECRET = {
  key: 'ssr5bvcr1va1fd29meitwk5m6n6yjamb'
}

const md5Params = {
  appkey: APPKEY,
  qualify_type: 1
}

// const salt = getRandomNum();
//       const secret = 'ssr5bvcr1va1fd29meitwk5m6n6yjamb';
//       const sign = getSign({
//         appkey: 'sid_health_appkey_ver_1',
//         qualify_type: 1,
//         salt,
//         smartid: '1111',
//         key: secret
//       });

/**
 * sha256加密
 *
 * @param {*} data
 * @returns
 */
export const cryptoSha = data => sha256(data)

/**
 * md5 加密
 * @param {*} data
 */
export const cryptoMd5 = data => md5(data)

/**
 * 对数据进行hmacSHA265 加密
 * @param {*} appkey 密钥
 * @param {*} data，加密字段（当前时间戳+随机数+所有参数)
 */
export const cryptoHmacSHA265 = (data, appkey) => hmacSHA265(data, appkey)

/**
 *  生成token
 * @param {*} data
 */
export const setToken = (data, appkey) => Base64.stringify(cryptoHmacSHA265(data, appkey))

/**
 * 构造请求头部的Authorization值
 * @param {*} appid
 * @param {*} appkey
 * @param {*} data
 */
export const getAuth = data => `appid="${APPID}",token="${setToken(data, APPKEY)}"`

/**
 * 获取签名
 * @param {*} data
 * @example appkey=value&qualify_type=value&salt=value&smartid=value&key=secret value
 */
export const getSign = data => md5(utils.serializeParam({
  ...md5Params,
  ...data,
  ...SECRET
}))

/**
 *  返回appkey
 */
export const getAppKey = () => APPKEY

export default {
  getSign,
  getAuth,
  cryptoSha,
  cryptoMd5
}
