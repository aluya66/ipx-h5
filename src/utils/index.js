import libs from './libs'
import create from './create'
import transModules from './libs/transModules'
import base from './base'
import validate from './validate'
import methods from './methods'
import upload from './upload'
export default {
    create,
    transModules,
    ...base,
    ...libs,
    ...validate,
    ...methods,
    upload
}
