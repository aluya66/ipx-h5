/**
 * 设置cookie
 *
 * @param {*} name
 * @param {*} value
 * @param {*} day
 */
export const setCookie = (name, value, day) => {
  const date = new Date()
  date.setDate(date.getDate() + day)
  document.cookie = `${name}=${value};expires=${date}`
}

/**
 * 获取cookie
 *
 * @param {*} name
 * @returns
 */

export const getCookie = name => {
  const reg = RegExp(`${name}=([^;]+)`)
  const arr = document.cookie.match(reg)
  if (arr) {
    return arr[1]
  }
  return ''
}

/**
 * 删除 cookie
 *
 * @param {*} name
 */
export const delCookie = name => {
  setCookie(name, null, -1)
}

/**
 * 存储localStorage
 */
export const setStore = (name, content, storeType = localStorage) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  storeType.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = (name, storeType = localStorage) => {
  if (!name) return
  let value = storeType.getItem(name)
  if (value && value.indexOf('{') >= 0) {
    value = JSON.parse(storeType.getItem(name))
  }
  return value
}

/**
 * 删除localStorage
 */
export const removeStore = (name, storeType = localStorage) => {
  if (!name) return
  storeType.removeItem(name)
}

/**
 * 删除所有localStorage
 */
export const clearStore = (storeType = localStorage) => {
  storeType.clear()
}

export default {
  setCookie,
  getCookie,
  delCookie,
  setStore,
  getStore,
  removeStore,
  clearStore
}
