if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')

const seed = [
  {
    title: '家居物業',
    font: 'fas fa-home',
  },
  {
    title: '交通出行',
    font: 'fas fa-shuttle-van',
  },
  {
    title: '休閒娛樂',
    font: 'fas fa-grin-beam',
  },
  {
    title: '餐飲食品',
    font: 'fas fa-utensils',
  },
  {
    title: '其他',
    font: 'fas fa-pen',
  },
]

db.once('open', async () => {
  await Category.create(seed)
    .then(() => console.log('done'))
    .catch((err) => console.log(err))
  process.exit()
})
