import http from '~/libraries/http'
export default class ProductService {
  static getProducts (page = 1, includes = []) {
    const query = {
      page,
      with: includes.toString()
    }
    const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&')
    return http.get(`/products?${queryString}`)
  }
  static getProduct (id, includes) {
    const query = {
      with: includes.toString()
    }
    const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&')
    return http.get(`/products/${id}?${queryString}`)
  }
}
