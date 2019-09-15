<template>
  <div id="app">
    <header id="header">
        <b-container>
          <b-navbar toggleable="md">
            <b-navbar-brand>
              <img src="/img/logo.png" class="header__logo--minimal"/>
            </b-navbar-brand>
          </b-navbar>
        </b-container>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import '~/scss/styles.scss'
import { mapState, mapActions } from 'vuex'
import LocalStorage from 'asynkstorage'
import CartService from '~/services/CartService'

export default {
  async mounted () {
    try {
      const app = await LocalStorage.getItem('app', {})
      if (!app.cart) {
        await this.loadCart()
      } else {
        await this.loadCart(app.cart.key)
      }
    } catch (err) {
      console.error(err)
    }
  },
  computed: {
    ...mapState(['cart', 'products'])
  },
  components: {
    Header,
    Footer
  },
  methods: {
    ...mapActions({
      'setCartKey': 'cart/setKey',
      'updateCart': 'cart/updateCart'
    }),
    async loadCart (key) {
      const shoppingCart = new CartService(key)
      const response = await shoppingCart.getCart()
      this.updateCart(response.data)
    }
  }
}
</script>
