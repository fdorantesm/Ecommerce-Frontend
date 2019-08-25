<template>
  <header id="header">
    <div class="container dfx aic">
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
            <nuxt-link class="nav__link" to="/">Item</nuxt-link>
          </li>
          <li class="nav__item">
            <nuxt-link class="nav__link" to="/">Item</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
