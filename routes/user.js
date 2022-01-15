const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken')

// [GET ALL]
router.get('/', verifyTokenAndAdmin, UserController.getAllUsers)

// [READ]
router.get('/find/:id', verifyTokenAndAdmin, UserController.getUser)

// [UPDATE]
router.put('/:id', verifyTokenAndAuthorization, UserController.updateUser)

// [DELETE]
router.delete('/:id', verifyTokenAndAuthorization, UserController.deleteUser)

// [GET USER STATS]
router.get('/stats', verifyTokenAndAdmin, UserController.getUserStats)

module.exports = router
