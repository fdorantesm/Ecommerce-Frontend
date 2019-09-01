import axios from 'axios'
// import { store } from '~/store'
// import LocalStorage from 'asynkstorage'

axios.defaults.baseURL = process.env.API_HOST
axios.defaults.json = true

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

export default axios
