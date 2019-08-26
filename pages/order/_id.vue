<template>
  <div v-if="order._id">
    <div class="container">
      <div class="row jcc">
        <div class="col-md-6">
          <div class="row fdc pt20 pb20">
            <div>Autorización: {{order.payments[0].gatewayChargeId}}</div>
            <div>Status: {{order.payments[0].status}}</div>
          </div>
          <table class="table-collapsed">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.summary" :key="item._id">
                <td>{{item.qty}}</td>
                <td>{{item.product.name}}</td>
                <td>{{item.price}}</td>
                <td>{{item.price * item.qty}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3">Subtotal</th>
                <th>{{order.total}}</th>
              </tr>
              <tr v-for="item in order.deliveries" :key="item._id">
                <td colspan="3">Envío</td>
                <td>{{item.amount}}</td>
              </tr>
              <tr>
                <td colspan="3">Total</td>
                <td>{{order.payments[0].amount}}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from '~/services/OrderService';
export default {
  data () {
    return {
      order: {}
    }
  },
  async mounted() {
    const order = await OrderService.getOrder(this.$route.params.id)
    this.order = order.data.data
  }
}
</script>