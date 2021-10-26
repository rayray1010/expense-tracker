const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const moment = require('moment')

router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', async (req, res) => {
  const { name, date, amount, title } = req.body
  const category = await Category.findOne({ title }).lean()
  const categoryID = category._id
  console.log(categoryID)
  Record.create({ name, date, amount, categoryID })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const records = await Record.findOne({ _id })
    .populate('categoryID', 'title')
    .lean()
  records.date = moment(records.date).format('YYYY-MM-DD')
  res.render('edit', { record: records })
})

router.put('/:id', async (req, res) => {
  const _id = req.params.id
  const { name, date, amount, title } = req.body
  const category = await Category.findOne({ title }).lean()
  const categoryID = category._id
  Record.findByIdAndUpdate({ _id }, { name, date, amount, categoryID }).then(
    () => res.redirect('/')
  )
})

module.exports = router
