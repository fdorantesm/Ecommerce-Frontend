<template>
  <div class="container md-pt50 md-pb50">
    <b-row>
      <b-col md="8">
        <CartSummary :cart="cart" :removeProducts="true"/>
      </b-col>
      <b-col md="4">
        <div>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Productos</td>
                <td>{{cart.items}}</td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td>${{Number(cart.subtotal).toFixed(2)}}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>${{Number(cart.total).toFixed(2)}}</td>
              </tr>
            </tbody>
          </table>
          <b-row>
            <b-col>
              <b-button to="/cart/checkout" variant="success" block>
                Pagar
              </b-button>
              <b-button block @click="$router.push('/products')" variant="outline-primary">
                Seguir comprando
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CartSummary from '~/components/CartSummary'
import PaymentForm from '~/components/PaymentForm'
import DeliveryForm from '~/components/DeliveryForm'
import { Tabs, Tab } from 'vue-tabs-component'
import { getCurrentLocation, placeToAddress, getZipInfo} from '~/helpers/google'
import ConektaService from '~/services/ConektaService'
import OrderService from '~/services/OrderService'

export default {
  async mounted() {

},
  components: {
    CartSummary,
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['cart', 'checkout'])
  },
  methods: {

  }
}
</script>
