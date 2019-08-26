<template>
  <div class="container">
    <script src="https://cdn.conekta.io/js/latest/conekta.js"></script>
    <div>
      <section>
        <form @submit.prevent="createOrder">
          <div class="row">
            <div class="col-md-5 col-md-push-7 col-xs-12">
              <CartSummary :cart="cart" />
            </div>
            <div class="col-md-7 col-md-pull-5 col-xs-12 p20">
              <tabs :options="{ useUrlFragment: true }" class="mb20">
                <tab name="Envío">
                  <!-- <DeliveryForm @localized="getAddress" /> -->
                  <p>
                    Si nos proporcionas tu ubicación, completaremos los datos por tí. Tambien puedes buscar tu dirección en el mapa.
                  </p>
                  <div class="gmap">
                    <h5>Buscador</h5>
                    <gmap-autocomplete @place_changed="placeChanged" class="gmap__autocomplete" :value="searchbox"/>
                    <gmap-map :center="{lat: center[0], lng: center[1]}" :zoom="mapOptions.zoom" style="width: 100%; height: 300px" @dblclick="updateMarker" :options="mapOptions">
                      <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :draggable="true" @dragend="onDrag"/>
                    </gmap-map>
                  </div>
                  <h5>Dirección de envío</h5>
                  <input v-model="to_address_line1" type="text" placeholder="Calle y número">
                  <input v-model="to_address_line2" type="text" placeholder="Número interior, piso, oficina">
                  <input v-model="to_address_line3" type="text" placeholder="Colonia, Fraccionamiento o barrio">
                  <input v-model="to_address_between_streets" type="text" placeholder="Entre calles">
                  <input v-model="to_address_references" type="text" placeholder="Referencias">
                  <input v-model="to_address_city" type="text" placeholder="Ciudad">
                  <input v-model="to_address_state" type="text" placeholder="Estado">
                  <input v-model="to_address_country" type="text" placeholder="País">
                  <input v-model="to_address_zip" type="text" placeholder="CP">
                  <hr class="divider">
                  <h5>Información del receptor</h5>
                  <input v-model="to_receiver_name" type="text" placeholder="Nombre del receptor">
                  <input v-model="to_receiver_phone" type="text" placeholder="Teléfono del receptor">
                </tab>
                <tab name="Pago">
                  <h5>Selecciona el método de pago</h5>
                  <label>
                    <input type="radio" name="paymentMethod" @change="changePaymentMethod" value="oxxo" :checked="checkout.payment.method === 'oxxo'">
                    <span>Oxxo</span>
                  </label>
                  <label>
                    <input type="radio" name="paymentMethod" @change="changePaymentMethod" value="spei" :checked="checkout.payment.method === 'spei'">
                    <span>SPEI</span>
                  </label>
                  <label>
                    <input type="radio" name="paymentMethod" @change="changePaymentMethod" value="card" :checked="checkout.payment.method === 'card'">
                    <span>Tarjeta</span>
                  </label>
                  <div v-if="checkout.payment.method === 'oxxo'">
                    Al finalizar la orden te proporcionaremos un recibo, puedes imprimirlo o presentar el número del código de barras al cajero de tu oxxo favorito.
                  </div>
                  <div v-if="checkout.payment.method === 'spei'">
                    Al finalizar la orden te proporcionaremos los datos de la cuenta bancaria a la que podrás realizarle la transferecia.
                  </div>
                  <div v-if="checkout.payment.method === 'card'" class="pt25 pb25">
                    <!-- <PaymentForm @tokenize="getToken" @card="saveCard" @error="tokenError" :defaults="this.checkout.card"/> -->
                    <div class="input-group">
                      <input v-model="card.name" type="text" placeholder="Nombre completo">
                    </div>
                    <div class="input-group">
                      <input v-model="card.number" @keypress="getBrand" type="text" placeholder="Nùmero de la tarjeta">
                    </div>
                    <div class="input-group">
                      <input v-model="card.exp_month" type="text" placeholder="Mes">
                      <input v-model="card.exp_year" type="text" placeholder="Año">
                      <input v-model="card.cvc" type="text" placeholder="CVC">
                    </div>
                  </div>
                  <button class="btn fw mt20" type="submit">
                    Pagar
                  </button>
                </tab>
              </tabs>
              <div>
                <label>
                  <input v-model="gift" type="checkbox"> Es un regalo
                </label>
                <label>
                  <input v-model="bill" type="checkbox"> Deseo factura
                </label>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CartSummary from '~/components/CartSummary'
import PaymentForm from '~/components/PaymentForm'
import DeliveryForm from '~/components/DeliveryForm'
import { Tabs, Tab } from 'vue-tabs-component'
import { getCurrentLocation, placeToAddress, getZipInfo} from '~/helpers/google'
import ConektaService from '~/services/ConektaService'
import OrderService from '~/services/OrderService'

