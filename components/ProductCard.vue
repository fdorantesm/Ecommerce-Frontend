<template>
    <div class="product-card m10">
      <div class="product-card__image">
        <nuxt-link :to="{name: 'products-id', params: { id: product._id }}">
          <img v-lazy="product.files[0].path" class="featured-products__image" :alt="product.name">
        </nuxt-link>
      </div>
      <div class="product-card__body p10">
        <hgroup>
          <nuxt-link :to="{name: 'products-id', params: { id: product._id }}">
            <h1 class="fsp18">{{product.name}}</h1>
          </nuxt-link>
          <h6 class="fsp16 product-card__description">{{product.description || 'Lorem ipsum dolor sit amet conseqtur molom.'}}</h6>
          <h2 class="fsp16">${{Number(product.price).toFixed(2)}}</h2>
        </hgroup>
      </div>
      <div class="product-card__actions p10">
        <b-button :to="`/products/${product._id}`" size="sm" variant="success" block squared>
          <div class="fsp14">
            ¡Lo quiero!
          </div>
        </b-button>
      </div>
    </div>
</template>

<script>
export default {
  props: ['product']
}
</script>
