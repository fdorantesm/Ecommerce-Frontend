<template>
    <table class="table-collapsed table-responsive">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Importe</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cart.products" :key="product._id">
            <td>{{product.name}}</td>
            <td>{{product.qty}}</td>
            <td>{{Number(product.price).toFixed(2)}}</td>
            <td>{{Number(product.price * product.qty).toFixed(2)}}</td>
            <td><b-button variant="outline-danger" size="sm" @click="deleteProductFromCart" :data-product="product.id"><fa icon="times"/></b-button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
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
          </tr>
        </tfoot>
    </table>
</template>

<script>
import {mapActions} from 'vuex'
import CartService from '~/services/CartService'

export default {
  props: ['cart'],
  methods: {
    ...mapActions({
      removeProduct: 'cart/removeProduct',
      updateCart: 'cart/updateCart'
    }),
    async deleteProductFromCart(e) {
      try {
        const cartResponse = await CartService.removeFromCart({
          key: this.cart.key,
          product: e.target.dataset.product
        })
        this.removeProduct(e.target.dataset.product)
        this.updateCart(cartResponse.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
