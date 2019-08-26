import axios from 'axios'
// import { store } from '~/store'
// import LocalStorage from 'asynkstorage'

if (process.client) {
  const state = JSON.parse(localStorage.getItem('app')) || {}
  axios.defaults.baseURL = 'https://localhost:9001'
  axios.defaults.json = true
  axios.defaults.headers.common['accept-language'] = state.lang || 'es'

  // axios.interceptors.request.use(config => {
  //     let token = state.user ? state.user.token : null
  //     if (token) {
  //         config.headers.Authorization =  token
  //     }
  //     store.dispatch('loading', true)
  //     return config;
  //   }, (error) => {
  //     store.dispatch('loading', false)
  //     return Promise.reject(error);
  // });

  // axios.interceptors.response.use((response) => {
  //     store.dispatch('loading', false)
  //     return response;
  //   }, (error) => {
  //     store.dispatch('loading', false)
  //     return Promise.reject(error);
  // });
}

export default axios
