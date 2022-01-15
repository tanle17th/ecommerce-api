const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken')

// [GET ALL]
router.get('/', verifyTokenAndAdmin, ProductController.getAllProducts)

// [CREATE]
router.post('/add', verifyTokenAndAdmin, ProductController.createProduct)

// [READ]
router.get('/find/:id', verifyTokenAndAdmin, ProductController.getProduct)

// [UPDATE]
router.put('/:id', verifyTokenAndAdmin, ProductController.updateProduct)

// [DELETE]
router.delete('/:id', verifyTokenAndAdmin, ProductController.deleteProduct)

module.exports = router
