<template>
  <div>
    <b-row v-if="cart.products.length > 0">
      <b-col>
        <table class="cart-summary__table table-collapsed w-100">
            <tbody>
              <tr v-for="product in cart.products" :key="product._id">
                <td>
                  <div class="cart__product__image pr">
                    <!-- <b-img :src="product.files[0].path" v-lazy="product.files[0].path" width="100%"/> -->
                    <Picture :src="product.files[0].path" />
                    <b-badge variant="primary" class="cart__product__badge">{{product.qty}}</b-badge>
                  </div>
                </td>
                <td>
                  <div>{{product.name}}</div>
                  <div><small>{{product.categories[0].name}}</small></div>
                </td>
                <td>$ {{Number(product.price * product.qty).toFixed(2)}} MXN</td>
                <td v-if="removeProducts"><b-button variant="outline-danger" size="sm" @click="deleteProductFromCart(product.id)"><fa icon="times"/></b-button></td>
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
import {mapActions} from 'vuex'
import CartService from '~/services/CartService'
import Picture from '~/components/Picture'

export default {
  components: {
    Picture,
  },
  props: ['cart', 'removeProducts'],
  methods: {
    ...mapActions({
      removeProduct: 'cart/removeProduct',
      updateCart: 'cart/updateCart'
    }),
    async deleteProductFromCart(product) {
      console.log(product)
      try {
        const cartResponse = await CartService.removeFromCart({
          key: this.cart.key,
          product: product
        })
        this.removeProduct(product)
        this.updateCart(cartResponse.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
