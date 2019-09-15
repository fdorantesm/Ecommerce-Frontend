<template>
  <div>
    <b-row v-if="summary.length > 0">
      <b-col>
        <table class="cart-summary__table table-collapsed w-100">
            <tbody>
              <tr v-for="item in summary" :key="item._id">
                <td>
                  <div class="cart__product__image pr">
                    <Picture :src="item.product.files[0].path" />
                    <b-badge variant="primary" class="cart__product__badge">{{item.product.qty}}</b-badge>
                  </div>
                </td>
                <td>
                  <div>{{item.product.name}}</div>
                  <div><small>{{item.product.categories[0].name}}</small></div>
                </td>
                <td>$ {{Number(item.price * item.qty).toFixed(2)}} MXN</td>
              </tr>
            </tbody>
            <tfoot>
              <!-- <tr>
                <th colspan="2">Subtotal</th>
                <th>IVA</th>
                <th>Total</th>
                <th></th>
              </tr>
              <tr>
                <td colspan="2">{{Number(cart.subtotal).toFixed(2)}}</td>
                <td>{{Number(cart.total - cart.subtotal).toFixed(2)}}</td>
                <td>{{Number(cart.total).toFixed(2)}}</td>
                <th></th>
              </tr> -->
            </tfoot>
        </table>
      </b-col>
    </b-row>
    <b-row v-else class="text-center">
      <b-col>
        <div>:) Aún no tienes productos en tu carrito</div>
        <div>
          <b-button to="/products" variant="primary">Ir a la tienda</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Picture from '~/components/Picture'

export default {
  components: {
    Picture,
  },
  props: ['summary']
}
</script>
