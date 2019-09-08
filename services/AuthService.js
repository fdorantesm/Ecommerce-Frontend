import axios from 'axios'

export default class AuthService {
  static login (email, password) {
    return axios.post(`${process.env.API_HOST}/auth/login`, { email, password })
  }
}
