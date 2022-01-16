const express = require('express')
const router = express.Router()
const CartController = require('../controllers/CartController')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken')

// [GET ALL]
router.get('/', verifyTokenAndAdmin, CartController.getAllCarts)

// [CREATE]
router.post('/add', verifyToken, CartController.createCart)

// [READ]
router.get('/find/:id', verifyTokenAndAuthorization, CartController.getCart)

// [UPDATE]
router.put('/:id', verifyTokenAndAuthorization, CartController.updateCart)

// [DELETE]
router.delete('/:id', verifyTokenAndAuthorization, CartController.deleteCart)

module.exports = router
