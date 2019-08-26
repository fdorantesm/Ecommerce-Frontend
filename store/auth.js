const store = {
  state () {
    return {
      user: {}
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    logout (state) {
      state.user = {}
    }
  },
  actions: {
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    logout ({ commit }) {
      commit('logout')
    }
  }
}

export default store
