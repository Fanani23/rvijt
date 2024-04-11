const express = require('express')
const router = express.Router()
const { reviewController } = require('../controllers/review')

router.post('/', reviewController.post)
router.get('/', reviewController.get)
router.get('/:id', reviewController.getByID)
router.put('/:id', reviewController.put)
router.delete('/:id', reviewController.delete)

module.exports = router
