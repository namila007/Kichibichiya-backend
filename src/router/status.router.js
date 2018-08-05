const express = require('express')
const router = express.Router()
const statusController = require('../controller/statusController')
const statusOptionController = require('../controller/statusOptionController')

// add a status
router.post('/update', statusController.create)
// get users status timeline
router.get('/user_timeline', statusController.viewUserTL)
// get status
router.get('/show/:statusid', statusController.viewbyStatusID)
// delete status
router.post('/delete/:statusid', statusController.deletebyStatusID)
//  retweet a status
router.post('/retweet/:statusid', statusOptionController.retweet)
//  delete retweet a status
router.post('/unretweet/:statusid', statusOptionController.unretweet)
//  fav a status
router.post('/favourite/:statusid', statusOptionController.favourite)
//  delete fav a status
router.post('/unfavourite/:statusid', statusOptionController.unfavourite)

module.exports = router
