import axios from '~/libraries/http'

export default class ProductService {
  static getProduct (id) {
    return axios.get(`/products/${id}`)
  }
}
