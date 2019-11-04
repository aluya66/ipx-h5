/* eslint-disable import/prefer-default-export */
import utils from 'utils'

const moduleFiles = require.context('./', false, /\.js$/)

const modules = utils.transModules(moduleFiles)

export {
  modules
}
