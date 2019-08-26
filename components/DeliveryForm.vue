<template>
  <div>
    <form>
      <p>
        Si nos proporcionas tu ubicación, completaremos los datos por tí. Tambien puedes buscar tu dirección en el mapa.
      </p>
      <div class="gmap">
        <h5>Buscador</h5>
        <gmap-autocomplete @place_changed="placeChanged" class="gmap__autocomplete" :value="searchbox"/>
        <gmap-map :center="{lat: latitude, lng: longitude}" :zoom="mapOptions.zoom" style="width: 100%; height: 300px" @dblclick="updateMarker" :options="mapOptions">
          <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :draggable="true" @dragend="onDrag"/>
        </gmap-map>
      </div>
      <h5>Dirección de envío</h5>
      <input v-model="address_line1" type="text" placeholder="Calle y número">
      <input v-model="address_line2" type="text" placeholder="Número interior, piso, oficina">
      <input v-model="address_line3" type="text" placeholder="Colonia, Fraccionamiento o barrio">
      <input v-model="address_between_streets" type="text" placeholder="Entre calles">
      <input v-model="address_references" type="text" placeholder="Referencias">
      <input v-model="address_city" type="text" placeholder="Ciudad">
      <input v-model="address_state" type="text" placeholder="Estado">
      <input v-model="address_country" type="text" placeholder="País">
      <input v-model="address_zip" type="text" placeholder="CP">
    </form>
  </div>
</template>

<script>
import { getCurrentLocation, placeToAddress, getZipInfo} from '~/helpers/google'

export default {
  data () {
    return {
      address_line1: '',
      address_line2: '',
      address_line3: '',
      address_references: '',
      address_between_streets: '',
      address_city: '',
      address_state: '',
      address_country: '',
      address_country_iso: '',
      address_zip: '',
      latitude: 0,
      longitude: 0,
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
      }

    }
  },
  async mounted () {
    try {
      const coords = await getCurrentLocation()
      console.log({coords})
      this.latitude = coords.lat
      this.longitude = coords.lng
      this.center = [this.latitude, this.longitude]
  
      this.setCurrentPlace(coords.lat, coords.lng)
      this.markers[0] = {
        position: {
          lat: this.latitude,
          lng: this.longitude
        }
      }
    } catch (err) {
      this.latitude = 0
      this.longitude = 0
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
  methods: {
    placeChanged: function (place) {
				this.searchbox = place.formatted_address

				const currentAddress = placeToAddress(place)

				this.address_line1 = `${currentAddress.street} ${currentAddress.ext_number}`
				this.address_line3 = currentAddress.neighborhood
				this.address_zip = currentAddress.cp
				this.latitude = currentAddress.lat
				this.longitude = currentAddress.lng

				this.markers[0].position.lat = this.latitude
				this.markers[0].position.lng = this.longitude
			},

			updateMarker(e) {
				const lat = e.latLng.lat()
				const lng = e.latLng.lng()
				this.markers[0].position.lat = lat
				this.markers[0].position.lng = lng
				this.mapOptions.zoom = 17
				this.setCurrentPlace(lat, lng)
				return false
			},
    async setCurrentPlace(lat, lng) {
				this.$geocoder.setDefaultMode('lat-lng')
				this.$geocoder.send({lat, lng},
					async (response) => {
						const currentAddress = placeToAddress(response.results[0])
            console.log({currentAddress})
            this.address_country_iso = currentAddress.country_iso
						this.searchbox = currentAddress.formatted_address
						this.address_line1 = `${currentAddress.street} ${currentAddress.ext_number}`
            this.address_line3 = currentAddress.neighborhood
            this.address_state = currentAddress.state_string
						this.address_zip = currentAddress.cp
						this.latitude = currentAddress.lat
						this.longitude = currentAddress.lng
						this.markers[0].position.lat = lat
            this.markers[0].position.lng = lng
            if (currentAddress.cp && currentAddress.country_iso === 'MX') {
              const sepomex = await getZipInfo(currentAddress.cp)
              this.address_city = sepomex.data.municipio
              this.address_state = sepomex.data.estado
            } else {
              this.address_city = null
              this.address_state = null
            }
            this.emitAddress()
					}
				);
			},
			onDrag: async function(position) {
				this.setCurrentPlace(position.latLng.lat(), position.latLng.lng())
      },
      emitAddress () {
        console.log({
          address_line1: this.address_line1,
          address_line2: this.address_line2,
          address_line3: this.address_line3,
          address_references: this.address_references,
          address_between_streets: this.address_between_streets,
          address_city: this.address_city,
          address_state: this.address_state,
          address_country: this.address_country,
          address_country_iso: this.address_country_iso,
          address_zip: this.address_zip,
          latitude: this.latitude,
          longitude: this.longitude
        })
        this.$emit('localized', {
          address_line1: this.address_line1,
          address_line2: this.address_line2,
          address_line3: this.address_line3,
          address_references: this.address_references,
          address_between_streets: this.address_between_streets,
          address_city: this.address_city,
          address_state: this.address_state,
          address_country: this.address_country,
          address_country_iso: this.address_country_iso,
          address_zip: this.address_zip,
          latitude: this.latitude,
          longitude: this.longitude
        })
      }
  }
}
</script>
