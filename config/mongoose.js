const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db is activated')
})

module.exports = db
