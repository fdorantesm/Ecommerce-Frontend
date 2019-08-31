import axios from 'axios'
import uuid from 'uuid'

export default class CartService {
  constructor (key) {
    this.key = key || uuid.v4()
  }
  getCart () {
    return axios.get(`https://api-store.dorant.es/cart?key=${this.key}`)
  }
  static addToCart (data) {
    return axios.post(`https://api-store.dorant.es/cart`, data)
  }
}
