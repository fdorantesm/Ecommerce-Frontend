export const state = () => ({
  token: null,
  delivery: {},
  payment: {
    method: 'oxxo'
  },
  card: {}
})

export const mutations = {
  setDeliveryData (state, data) {
    state.delivery = data
  },
  setPaymentData (state, data) {
    state.payment = data
  },
  setToken (state, token) {
    state.token = token
  },
  setCard (state, card) {
    state.card = card
  },
  updatePaymentMethod (state, method) {
    state.payment.method = method
  }
}

export const actions = {
  setDeliveryData ({ commit }, data) {
    commit('setDeliveryData', data)
  },
  setPaymentData ({ commit }, data) {
    commit('setPaymentData', data)
  },
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  setCard ({ commit }, card) {
    commit('setCard', card)
  },
  updatePaymentMethod ({ commit }, method) {
    commit('updatePaymentMethod', method)
  }
}
