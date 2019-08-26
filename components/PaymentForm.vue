<template>
  <div>
    <script src="https://cdn.conekta.io/js/latest/conekta.js"></script>
    <form @submit.prevent="tokenizeCard">
      <input v-model="card.name" type="text" placeholder="Nombre completo">
      <input v-model="card.number" @keypress="getBrand" type="text" placeholder="Nùmero de la tarjeta">
      <input v-model="card.exp_month" type="text" placeholder="Mes">
      <input v-model="card.exp_year" type="text" placeholder="Año">
      <input v-model="card.cvc" type="text" placeholder="CVC">
      <button type="submit">Pagar</button>
    </form>
  </div>
</template>

<script>
import ConektaService from '~/services/ConektaService'

export default {
  props: ['defaults'],
  data () {
    return {
      token: null,
      brand: null,
      card: {
        number: "",
        name: "",
        exp_year: "",
        exp_month: "",
        cvc: ""
      }
    }
  },
  methods: {
    createToken (params) {
      return ConektaService.createToken(params)
    },
    async tokenizeCard (e) {
      try {
        const token = await this.createToken({
          card: {
            number: this.card.number,
            name: this.card.name,
            exp_year: this.card.exp_year,
            exp_month: this.card.exp_month,
            cvc: this.card.cvc
          }
        })
        this.$emit('card', {
          name: this.card.name,
          number: this.card.number,
          exp_year: this.card.exp_year,
          exp_month: this.card.exp_month
        })
        this.$emit('tokenize', token)
        this.token = token
      } catch (err) {
        this.$emit('error', err)
      }
    },
    getBrand(e) {
      console.log(e)
      this.brand = ConektaService.getBrand(e.target.value)
    }
  }
}
</script>
