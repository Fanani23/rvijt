const express = require('express')
const router = express.Router()
const reviewRouter = require('./review')

router.use('/rv', reviewRouter)

module.exports = router
