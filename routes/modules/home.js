const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  let totalAmount = 0
  const userID = req.user._id
  const filter = req.query.filter
  if (filter !== '.' && filter !== undefined) {
    const category = await Category.findOne({ title: filter }).lean()
    const categoryID = category._id
    const record = await Record.find({ userID, categoryID })
      .populate('categoryID', 'font')
      .lean()
    record.map((item) => {
      totalAmount += item.amount
      item.icon = item.categoryID.font
    })
    return res.render('index', { record, filter, totalAmount })
  }
  const record = await Record.find({ userID })
    .populate('categoryID', 'font')
    .lean()
  record.map((item) => {
    totalAmount += item.amount
    item.icon = item.categoryID.font
  })
  return res.render('index', { record, totalAmount })
})

module.exports = router
