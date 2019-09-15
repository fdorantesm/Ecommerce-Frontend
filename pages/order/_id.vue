<template>
  <div v-if="order._id">
    <div class="container">
      <div class="row jcc">
        <div class="col-md-5">
            <b-badge pill :variant="isPending ? 'warning' : 'success'" class="mt20 mb-20">
              {{isPending ? 'Pendiente' : 'Pagada'}}
            </b-badge>
            <b-badge pill variant="info" class="mt20 mb-20">
              {{method}}
            </b-badge>
            <OrderSummary :summary="order.summary" class="pt20 pb20"/>
            <table v-if="order.payments.length > 1" class="table-bordered table-collapsed w-100">
              <tbody>
                <tr v-for="(payment, index) in order.payments" :key="payment._id">
                  <td>{{index+1}}</td>
                  <td>$ {{payment.amount}} {{payment.currency}}</td>
                  <td>{{payment.status}}</td>
                </tr>
              </tbody>
            </table>
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td>Envío</td>
                  <td>$ {{order.deliveries[0].amount}} MXN</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>$ {{order.payments[0].amount}} MXN</td>
                </tr>
              </tbody>
            </table>
            <b-button variant="outline-primary" @click.prevent="downloadOrderReceipt">Descargar</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from '~/services/OrderService'
import capitalize from 'lodash/capitalize'
import OrderSummary from '~/components/OrderSummary'
import {mapState} from 'vuex'

export default {
  components: {
    OrderSummary
  },
  data () {
    return {
      order: {},
      isPending: false,
      method: null,
      api: process.env.API_HOST
    }
  },
  async mounted() {
    const order = await OrderService.getOrder(this.$route.params.id)
    this.order = order.data.data
    const pendings = this.order.payments.map(payment => {
      payment.status === 'pending_payment'
    })
    this.isPending = pendings.length > 0
    switch (this.order.payments[0].method) {
      case 'oxxo': this.method = 'OXXO'; break;
      case 'spei': this.method = 'SPEI'; break;
      case 'card': this.method = 'Tarjeta'; break;
    }
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {
    capitalize,
    downloadOrderReceipt() {
      window.open(`${process.env.API_HOST}/orders/${this.order._id}/receipt?access_token=${this.auth.user.accessToken.replace('Bearer ', '')}`);
    }
  }
}
</script>
