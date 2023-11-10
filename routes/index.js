const express = require('express')
const router = express.Router()
const movie = require('./booking') 
const account = require('./account')

router.use('/booking', movie)
router.use('/account', account)
router.use('/', movie)

module.exports = router