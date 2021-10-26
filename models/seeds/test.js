if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')
const User = require('../user')
const Record = require('../record')

db.once('open', async () => {
  let { home, trans, play, food, els } = ''
  await Category.find().then((data) => {
    data.forEach((small) => {
      switch (small.title) {
        case '家居物業':
          home = small._id
          break
        case '交通出行':
          trans = small._id
          break
        case '休閒娛樂':
          play = small._id
          break
        case '餐飲食品':
          food = small._id
        case '其他':
          elt = small._id
      }
    })
  })
  console.log(home)
  Record.create({
    name: 'cool',
    date: Date.now(),
    amount: 200,
    categoryID: play,
  })
    .then(() => console.log('done'))
    .catch((err) => console.log(err))
})
