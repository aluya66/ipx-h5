/**
 *  将目录中所有以./c-开头的目录和.vue结尾的文件转成首字母大写的驼峰表达式，然后全部导出。
 *  './c-picker/picker.vue' => CPicker : Object，
 */
const modulesDir = require.context('./', true, /^\.\/c-.*\.vue$/)
const curModules = modulesDir.keys().reduce((module, key) => {
  const moduleKey = key.split('/')[1]
  // console.log('====', key, '====>', moduleKey, '<====>', modulesDir(key).default);
  module[moduleKey.replace(/-[a-z]/g, $1 => $1.split('-')[1].toUpperCase()).replace(/^c/, $1 => $1.toUpperCase())] = modulesDir(key).default
  return module
}, {})

export default curModules
