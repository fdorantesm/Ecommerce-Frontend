<template>
  <form @submit.prevent class="cart-counter">
    <button class="cart-counter__button cart-counter__button--decrease" @click="decrease">
      <span>-</span>
    </button>
    <input v-model="count" type="number" class="cart-counter__input" max="999999" min="1" disabled>
    <button class="cart-counter__button cart-counter__button--increase" @click="increase">
      <span>+</span>
    </button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      count: 1
    }
  },
  methods: {
    increase () {
      this.count++
      this.$emit('increase', this.count)
    },
    decrease () {
      if (this.count > 1) {
        this.count--
        this.$emit('decrease', this.count)
      }
    }
  }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
input[type=number] {
  -moz-appearance:textfield; /* Firefox */
}
</style>
