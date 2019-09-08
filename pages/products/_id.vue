<template>
  <div v-if="product">
    <div class="container">
      <div class="row">
        <b-col md="8">
          <div class="p20">
            <b-row class="product__image--main">
              <img :src="mainImage" width="100%"/>
            </b-row>
            <b-row class="list-reset list-inline product__images">
              <b-col md="auto" v-for="image in product.files" :key="image._id" class="product__image">
                <b-img :src="image.path" width="100" @click="setMainImage" class="curp"/>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col md="4">
          <div class="p20">
            <h2>{{product.name}}</h2>
            <div>${{Number(product.price).toFixed(2)}}</div>
            <ul class="list-reset">
              <div class="text-label">
                Categoría
              </div>
              <li v-for="category in product.categories" :key="category._id">
                {{category.name}}
              </li>
            </ul>
            <div class="mt20">
              <div class="text-label">Descripción</div>
              <div class="product__description">
                {{product.description || 'Lorem ipsum dolor sit amet conseqtur molom gastrim conspectrum sat.'}}
              </div>
            </div>
            <b-row>
              <CartCounter @increase="cartCounterChange" @decrease="cartCounterChange" class="cart-counter mb20 mt20"/>
            </b-row>
            <b-row>
              <b-button size="xs" variant="outline-success" @click="addToCart">
                <fa icon="shopping-cart"/> Agregar
              </b-button>
            </b-row>
          </div>
        </b-col>
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
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    try {
      const data = {
        product: null,
        mainImage: null,
        cartBag: {
          key: null,
          qty: 1,
          product: null
        }
      }
      const response = await ProductService.getProduct(route.params.id, ['categories','files'])
      data.product = response.data.data
      data.mainImage = data.product.files[0].path
      data.cartBag.product = data.product._id
      return data
    } catch (err) {
      error({ statusCode: err.response.data.statusCode, message: err.response.data.message })
    }
  },
  computed: {
    ...mapState(['auth', 'cart'])
  },
  methods: {
    async getProduct (id) {
      try {
        const response = await ProductService.getProduct(id, ['categories','files'])
        this.product = response.data.data
        this.cartBag.product = this.product._id
      } catch (err) {
        console.log(err)
      }
    },
    ...mapActions({
      'updateCart': 'cart/updateCart'
    }),
    cartCounterChange(value) {
      this.cartBag.qty = value
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
    },
    setMainImage(e) {
      this.mainImage = e.target.src
    }
  }
}
</script>

<style>
  .cart-counter {
    width: 180px;
  }
</style>
