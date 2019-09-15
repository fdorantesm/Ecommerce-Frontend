<template>
  <div class="container">
    <script src="https://cdn.conekta.io/js/latest/conekta.js"></script>
    <div>
      <b-row class="p10">
        <ul class="list-reset list-inline breadcrumbs">
          <li><nuxt-link to="/cart">Carrito</nuxt-link></li>
          <li><nuxt-link to="/cart/checkout">Información</nuxt-link></li>
          <li><nuxt-link to="/cart/checkout/shipping">Envío</nuxt-link></li>
          <li><nuxt-link to="/cart/checkout/payment">Pago</nuxt-link></li>
        </ul>
      </b-row>
      <section>
        <form @submit.prevent="createOrder">
          <b-row>
            <b-col md="6" lg="5" order-lg="2" order-md="2">
              <CartSummary :cart="cart"/>
              <b-form-group>
                <b-row class="jcsb">
                  <b-col>
                    <b-input v-model="coupon" placeholder="Código de descuento" />
                  </b-col>
                  <b-col md="auto" sm="auto" xs="12">
                    <b-button type="button" variant="info">Aplicar</b-button>
                  </b-col>
                </b-row>
              </b-form-group>
              <b-form-group>
                <b-row>
                  <table class="table table-collapsed">
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td class="text-right">$ {{Number(cart.total).toFixed(2)}} MXN</td>
                      </tr>
                      <tr v-if="discount > 0">
                        <td>Descuento</td>
                        <td class="text-right">$ {{Number(discount).toFixed(2)}} MXN</td>
                      </tr>
                      <tr>
                        <td>Envío</td>
                        <td class="text-right">$ {{Number(shipping).toFixed(2)}} MXN</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td class="text-right">$ {{Number(cart.total - discount + shipping).toFixed(2)}} MXN</td>
                      </tr>
                    </tbody>
                  </table>
                </b-row>
              </b-form-group>
              <b-form-group class="d-none d-sm-none d-md-block">
                <b-button block size="lg" type="submit" variant="primary" :disabled="!readyForPay">Pagar</b-button>
              </b-form-group>
            </b-col>
            <b-col md="6" lg="7" class=" p20" v-if="section === 'shipping'">
              <p>
                Si nos proporcionas tu ubicación, completaremos los datos por tí. Tambien puedes buscar tu dirección en el mapa.
              </p>
              <b-form-group>
                <div class="gmap">
                  <gmap-autocomplete @place_changed="placeChanged" class="gmap__autocomplete" :value="searchbox"/>
                  <gmap-map :center="{lat: center[0], lng: center[1]}" :zoom="mapOptions.zoom" style="width: 100%; height: 300px" @dblclick="updateMarker" :options="mapOptions">
                    <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :draggable="true" @dragend="onDrag"/>
                  </gmap-map>
                </div>
              </b-form-group>
              <b-form-group>
                <h5>Dirección de envío</h5>
                <b-form-input v-model="to_address_line1" type="text" placeholder="Calle y número" />
                <b-form-input v-model="to_address_line2" type="text" placeholder="Número interior, piso, oficina" />
                <b-form-input v-model="to_address_line3" type="text" placeholder="Colonia, Fraccionamiento o barrio" />
                <b-form-input v-model="to_address_between_streets" type="text" placeholder="Entre calles" />
                <b-form-input v-model="to_address_references" type="text" placeholder="Referencias" />
                <b-form-input v-model="to_address_city" type="text" placeholder="Ciudad" />
                <b-form-input v-model="to_address_state" type="text" placeholder="Estado" />
                <b-form-input v-model="to_address_country" type="text" placeholder="País" />
                <b-form-input v-model="to_address_zip" type="text" placeholder="CP" />
              </b-form-group>
              <b-form-group>
                <h5>Información del receptor</h5>
                <b-form-input v-model="to_receiver_name" type="text" placeholder="Nombre del receptor" />
                <b-form-input v-model="to_receiver_phone" type="text" placeholder="Teléfono del receptor" />
              </b-form-group>
              <b-form-group>
                <div>
                  <b-form-checkbox v-model="gift" type="checkbox"> Es un regalo</b-form-checkbox>
                </div>
                <div>
                  <b-form-checkbox v-model="bill" type="checkbox"> Deseo factura</b-form-checkbox>
                </div>
              </b-form-group>
              <b-form-group>
                <b-button variant="outline-primary" @click.prevent="changeSection('payment')">Información de pago</b-button>
              </b-form-group>
            </b-col>
            <b-col  md="6" lg="7" order-lg-="1" order-md="1" v-if="section === 'payment'">
              <b-form-group label="Enviar a:">
                <ul class="list-reset list--boxed">
                  <li v-if="to_receiver_name">
                    <fa icon="user"/> {{to_receiver_name}}
                  </li>
                  <li v-if="to_address_line1">
                    <fa icon="home"/> {{to_address_line1}}
                  </li>
                </ul>
              </b-form-group>
              <h5>Selecciona el método de pago</h5>
              <b-form-group>
                <b-form-radio v-model="paymentMethod" type="radio" name="paymentMethod" @change="changePaymentMethod" value="oxxo" :checked="checkout.payment.method === 'oxxo'">Oxxo</b-form-radio>
                <b-form-radio v-model="paymentMethod" type="radio" name="paymentMethod" @change="changePaymentMethod" value="spei" :checked="checkout.payment.method === 'spei'">Spei</b-form-radio>
                <b-form-radio v-model="paymentMethod" type="radio" name="paymentMethod" @change="changePaymentMethod" value="card" :checked="checkout.payment.method === 'card'">Card</b-form-radio>
              </b-form-group>
              <div v-if="paymentMethod === 'oxxo'">
                Al finalizar la orden te proporcionaremos un recibo, puedes imprimirlo o presentar el número del código de barras al cajero de tu oxxo favorito.
              </div>
              <div v-if="paymentMethod === 'spei'">
                Al finalizar la orden te proporcionaremos los datos de la cuenta bancaria a la que podrás realizarle la transferecia.
              </div>
              <div v-if="paymentMethod === 'card'" class="pt25 pb25">
                <b-form-group>
                  <input v-model="card.name" type="text" placeholder="Nombre completo">
                </b-form-group>
                <b-form-group>
                  <input v-model="card.number" @keypress="getBrand" type="text" placeholder="Nùmero de la tarjeta">
                </b-form-group>
                <b-form-group>
                  <input v-model="card.exp_month" type="text" placeholder="Mes">
                  <input v-model="card.exp_year" type="text" placeholder="Año">
                  <input v-model="card.cvc" type="text" placeholder="CVC">
                </b-form-group>
              </div>
              <b-form-group>
                <b-button type="button" variant="outline-primary" @click="section='shipping'">Información de envío</b-button>
              </b-form-group>
              <b-form-group class="d-md-none d-lg-none d-xl-none">
                <b-button block size="lg" type="submit" variant="primary" :disabled="!readyForPay">Pagar</b-button>
              </b-form-group>
            </b-col>
          </b-row>
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
import pickBy from 'lodash/pickBy'

