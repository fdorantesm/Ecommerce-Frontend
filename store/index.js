export const state = () => ({})
export const mutations = {

}
export const actions = {
  async nuxtServerInit ({ commit }) {
    await commit('products/getProducts')
  }
}
export const getters = {}
