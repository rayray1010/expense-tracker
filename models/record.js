const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  amount: {
    type: Number,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
  },
})

module.exports = mongoose.model('Record', recordSchema)
