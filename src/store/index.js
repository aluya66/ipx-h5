/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import env from 'utils'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: env.isDebug,
  modules,
  plugins: env.isDebug ? [createLogger()] : []
})
