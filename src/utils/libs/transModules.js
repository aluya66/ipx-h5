/**
 * 处理路由、数据store，例如 demo.js => {demo: {}}
 *
 * @param {*} moduleFiles 文件对象
 * @returns
 */
export default moduleFiles => moduleFiles.keys().filter(v => v !== './index.js').reduce((mutations, key) => {
  mutations[key.replace(/(^\.\/)|(\.js$)/g, '')] = moduleFiles(key).default || moduleFiles(key)
  return mutations
}, {})
