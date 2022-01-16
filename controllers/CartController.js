const Cart = require('../models/Cart')

class CartController {
  // [GET] /api/carts/
  getAllCarts = async (req, res, next) => {
    try {
      const carts = await Cart.find()
      res.status(200).json(carts)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // [POST] /api/carts/add
  createCart = async (req, res) => {
    const newCart = new Cart(req.body)

    try {
      const cart = await newCart.save()
      res.status(200).json(cart)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // [GET] /api/carts/find/:id
  getCart = async (req, res, next) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.id })
      res.status(200).json(cart)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // [PUT] /api/carts/:id (userId)
  updateCart = async (req, res, next) => {
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.params.id },
        {
          $set: req.body,
        },
        { new: true },
      )
      res.status(200).json(updatedCart)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // [DELETE] /api/carts/:id (userId)
  deleteCart = async (req, res, next) => {
    try {
      await Cart.findOneAndDelete({ userId: req.params.id })
      res.status(200).json('Cart has been deleted...')
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = new CartController()
