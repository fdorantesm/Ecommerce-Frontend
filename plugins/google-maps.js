import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAKCqAqiyop85LNl9qUb6OAT1lJupLEnzo',
    libraries: 'geometry,drawing,places'
  }
})
