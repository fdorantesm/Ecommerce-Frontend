import axios from 'axios'

export default class ProductService {
  static getProducts () {
    return axios.get(`http://api-store.dorant.es/products`)
  }
  static getProduct (id) {
    return axios.get(`http://api-store.dorant.es/products/${id}`)
  }
}
