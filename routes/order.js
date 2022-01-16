const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken')

// [GET ALL]
router.get('/', verifyTokenAndAdmin, OrderController.getAllOrders)

// [CREATE]
router.post('/add', verifyToken, OrderController.createOrder)

// [READ]
router.get('/find/:id', verifyTokenAndAuthorization, OrderController.getOrder)

// [UPDATE]
router.put('/:id', verifyTokenAndAdmin, OrderController.updateOrder)

// [DELETE]
router.delete('/:id', verifyTokenAndAdmin, OrderController.deleteOrder)

// [INCOME]
router.get('/income', verifyTokenAndAdmin, OrderController.getIncome)

module.exports = router
