const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
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
      const records = await Record.find({ categoryID: data._id })
        .populate('categoryID', 'font')
        .lean()
      for (let record of records) {
        record.icon = record.categoryID.font
      }
      console.log(records)
      res.render('index', { record: records, total, sort: sort.sort })
    })
  } else {
    let total = 0
    const records = await Record.find().populate('categoryID', 'font').lean()
    for (let record of records) {
      record.icon = record.categoryID.font
      total += record.amount
    }
    res.render('index', { record: records, total })

    // Record.find()
    //   .lean()
    //   .then(async (record) => {
    //     let total
    //     await Record.aggregate([
    //       { $group: { _id: null, sum: { $sum: '$amount' } } },
    //     ]).then((data) => {
    //       if (data.length !== 0) {
    //         total = data[0].sum
    //       }
    //     })
    //     res.render('index', { record, total })
    //   })
    //   .catch((err) => console.log(err))
  }
})

module.exports = router
