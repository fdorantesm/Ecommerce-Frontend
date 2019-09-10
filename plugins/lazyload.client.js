import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/img/error.png',
  loading: '/img/loader.gif',
  attempt: 1
})

console.log('mmm')
