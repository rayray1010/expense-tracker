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

// db.once('open', async () => {
//   await Category.find()
//     .then((category) => {
//       category.map((data) => {
//         recordSeed.forEach((recordItem) => {
//           if (recordItem.title === data.title) {
//             recordItem.categoryID = data._id
//           }
//         })
//         return category
//       })
//     })
//     .then(async (category) => {
//       await User.create(userSeed).then((user) => {
//         recordSeed.forEach((recordItem) => {
//           recordItem.userID = user[0]._id
//         })
//       })

//     })
//     .then(() => {
//       Record.create(recordSeed).then(() => console.log('done'))
//     })
//     .catch((err) => console.log('err'))
// })

db.once('open', async () => {
  bcrypt
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
      Record.create(recordSeed)
    })
    .then(() => console.log('done'))
    .catch((err) => console.log(err))
})
