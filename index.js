const express = require('express')
const app = express()
const port = 5000

// .env:
const dotenv = require('dotenv')
// add config plugin for dotenv
dotenv.config()

// import routes:
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const paymentRoute = require('./routes/payment')

// db:
const db = require('./config/db/index')
db.connect()

// [POST] approve json data:
app.use(express.json())

// main routes:
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/payment', paymentRoute)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
