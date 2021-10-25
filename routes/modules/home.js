const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  sort = req.query
  if (Object.keys(sort).length !== 0 && sort.sort !== '.') {
    Category.findOne({ title: sort.sort }).then(async (data) => {
      let total = 0
      await Record.aggregate([
        { $match: { categoryID: data._id } },
        { $group: { _id: null, sum: { $sum: '$amount' } } },
      ]).then((sum) => {
        if (sum.length !== 0) {
          total = sum[0].sum
        }
      })
      Record.find({ categoryID: data._id })
        .lean()
        .then((record) =>
          res.render('index', { record, sort: sort.sort, total })
        )
    })
  } else {
    Record.find()
      .lean()
      .then(async (record) => {
        let total
        await Record.aggregate([
          { $group: { _id: null, sum: { $sum: '$amount' } } },
        ]).then((data) => {
          if (data.length !== 0) {
            total = data[0].sum
          }
        })
        res.render('index', { record, total })
      })
      .catch((err) => console.log(err))
  }
})

module.exports = router
