const db = require('../../config/mongoose')
const Category = require('../category')
const User = require('../user')
const Record = require('../record')

const User = [
  {
    name: 'foo',
    email: 'foo@foo.con',
    password: 'foo',
  },
  {
    name: 'root',
    email: 'root@root.com',
    password: 'root',
  },
]

const record = {}

db.once('open', () => {})
