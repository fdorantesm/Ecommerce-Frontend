<template>
  <div>
    <div v-if="product">
      <div class="container">
        <b-row>
          <ul class="list-reset list-inline breadcrumbs">
          <li><nuxt-link to="/products">Products</nuxt-link></li>
          <li><nuxt-link :to="{name: 'products', query: {category: product.categories[0].name}}">{{product.categories[0].name}}</nuxt-link></li>
          <li>{{product.name}}</li>
        </ul>
        </b-row>
        <div class="row">
          <b-col md="5" sm="12" class="col-md-push-7">
            <div class="p20">
              <h2>{{product.name}}</h2>
              <ul class="list-reset">
                <li v-for="category in product.categories" :key="category._id">
                  <b-badge variant="primary">{{category.name}}</b-badge>
                </li>
              </ul>
              <div class="mt20 mb20">
                <div>${{Number(product.price).toFixed(2)}} MXN</div>
              </div>
              <div class="mt20">
                <div class="product__description">
                  {{product.description || 'Lorem ipsum dolor sit amet conseqtur molom gastrim conspectrum sat.'}}
                </div>
              </div>
              <b-row class="aic">
                <b-col class="align-items-center d-flex">
                  <CartCounter @increase="cartCounterChange" @decrease="cartCounterChange" class="cart-counter mb20 mt20 p5"/>
                  <b-button class="m5" size="xs" variant="outline-success" @click="addToCart">
                    <fa icon="cart-plus"/>
                  </b-button>
                </b-col>
              </b-row>
              <b-row>

              </b-row>
            </div>
          </b-col>
          <b-col md="7" sm="12" class="col-md-pull-5">
            <div class="p20">
              <b-row class="product__image--main">
                <img v-lazy="mainImage" width="100%"/>
              </b-row>
              <b-row class="list-reset list-inline product__images">
                <b-col md="auto" v-for="image in product.files" :key="image._id" class="product__image">
                  <b-img :src="image.path" v-lazy="image.path" width="100" @click="setMainImage" class="curp"/>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </div>
      </div>
    </div>
    <div v-else>
      <b-container>
        <b-row>
          <b-col class="p20" md="8">
            <content-placeholders>
              <b-row>
                <b-col class="p10">
                  <content-placeholders-img :lines="4" />
                </b-col>
              </b-row>
              <b-row>
                <b-col class="p10"><content-placeholders-img /></b-col>
                <b-col class="p10"><content-placeholders-img /></b-col>
                <b-col class="p10"><content-placeholders-img /></b-col>
              </b-row>
            </content-placeholders>
          </b-col>
          <b-col class="p20" md="4">
            <content-placeholders>
              <content-placeholders-text :lines="1" />
              <content-placeholders-text :lines="1" />
              <content-placeholders-text :lines="1" />
            </content-placeholders>
          </b-col>
        </b-row>
      </b-container>
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
        this.$router.push('/cart')
      } catch (err) {
        console.log(err)
      }
    },
    setMainImage(e) {
      this.mainImage = e.target.dataset.src
    }
  }
}
</script>

<style>
  .cart-counter {
    width: 180px;
  }
</style>
