const User = require('../models/User')
const CryptoJS = require('crypto-js')

class AuthController {
  // [POST] /api/auth/register
  async registerUser(req, res, next) {
    const newUser = new User({
      username: req.body.username,
      // using AES standard and use PASS_SECRET_KEY from .env to encrypt:
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SECRET_KEY,
      ).toString(),
      email: req.body.email,
    })

    try {
      const addUser = await newUser.save()
      res.status(201).json(addUser)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // [POST] /api/auth/login
  async login(req, res, next) {
    try {
      // get user:
      const user = await User.findOne({ username: req.body.username })
      !user && res.status(401).json('No User found')

      // decrypt password: get from dtb ==> hashedPassword
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SECRET_KEY,
      )
      // toString() hashedPassword and encode incase password has
      // special characters
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

      // validate password:
      if (originalPassword === req.body.password) {
        // 1. NOT returning password to the user
        // 2. ...others get everything of a document
        // actual data is stored in "._doc"
        const { password, ...others } = user._doc
        res.status(200).json(others)
      } else {
        res.status(401).json('Wrong Password!')
      }
    } catch (err) {
      console.log('Cannot find User!')
    }
  }
}

module.exports = new AuthController()
