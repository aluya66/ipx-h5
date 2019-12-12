/* eslint-disable no-shadow */
import requireComponents from 'components'

export default (Vue) => {
  /**
   * 自定义组件全局注册
   *
   * @param {*} requireComponents
   * @param {*} Vue
   */
  ((requireComponents, Vue) => {
    Object.keys(requireComponents).forEach((componentName) => {
      // Get the component config
      const componentConfig = requireComponents[componentName]
      // Globally register the component
      Vue.component(componentName, componentConfig.default || componentConfig)
    })
  })(requireComponents, Vue)
}
