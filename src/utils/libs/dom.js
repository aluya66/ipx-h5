/**
 * 获取元素样式
 *
 * @param {*} ele
 * @param {*} attr
 * @returns
 */
export const getStyle = (ele, attr) => {
  if (ele.currentStyle) {
    return ele.currentStyle[attr]
  }
  return window.getComputedStyle(ele, false)[attr]
}
/**
 * 获取元素
 *
 * @param {*} ele
 * @returns
 */
export const getEle = (ele, opt = 0) => {
  if (ele.indexOf('#') === 0) {
    return document.getElementById(ele.substr(1))
  }
  if (ele.indexOf('.') === 0) {
    return document.getElementsByClassName(ele.substr(1))[opt]
  }
  return document.getElementsByName(ele)[opt]
}

export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export default {
  removeClass,
  addClass,
  hasClass,
  toggleClass,
  getEle,
  getStyle
}
