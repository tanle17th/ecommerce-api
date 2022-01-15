const Product = require('../models/Product')
const { encryptPassword } = require('../utils/encrypt')

class ProductController {
  // [GET] /api/products/
  getAllProducts = async (req, res, next) => {
    const qLatest = req.query.latest
    const qCategories = req.query.categories

    try {
      let products

      if (qLatest) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1)
      } else if (qCategories) {
        products = await Product.find({
          categories: {
            $in: [qCategories],
          },
        })
      } else {
        products = await Product.find()
      }

      res.status(200).json(products)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // [POST] /api/products/add
  createProduct = async (req, res) => {
    const newProduct = new Product(req.body)

    try {
      const product = await newProduct.save()
      res.status(201).json(product)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // [GET] /api/products/find/:id
  getProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // [PUT] /api/products/:id
  updateProduct = async (req, res, next) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        // this is to send new updated data back to response:
        {
          $set: req.body,
        },
        { new: true },
      )
      res.status(200).json(updatedProduct)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // [DELETE] /api/products/:id
  deleteProduct = async (req, res, next) => {
    try {
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).json('Product Deleted!!!')
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new ProductController()
