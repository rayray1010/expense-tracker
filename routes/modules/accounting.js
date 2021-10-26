const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const moment = require('moment')

router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', async (req, res) => {
  const userID = req.user._id
  const { name, date, amount, title } = req.body
  const category = await Category.findOne({ title }).lean()
  const categoryID = category._id
  Record.create({ name, date, amount, categoryID, userID })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

router.get('/:id/edit', async (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  const records = await Record.findOne({ _id, userID })
    .populate('categoryID', 'title')
    .lean()
  records.date = moment(records.date).format('YYYY-MM-DD')
  res.render('edit', { record: records })
})

router.put('/:id', async (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  const { name, date, amount, title } = req.body
  const category = await Category.findOne({ title }).lean()
  const categoryID = category._id
  Record.findByIdAndUpdate(
    { _id, userID },
    { name, date, amount, categoryID }
  ).then(() => res.redirect('/'))
})

router.delete('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userID })
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