export default {
  layout: 'minimal',
  async mounted() {
    try {
      console.log(this.paymentMethod, this.checkout.payment.method)
      this.paymentMethod = this.checkout.payment.method
      if (this.checkout.card.number) {
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
      section: 'shipping',
      to_latitude: null,
      to_longitude: null,
      to_address_line1: null,
      to_address_line2: null,
      to_address_line3: null,
      to_address_references: null,
      to_address_between_streets: null,
      to_address_city: null,
      to_address_state: null,
      to_address_country: null,
      to_address_country_iso: null,
      to_address_zip: null,
      to_receiver_name: null,
      to_receiver_phone: null,
      to_receiver_name: 'Fernando D',
      to_receiver_phone: '+524771179504',
      gift: false,
      bill: false,
      token: null,
      coupon: 'Welcome',
      discount: 150,
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
      shipping: 150,
      brand: null,
      card: {
        number: "4242424242424242",
        name: "Fernando D",
        exp_year: "2026",
        exp_month: "12",
        cvc: "123"
      },
      readyForPay: true,
      paymentMethod: 'oxxo'
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
    changePaymentMethod (method) {
      this.updatePaymentMethod(method)
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

        if (this.checkout.payment.method === 'card') {
          this.token = await this.createToken({
            card: {
              number: this.card.number,
              name: this.card.name,
              exp_year: this.card.exp_year,
              exp_month: this.card.exp_month,
              cvc: this.card.cvc
            }
          })
          data.token = this.token
        }

        let response = await OrderService.orderNow({ ...pickBy(data) })
        this.$router.push(`/order/${response.data.order._id}`)

      } catch (err) {
        console.log(err)
        if (err.response) {
          alert(err.response.data.message)
        }
      }
    },
    changeSection(section) {
      this.section = section
      return false
    }
  }
}
</script>
