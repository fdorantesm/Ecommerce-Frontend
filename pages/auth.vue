<template>
  <div class="container">
    <div v-if="error">{{error}}</div>
    <form @submit.prevent="login" v-if="!auth.user._id">
      <input v-model="form.email" required type="email" placeholder="Correo electrónico">
      <input v-model="form.password" required type="password" placeholder="Contraseña">
      <button type="submit">Iniciar sesión</button>
    </form>
    <div v-else>
      Hola, {{auth.user.profile.firstName}}
      <a @click.prevent="logout" href="#">Salir</a>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import AuthService from '../services/AuthService'

export default {
  mounted () {

  },
  data () {
    return {
      error: null,
      form: {
        email: '',
        password: 'easycommerce'
      }
    }
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser',
      logout: 'auth/logout'
    }),
    async login (e) {
      try {
        const response = await AuthService.login(this.form.email, this.form.password)
        this.setUser(response.data)
        this.error = null
      } catch (err) {
        this.error = err.response.data.message
      }
    }
  },
  computed: {
    ...mapState(['auth'])
  }
}
</script>
