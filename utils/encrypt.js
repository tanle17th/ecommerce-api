const CryptoJS = require('crypto-js')

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASS_SECRET_KEY).toString()
}

module.exports = { encryptPassword }
