import Vue from 'vue'
import CSvg from 'components/c-svg'

// register globally
Vue.component('c-svg', CSvg)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
