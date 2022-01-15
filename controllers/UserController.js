const User = require('../models/User')
const { encryptPassword } = require('../utils/encrypt')

class UserController {
  // [GET] /api/users/
  getAllUsers = async (req, res, next) => {
    // if req.query.limit = <number>
    // return that <number> of latest users
    const query = req.query.latest

    try {
      const users = query
        ? // .sort({-1}) applies desc
          await User.find().sort({ _id: -1 }).limit(2)
        : await User.find()

      res.status(200).json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // [GET] /api/users/find/:id
  getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
      const { password, ...others } = user._doc

      res.status(200).json(others)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // [PUT] /api/users/:id
  updateUser = async (req, res, next) => {
    if (req.body.password) {
      req.body.password = encryptPassword(req.body.password)
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        // this is to send new updated data back to response:
        {
          $set: req.body,
        },
        { new: true },
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // [DELETE] /api/users/:id
  deleteUser = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('User Deleted!!!')
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // [GET] /api/users/stats
  getUserStats = async (req, res, next) => {
    const today = new Date()
    const todayLastYear = new Date(today.setFullYear(today.getFullYear() - 1))

    try {
      const data = await User.aggregate([
        // 1. users from last year to today:
        { $match: { createdAt: { $gte: todayLastYear } } },
        // 2. from (1), get month of all those users:
        {
          $project: {
            month: { $month: '$createdAt' },
          },
        },
        // 3. group $month from (2) with totalUsers
        { $group: { _id: '$month', totalUsers: { $sum: 1 } } },
      ])

      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new UserController()
