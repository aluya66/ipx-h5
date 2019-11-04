import libs from './libs'
import create from './create'
import transModules from './libs/transModules'
import base from './base'

export default {
  create,
  transModules,
  ...base,
  ...libs
}
