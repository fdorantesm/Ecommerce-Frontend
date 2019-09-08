<template>
  <div class="container">
    <div class="row">
      <b-col md="3"></b-col>
      <b-col md="9">
        <b-row>
          <b-col v-for="product in products" :key="product._id" lg="4" md="6" sm="6" xs="6">
            <ProductCard :product="product" />
          </b-col>
        </b-row>
        <b-row class="mt25 mb25">
          <b-pagination @change="changePage" v-model="page" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
        </b-row>
      </b-col>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ProductCard from '~/components/ProductCard'
import ProductService from '~/services/ProductService'
import queryString from 'query-string'

export default {
  scrollToTop: true,
  components: {
    ProductCard,
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    const data = {}
    const productsResponse = await ProductService.getProducts(query.page || 1, ['categories', 'files']);
    data.pages = 20;
    data.products = productsResponse.data.data.docs;
    data.page = productsResponse.data.data.page;
    data.perPage = productsResponse.data.data.limit;
    data.rows = productsResponse.data.data.totalDocs
    return data;
  },
  data: () => {
    return {
      page: 1,
      pages: 1,
      loading: false,
      hasMore: false,
      fetching: false,
      products: []
    }
  },
  methods: {
    functionName() {

    },
    async getProducts (page) {
      const productsResponse = await ProductService.getProducts(page, ['categories', 'files']);
      this.pages = 20;
      this.products = productsResponse.data.data.docs;
      this.page = productsResponse.data.data.page;
      this.perPage = productsResponse.data.data.limit;
      this.rows = productsResponse.data.data.totalDocs
    },
    async changePage(page) {
      this.$router.push({ query: {...this.$router.history.current.query, page}})
      await this.getProducts(page)
      window.scrollTo(0, 0)
    }
  }
}
</script>
