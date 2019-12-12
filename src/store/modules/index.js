import utils from 'utils'

const moduleFiles = require.context('./', false, /\.js$/)

export default utils.transModules(moduleFiles)
