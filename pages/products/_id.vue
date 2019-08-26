<template>
  <div v-if="product">
    <div class="container">
      <div class="row">
        <div class="col-md-8 p20"></div>
        <div class="col-md-4 p20">
          <div>{{product.name}}</div>
          <div>{{product.price}}</div>
          <ul class="list-reset">
            <li v-for="category in product.categories" :key="category._id">
              {{category.name}}
            </li>
          </ul>
          <div>
            Available <small>{{product.stock || 0}}</small>
          </div>
          <div>
            <p>{{product.description}}</p>
          </div>
          <div>
            <CartCounter @increase="cartCounterChange" @decrease="cartCounterChange" class="cart-counter mb20 mt20"/>
            <button class="btn fw" @click="addToCart">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCounter from '~/components/CartCounter'
import ProductService from '~/services/ProductService'
import { mapState, mapActions } from 'vuex'
import uuid from 'uuid'
import CartService from '../../services/CartService';

export default {
  components: {
    CartCounter
  },
  mounted () {
    console.log({id: this.$route.params.id})
    this.getProduct(this.$route.params.id)
  },
  data () {
    return {
      product: null,
      include: ['categories', 'files'],
      cartBag: {
        key: null,
        qty: 1,
        product: null
      }
    }
  },
  computed: {
    ...mapState(['auth', 'cart'])
  },
  methods: {
    ...mapActions({
      'updateCart': 'cart/updateCart'
    }),
    cartCounterChange(value) {
      this.cartBag.qty = value
    },
    async getProduct (id) {
      try {
        const response = await ProductService.getProduct(id, this.include)
        this.product = response.data.data
        this.cartBag.product = this.product._id
      } catch (err) {
        console.log(err)
      }
    },
    async addToCart (e) {
      try {
        const response = await CartService.addToCart({
          key: this.cart.key,
          product: this.cartBag.product,
          qty: this.cartBag.qty
        })
        this.updateCart(response.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
  .cart-counter {
    width: 180px;
  }
</style>
