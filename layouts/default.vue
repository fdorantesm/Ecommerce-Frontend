<template>
  <div id="app">
    <Header />
    <main>
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import '../scss/styles.scss'
import { mapState, mapActions } from 'vuex'
import LocalStorage from 'asynkstorage'
import CartService from '~/services/CartService'

export default {
  async mounted () {
    try {
      const app = await LocalStorage.getItem('app', {})
      if (!app.cart) {
        console.log('1∆')
        await this.loadCart()
      } else {
        console.log('2∆')
        await this.loadCart(app.cart.key)
      }
    } catch (err) {
      console.error(err)
    }
  },
  computed: {
    ...mapState(['cart'])
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
      console.log(response)
      this.updateCart(response.data)
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  > main {
    flex-grow: 1
  }
}
</style>
