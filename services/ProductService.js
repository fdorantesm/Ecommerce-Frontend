import axios from 'axios'

export default class ProductService {
  static getProducts () {
    return axios.get(`http://localhost:8001/products`)
  }
  static getProduct (id) {
    return axios.get(`http://localhost:8001/products/${id}`)
  }
}
