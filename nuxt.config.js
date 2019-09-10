const autoprefixer = require('autoprefixer')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'purple' },
  /*
  ** Global CSS
  */
  css: [

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-infinite-scroll.js', ssr: false },
    { src: '~/plugins/vue-infinite-loading.js', ssr: false },
    { src: '~/plugins/vuex-persist.js', ssr: false },
    { src: '~/plugins/geocoder.js', ssr: false },
    { src: '~/plugins/google-maps.js', ssr: false },
    { src: '~/plugins/lazyload.client.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'bootstrap-vue/nuxt',
    'nuxt-vuex-localstorage',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faUser', 'faShoppingCart', 'faTimes']
        }
      ],
    }],
    ['nuxt-google-maps-module', {
      key: 'AIzaSyAKCqAqiyop85LNl9qUb6OAT1lJupLEnzo'
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    API_HOST: process.env.API_HOST,
    progress: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    postcss: [
      autoprefixer()
    ],
    extend (config, { isDev, isClient, loaders: { vue } }) {
      // if (isClient) {
      //   vue.transformAssetUrls.img = ['data-src', 'src']
      //   vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      // }
    }
  },
  /**
   * Host configuration
   */
  server: {

  }
}
