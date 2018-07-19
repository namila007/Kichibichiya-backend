const express = require('express')
const router = express.Router()
const statusController = require('../controller/statusController')

// add a status
router.post('', statusController.create)

module.exports = router
