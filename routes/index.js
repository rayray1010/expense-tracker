const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const accounts = require('./modules/accounting')
const { authenticator } = require('../middleware/auth')
const user = require('./modules/user')

router.use('/user', user)
router.use('/accounts', authenticator, accounts)
router.use('/', authenticator, home)

module.exports = router
