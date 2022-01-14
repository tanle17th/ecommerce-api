const mongoose = require('mongoose')

module.exports.connect = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('DB Connection established!!!')
  } catch (error) {
    console.log('DB Connection failed!')
  }
}
