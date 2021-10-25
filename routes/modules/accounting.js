const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', (req, res) => {
  const { name, date, amount, title } = req.body
  Category.findOne({
    title,
  })
    .then((data) => {
      return Record.create({
        name,
        date,
        amount,
        categoryID: data._id,
      })
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
