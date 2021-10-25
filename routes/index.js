const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const accounts = require('./modules/accounting')

router.use('/accounts', accounts)
router.use('/', home)
module.exports = router
