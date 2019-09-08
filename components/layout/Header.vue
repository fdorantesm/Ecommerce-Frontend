<template>
  <header id="header">
    <b-container>
      <b-navbar toggleable="md">
        <b-navbar-brand to="/">
          <img src="/img/logo.png" class="header__logo"/>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/products">Products</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/cart">
              <div class="shopping-icon">
                <span class="shopping-icon__badge">{{cart.items <= 9 ? cart.items : '+9'}}</span>
                <fa icon="shopping-cart"/>
              </div>
            </b-nav-item>
            <b-nav-item v-if="!auth.user._id" to="/auth">
              Login
            </b-nav-item>
            <b-nav-item-dropdown v-if="auth.user._id" right>
              <template slot="button-content">
                <fa icon="user"/> <em>{{auth.user.profile.firstName}}</em>
              </template>
              <b-dropdown-item to="/profile">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['auth', 'cart'])
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }
}
</script>
