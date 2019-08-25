<template>
  <nuxt-link :to="{name: 'products-id', params: { id: product._id }}">
    <img src="/img/products/product_1.png" class="featured-products__image" :alt="product.name">
    <hgroup>
      <h1 class="fsp18">{{product.name}}</h1>
      <h2 class="fsp16">{{product.price}}</h2>
    </hgroup>
  </nuxt-link>
</template>

<script>
export default {
  props: ['product']
}
</script>
