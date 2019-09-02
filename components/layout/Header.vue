<template>
  <header id="header">
    <!-- <div class="container dfx aic">
      <nuxt-link to="/">
        <img src="/img/logo.png">
      </nuxt-link>
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item">
            <nuxt-link to="/products">Products</nuxt-link>
          </li>
          <li class="nav__item">
            <nuxt-link class="nav__link" to="/auth">Login</nuxt-link>
          </li>
          <li class="nav__item">
            <nuxt-link class="nav__link" to="/cart">Cart</nuxt-link>
          </li>
          <li class="nav__item">
            <nuxt-link class="nav__link" to="/">Item</nuxt-link>
          </li>
        </ul>
      </nav>
    </div> -->
    <div>
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#">
          <nuxt-link to="/">eCommerce</nuxt-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><nuxt-link to="/">Home</nuxt-link></b-nav-item>
            <b-nav-item><nuxt-link to ="/products">Products</nuxt-link></b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
            </b-nav-item-dropdown> -->
            <b-nav-item href="#">
              <nuxt-link to="/cart">
                <fa icon="shopping-cart"/>
              </nuxt-link>
            </b-nav-item>
            <b-nav-item v-if="!auth.user._id">
              <nuxt-link to="/auth">Login</nuxt-link>
            </b-nav-item>
            <b-nav-item-dropdown v-if="auth.user._id" right>
              <template slot="button-content"><fa icon="user"/> <em>{{auth.user.profile.firstName}}</em></template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {faUser} from '@fortawesome/free-solid-svg-icons'
export default {
  data(){
    return {
      icon: {
        faUser
      }
    }
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }
}
</script>