export default {
  async mounted() {
    try {
      if (this.checkout.card) {
        this.card = this.checkout.card
      }
      const coords = await getCurrentLocation()
      console.log({coords})
      this.to_latitude = coords.lat
      this.to_longitude = coords.lng
      this.center = [this.to_latitude, this.to_longitude]
  
      this.setCurrentPlace(coords.lat, coords.lng)
      this.markers[0] = {
        position: {
          lat: this.to_latitude,
          lng: this.to_longitude
        }
      }
    } catch (err) {
      this.to_latitude = 0
      this.to_longitude = 0
      this.center = [0, 0]
      this.setCurrentPlace(coords.lat, coords.lng)
      this.markers[0] = {
        position: {
          lat: 0,
          lng: 0
        }
      }
    }
  },
  components: {
    CartSummary,
    PaymentForm,
    DeliveryForm,
    Tabs,
    Tab
  },
  data() {
    return {
      to_latitude: '',
      to_longitude: '',
      to_address_line1: '',
      to_address_line2: '',
      to_address_line3: '',
      to_address_references: '',
      to_address_between_streets: '',
      to_address_city: '',
      to_address_state: '',
      to_address_country: '',
      to_address_country_iso: '',
      to_address_zip: '',
      to_receiver_name: '',
      to_receiver_phone: '',
      to_receiver_name: '',
      to_receiver_phone: '',
      gift: false,
      bill: false,
      token: null,
      coupon: '',
      error: null,
      center: [0, 0],
      markers: [{
        position: {
          lat: 0,
          lng: 0
        }
      }],
      searchbox: null,
      mapOptions: {
        disableDoubleClickZoom: true,
        zoom: 17
      },
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
  computed: {
    ...mapState(['cart', 'checkout'])
  },
  methods: {
    ...mapActions({
      setToken: 'checkout/setToken',
      setCard: 'checkout/setCard',
      updatePaymentMethod: 'checkout/updatePaymentMethod'
    }),
    saveCard (card) {
      this.setCard(card)
    },
    changePaymentMethod (e) {
      this.updatePaymentMethod(e.target.value)
    },
    // getAddress (data) {
    //   this.to_latitude = data.latitude
    //   this.to_longitude = data.longitude
    //   this.to_address_line1 = data.address_line1
    //   this.to_address_line2 = data.address_line2
    //   this.to_address_line3 = data.address_line3
    //   this.to_address_references = data.address_references
    //   this.to_address_between_streets = data.address_between_streets
    //   this.to_address_city = data.address_city
    //   this.to_address_state = data.address_state
    //   this.to_address_country = data.address_country
    //   this.to_address_zip = data.address_zip
    // },
    placeChanged: function (place) {
      this.searchbox = place.formatted_address
      const currentAddress = placeToAddress(place)
      this.to_address_line1 = `${currentAddress.street} ${currentAddress.ext_number}`
      this.to_address_line3 = currentAddress.neighborhood
      this.to_address_zip = currentAddress.cp
      this.to_latitude = currentAddress.lat
      this.to_longitude = currentAddress.lng
      this.center = [this.to_latitude, this.to_longitude]
      this.markers[0] = {
        position: {
          lat: this.to_latitude,
          lng: this.to_longitude
        }
      }
    },
    updateMarker(e) {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      this.markers[0] = {
        position: {
          lat,
          lng
        }
      }
      this.to_latitude = lat
      this.to_longitude = lng
      // this.center = [lat, lng]
      this.mapOptions.zoom = 17
      this.setCurrentPlace(lat, lng)
      return false
    },
    async setCurrentPlace(lat, lng) {
      this.$geocoder.setDefaultMode('lat-lng')
      this.$geocoder.send({lat, lng},
        async (response) => {
          const currentAddress = placeToAddress(response.results[0])
          this.to_address_country_iso = currentAddress.country_iso
          this.searchbox = currentAddress.formatted_address
          this.to_address_line1 = `${currentAddress.street} ${currentAddress.ext_number}`
          this.to_address_line3 = currentAddress.neighborhood
          this.to_address_state = currentAddress.state_string
          this.to_address_zip = currentAddress.cp
          this.to_latitude = currentAddress.lat
          this.to_longitude = currentAddress.lng
          if (currentAddress.cp && currentAddress.country_iso === 'MX') {
            const sepomex = await getZipInfo(currentAddress.cp)
            this.to_address_city = sepomex.data.municipio
            this.to_address_state = sepomex.data.estado
          } else {
            this.to_address_city = null
            this.to_address_state = null
          }
        }
      );
    },
    onDrag: async function(position) {
      this.setCurrentPlace(position.latLng.lat(), position.latLng.lng())
    },
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
      } catch (err) {
        console.log(err)
      }
    },
    getBrand(e) {
      console.log(e)
      this.brand = ConektaService.getBrand(e.target.value)
    },
    async createOrder () {
      try {
        const data = {
          cart_key: this.cart.key,
          method: this.checkout.payment.method,
          to_latitude: this.to_latitude,
          to_longitude: this.to_longitude,
          to_address_line1: this.to_address_line1,
          to_address_line2: this.to_address_line2,
          to_address_line3: this.to_address_line3,
          to_address_references: this.to_address_references,
          to_address_between_streets: this.to_address_between_streets,
          to_address_city: this.to_address_city,
          to_address_state: this.to_address_state,
          to_address_country: this.to_address_country_iso,
          to_address_zip: this.to_address_zip,
          to_receiver_name: this.to_receiver_name,
          to_receiver_phone: this.to_receiver_phone,
          gift: this.gift,
          bill: this.bill,
          coupon: this.coupon
        }
        const token = await this.createToken({
          card: {
            number: this.card.number,
            name: this.card.name,
            exp_year: this.card.exp_year,
            exp_month: this.card.exp_month,
            cvc: this.card.cvc
          }
        })

        order = await OrderService.orderNow({ ...data, token })

        console.log(order)

      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
