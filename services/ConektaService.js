if (process.client) {
  if (window.Conekta) {
    window.Conekta.setPublicKey('key_AVyNyZZdY5AsiEEvhpm5crA')
  }
}

export default class ConektaService {
  static createToken (tokenParams) {
    const response = new Promise((resolve, reject) => {
      if (!window.Conekta.card.validateNumber(tokenParams.card.number)) {
        reject(new Error('InvalidNumberCardException'))
      }
      if (!window.Conekta.card.validateExpirationDate(tokenParams.card.exp_month, tokenParams.card.exp_year)) {
        reject(new Error('InvalidExpirationDateException'))
      }
      if (!window.Conekta.card.validateExpirationDate(tokenParams.card.exp_month, tokenParams.card.exp_year)) {
        reject(new Error('InvalidExpirationDateException'))
      }
      if (!window.Conekta.card.validateCVC(tokenParams.card.cvc)) {
        reject(new Error('InvalidCVCFormatException'))
      }
      window.Conekta.Token.create(tokenParams, resolve, reject)
    })
    return response.then(token => Promise.resolve(token.id))
  }
  static getBrand (number) {
    return window.Conekta.card.getBrand(number)
  }
}
