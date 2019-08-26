<template>
  <div class="container">
    <div class="row">
      <div v-for="product in products" :key="product._id" class="col-md-4">
        <ProductCard :product="product" />
      </div>
    </div>
    <infinite-loading @infinite="getProducts">
      <div v-if="fetching" slot="spinner">
        Cargando
      </div>
      <div v-if="!hasMore" slot="no-more">
        No hay más productos
      </div>
      <div v-if="products.length === 0 && !fetching" slot="no-results">
        No hay productos :(
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProductCard from '~/components/ProductCard'

export default {
  components: {
    ProductCard
  },
  data: () => {
    return {
      page: 1,
      pages: 1,
      loading: false,
      hasMore: false,
      products: [],
      fetching: false
    }
  },
  mounted () {
    // this.getProducts()
  },
  methods: {
    ...mapActions({
      // setProducts: 'products/setProducts'
    }),
    async getProducts ($state) {
      this.fetching = true
      const response = await this.$axios.$get(`/products?page=${this.page}&with=files,categories`)
      this.products = this.products.concat(response.data.docs)
      // this.setProducts(this.products)
      this.hasMore = response.data.hasNextPage
      this.fetching = false
      this.page = response.data.nextPage
      if (this.hasMore && !this.fetching) {
        $state.loaded()
      } else if (!this.hasMore) {
        $state.complete()
      }
    }
  }
}
</script>
