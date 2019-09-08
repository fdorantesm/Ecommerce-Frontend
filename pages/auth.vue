<template>
    <b-row class="aic mhin">
      <b-col sm="6" class="auth__message mhin hidden-xs">

      </b-col>
      <b-col sm="6" xs="12">
        <div class="p25">
          <div v-if="error">{{error}}</div>
          <b-form class="auth__login" @submit.prevent="login" v-if="!auth.user._id">
            <b-form-group center>
              <b-img center src="/img/logo.png" alt="Logo" width="200"/>
            </b-form-group>
            <b-form-group>
              <b-form-input class="login__input" v-model="form.email" required type="email" placeholder="Correo electrónico" />
            </b-form-group>
            <b-form-group>
              <b-form-input class="login__input" v-model="form.password" required type="password" placeholder="Contraseña" />
            </b-form-group>
            <b-btn black variant="primary" type="submit">Iniciar sesión</b-btn>
          </b-form>
        </div>
      </b-col>
    </b-row>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import AuthService from '../services/AuthService'

export default {
  layout: 'external',
  updated () {
    if (this.auth.user._id) {
      this.$router.push('/')
    }
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
        this.$router.push('/cart')
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
