const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const { encryptPassword } = require('../utils/encrypt')

class AuthController {
  // [POST] /api/auth/register
  registerUser = async (req, res, next) => {
    const newUser = new User({
      username: req.body.username,
      // using AES standard and use PASS_SECRET_KEY from .env to encrypt:
      password: encryptPassword(req.body.password),
      email: req.body.email,
    })

    try {
      const user = await newUser.save()
      res.status(201).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // [POST] /api/auth/login
  login = async (req, res, next) => {
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
        // ...others is Rest Parameters
        // Rest Parameters = destructuring + spread operator
        const { password, ...others } = user._doc

        // after logging in successfully,
        // user receives an accessToken that expiresIn 1d
        // user will use this token to authorize against
        // all sub sequence activities with the app
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1d' },
        )
        // ...others is Spread Operator
        res.status(200).json({ ...others, accessToken })
      } else {
        res.status(401).json('Wrong Password!')
      }
    } catch (err) {
      console.log('Cannot find User!')
    }
  }
}

module.exports = new AuthController()
