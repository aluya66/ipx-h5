/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/**
 * Create a basic component with common options
 */
import bem from './bem'
import { camelize } from '../base'
import { isVal } from '../validate'

function install (Vue) {
  const { name } = this
  Vue.component(name, this)
  Vue.component((camelize(`-${name}`)), this)
}

function defaultProps (props) {
  Object.keys(props).forEach((key) => {
    if (props[key] === Array) {
      props[key] = {
        type: Array,
        default: []
      }
    } else if (props[key] === Number) {
      props[key] = {
        type: Number,
        default: 0
      }
    }
  })
}

export default function (cm) {
  cm.name = `c-${cm.name}`
  cm.install = cm.install || install
  cm.mixins = cm.mixins || []
  cm.mixins.push(bem)
  cm.methods = cm.methods || {}
  cm.methods.isVal = isVal
  cm.props && defaultProps(cm.props)

  return cm
}
