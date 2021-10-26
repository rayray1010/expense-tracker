if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')
const User = require('../user')
const Record = require('../record')
const recordSeed = require('./seed.json').recordSeeds
const bcrypt = require('bcryptjs')
const userSeed = [
  {
    name: 'foo',
    email: 'foo@foo.com',
    password: 'foo',
  },
]

db.once('open', async () => {
  await bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(userSeed[0].password, salt))
    .then(
      async (hash) =>
        await User.create({
          name: userSeed[0].name,
          email: userSeed[0].email,
          password: hash,
        })
    )
    .then(async (user) => {
      userID = user._id
      await Promise.all(
        Array.from(recordSeed, async (record) => {
          const category = await Category.findOne({
            title: record.title,
          }).lean()
          const categoryId = category._id
          record.userID = userID
          record.categoryID = categoryId
        })
      )
      await Record.create(recordSeed)
    })
    .then(() => console.log('done'))
    .catch((err) => console.log(err))
  process.exit()
})
