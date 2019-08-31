import ProductService from '~/services/ProductService'

export const state = () => ({

})

export const mutations = {
  async getProducts (state) {
    try {
      const response = await ProductService.getProducts()
      state.list = response.data.data.docs
    } catch (err) {
      console.log('erx', err)
    }
  },
  setProducts (state, products) {
    state.list = products
  }
}

export const actions = {
  setProducts ({ commit }, products) {
    commit('setProducts', products)
  },
  async getProducts ({ commit }) {
    await commit('getProducts')
  }
}
