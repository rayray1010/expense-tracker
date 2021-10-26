if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')
const User = require('../user')
const Record = require('../record')
const recordSeed = require('./seed.json').recordSeeds
const userSeed = [
  {
    name: 'foo',
    email: 'foo@foo.con',
    password: 'foo',
  },
]

const record = [
  {
    name: '宵夜',
    date: '2020-10-09',
    amount: 300,
  },
]

db.once('open', async () => {
  await Category.find()
    .then((category) => {
      category.map((data) => {
        recordSeed.forEach((recordItem) => {
          if (recordItem.title === data.title) {
            recordItem.categoryID = data._id
          }
        })
        return category
      })
    })
    .then(async (category) => {
      await User.create(userSeed).then((user) => {
        recordSeed.forEach((recordItem) => {
          recordItem.userID = user[0]._id
        })
      })
    })
    .then(() => {
      Record.create(recordSeed).then(() => console.log('done'))
    })
    .catch((err) => console.log('err'))
})
