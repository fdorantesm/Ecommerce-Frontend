export const state = () => ({
  list: []
})

export const mutations = {
  setProducts (state, products) {
    state.list = products
  }
}

export const actions = {
  setProducts ({ commit }, products) {
    commit('setProducts', products)
  }
}
