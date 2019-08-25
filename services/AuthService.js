import axios from 'axios'

export default class AuthService {
  static login (email, password) {
    return axios.post('https://localhost:9001/auth/login', { email, password })
  }
}
