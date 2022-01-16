const Order = require('../models/Order')

class OrderController {
  // [GET] /api/orders/
  getAllOrders = async (req, res, next) => {
    try {
      const orders = await Order.find()
      res.status(200).json(orders)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // [POST] /api/orders/add
  createOrder = async (req, res) => {
    const newOrder = new Order(req.body)

    try {
      const order = await newOrder.save()
      res.status(200).json(order)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // [GET] /api/orders/find/:id
  getOrder = async (req, res, next) => {
    try {
      const orders = await Order.find({ userId: req.params.id })
      res.status(200).json(orders)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // [PUT] /api/orders/:id
  updateOrder = async (req, res, next) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      )
      res.status(200).json(updatedOrder)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // [DELETE] /api/orders/:id
  deleteOrder = async (req, res, next) => {
    try {
      await Order.findByIdAndDelete(req.params.id)
      res.status(200).json('Order has been deleted...')
    } catch (err) {
      res.status(500).json(err)
    }
  }

  getIncome = async (req, res, next) => {
    const today = new Date()
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1))
    const previousMonth = new Date(today.setMonth(lastMonth.getMonth() - 1))

    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount',
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' },
          },
        },
      ])
      res.status(200).json(income)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = new OrderController()
