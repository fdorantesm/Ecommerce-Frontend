import axios from 'axios'

export default class AuthService {
  static login (email, password) {
    return axios.post('https://api-store.dorant.es/auth/login', { email, password })
  }
}
