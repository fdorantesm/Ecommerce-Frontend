import axios from 'axios'

export default class ProductService {
  static getProducts () {
    return axios.get(`https://api-store.dorant.es/products`)
  }
  static getProduct (id) {
    return axios.get(`https://api-store.dorant.es/products/${id}`)
  }
}
