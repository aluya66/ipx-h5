/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */

/**
 * 邮箱验证
 * @param {*} value
 */
export const isEmail = (value) => {
  const reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
  return reg.test(value)
}

/**
 * 验证手机号
 * @param {*} value
 */
export const isMobile = (value) => {
  value = value.replace(/[^-|\d]/g, '')
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
}

/**
 * 验证数字
 * @param {*} value
 */
export const isNumber = value => /^\d+$/.test(value)

/**
 * 验证图片
 * @param {*} url
 */
export const isImage = url => /^(https?:)?\/\/|data:image/.test(url)

/**
 * 判断数据是否有效
 * @param {*} value
 */
export const isVal = value => value !== undefined && value !== null

/**
 * 判断是否为对象
 * @param {*} x
 */
export const isObj = (x) => {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

/**
 * 判断是否为字符串
 * @param {*} str
 */
export const isString = str => {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * 判断是否为数字
 * @param {*} arg
 */
export const isArray = arg => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 检查是否为移动端，并区分andorid，ios，weixin
 *
 * @returns
 */
export const isMobileEnv = () => {
  const u = navigator.userAgent
  if (/(iPhone|iPad|iPod|iOS)/i.test(u)) {
    return 'Ios'
  } if (/(Android)/i.test(u)) {
    return 'Android'
  } if (/(MicroMessenger)/i.test(u)) {
    return 'Weixin'
  }
  return false
}
