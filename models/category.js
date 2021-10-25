const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  font: {
    type: String,
  },
})

module.exports = mongoose.model('Category', categorySchema)
