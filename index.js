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

// db:
const db = require('./config/db/index')
db.connect()

// [POST] approve json data:
app.use(express.json())

// main routes:
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
