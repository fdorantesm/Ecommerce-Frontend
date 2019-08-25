export const state = () => ({
  key: null,
  products: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  items: 0
})

export const mutations = {
  setKey (state, key) {
    state.key = key
  },
  addProduct (state, product) {
    state.products.push(product)
  },
  removeProduct (state, product) {
    state.products = state.products.filter(current => current._id !== product._id)
  },
  updateCart (state, cart) {
    state.products = cart.products
    state.total = cart.total
    state.subtotal = cart.subtotal
    state.tax = cart.tax
    state.key = cart.key
    state.items = cart.items
  }
}

export const actions = {
  setKey ({ commit }, key) {
    commit('setKey', key)
  },
  addProduct ({ commit }, product) {
    commit('addProduct', product)
  },
  removeProduct ({ commit }, product) {
    commit('removeProduct', product)
  },
  updateCart ({ commit }, cart) {
    commit('updateCart', cart)
  }
}
