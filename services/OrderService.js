import axios from 'axios'
import LocalStorage from 'asynkstorage'

export default class OrderService {
  static async orderNow (data) {
    try {
      const app = await LocalStorage.getItem('app')
      const config = {
        headers: {
          authorization: app.auth.user.accessToken
        }
      }
      return axios.post('https://localhost:9001/orders', data, config)
    } catch (err) {
      throw err
    }
  }
  static async getOrder (id) {
    const app = await LocalStorage.getItem('app')
    const config = {
      headers: {
        authorization: app.auth.user.accessToken
      }
    }
    return axios.get(`https://localhost:9001/orders/${id}?with=summary,summary.product,payments,deliveries,customer.profile`, config)
  }
}
