import axios from 'axios'
import uuid from 'uuid'

export default class CartService {
  constructor (key) {
    this.key = key || uuid.v4()
  }
  getCart () {
    return axios.get(`${process.env.API_HOST}/cart?key=${this.key}`)
  }
  static addToCart (data) {
    return axios.post(`${process.env.API_HOST}/cart`, data)
  }
  static removeFromCart (data) {
    return axios.patch(`${process.env.API_HOST}/cart`, data)
  }
}
