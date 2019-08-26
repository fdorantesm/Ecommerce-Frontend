import axios from 'axios'
import uuid from 'uuid'

export default class CartService {
  constructor (key) {
    this.key = key || uuid.v4()
  }
  getCart () {
    return axios.get(`https://localhost:9001/cart?key=${this.key}`)
  }
  static addToCart (data) {
    return axios.post(`https://localhost:9001/cart`, data)
  }
}
