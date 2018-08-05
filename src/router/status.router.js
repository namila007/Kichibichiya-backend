const express = require('express')
const router = express.Router()
const statusController = require('../controller/statusController')

// add a status
router.post('/update', statusController.create)
// get users status timeline
router.get('/user_timeline', statusController.viewUserTL)
// get status
router.get('/show/:statusid', statusController.viewbyStatusID)
// delete status
router.post('/delete/:statusid', statusController.deletebyStatusID)

module.exports = router
