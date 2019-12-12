/**
* actions、mutations中用的常量
*/
const GOODS_GET_TOTALNUM = 'GOODS_GET_TOTALNUM'

/**
* vuex的state
*/
const state = {
  goodsTotalNum: 0
}

/**
* vuex的getters
*/
const getters = {
  getGoodsTotalNum: state => state.goodsTotalNum
}

/**
* vuex中的actions
*/
const actions = {
  add ({ commit }, payload) {

  },
  del ({ commit }, payload) {

  },
  edit ({ commit }, payload) {

  },
  get ({ commit }, payload) {

  }
}

/**
* vuex中的mutations
*/
const mutations = {
  [GOODS_GET_TOTALNUM] (state, { payload, meta }) {
    state.goodsTotalNum = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
