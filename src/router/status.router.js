const express = require('express')
const router = express.Router()
const statusController = require('../controller/statusController')
const statusOptionController = require('../controller/statusOptionController')
const isPassportvalid = require('../services/isPassportValid')
const favouriteController = require('../controller/favouriteController')
// add a status
router.post('/update', isPassportvalid, statusController.create)
// get users status timeline
router.get('/user_timeline', statusController.viewUserTL)
// get status
router.get('/show/:statusid', statusController.viewbyStatusID)
// delete status
router.post('/delete/:statusid', isPassportvalid, statusController.deletebyStatusID)
//  retweet a status
router.post('/retweet/:statusid', isPassportvalid, statusOptionController.retweet)
//  delete retweet a status
router.post('/unretweet/:statusid', isPassportvalid, statusOptionController.unretweet)
//  fav a status
router.post('/favourite/create', isPassportvalid, favouriteController.create)
//  delete fav a status
router.post('/favourite/destroy', isPassportvalid, favouriteController.destroy)

module.exports = router
