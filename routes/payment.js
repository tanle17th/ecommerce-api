const router = require('express').Router()
const paymentController = require('../controllers/PaymentController')

router.post('/', paymentController.charge)

module.exports = router
