import utils from 'utils'

const APP_DIRECTION = 'APP_DIRECTION'
const CAR_LIST = 'CAR_LIST'

/**
 * vuex的state
 */
const state = {
  cartList: [], // 加入购物车列表
  fadeDirection: 'forward'
}

/**
 * vuex的getters
 */
const getters = {
  cartList: state => state.cartList,
  fadeDirection: state => state.fadeDirection
}

/**
 * vuex中的mutations
 */
const mutations = {
  // 网页初始化时从本地缓存获取购物车数据
  [CAR_LIST] (state) {
    const initCart = utils.getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  [APP_DIRECTION] (state, payload) {
    state.fadeDirection = payload
  }
}

/**
 * vuex中的actions
 */
const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
