import axios from 'axios'

/* eslint-disable prefer-promise-reject-errors */
export function getCurrentLocation () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      } else {
        reject({
          lat: -100,
          lng: -20
        })
      }
    })
  })
}

export function placeToAddress (place) {
  const currentAddress = {}
  currentAddress.formatted_address = place.formatted_address

  if (typeof place.geometry.location.lat === 'function' && typeof place.geometry.location.lng === 'function') {
    currentAddress.lat = place.geometry.location.lat()
    currentAddress.lng = place.geometry.location.lng()
  } else {
    currentAddress.lat = place.geometry.location.lat
    currentAddress.lng = place.geometry.location.lng
  }

  currentAddress.street = null
  currentAddress.ext_number = null
  currentAddress.cp = null
  place.address_components.map((component) => {
    if (Array.isArray(component.types)) {
      component.types.map((type) => {
        if (type === 'route') {
          currentAddress.street = component.long_name || ''
        }
        if (type === 'street_number') {
          currentAddress.ext_number = component.long_name
        }
        if (type === 'sublocality' || type === 'neighborhood') {
          currentAddress.neighborhood = component.long_name
        }
        if (type === 'postal_code') {
          currentAddress.cp = component.long_name
        }
        if (type === 'administrative_area_level_1') {
          currentAddress.state_string = component.long_name
        }
        if (type === 'country') {
          currentAddress.country_iso = component.short_name
        }
      })
    }
  })

  return currentAddress
}

export function getZipInfo (cp) {
  return axios.get(`https://api-codigos-postales.herokuapp.com/v2/codigo_postal/${cp}`)
}
