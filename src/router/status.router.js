const express = require('express')
const router = express.Router()
const statusController = require('../controller/statusController')
const statusOptionController = require('../controller/statusOptionController')
const isPassportvalid = require('../services/isPassportValid')
const publicStatus = require('../services/publicStatus')
const favouriteController = require('../controller/favouriteController')

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: Status management
 */

/**
 * @swagger
 * path:
 *  /update/:
 *  post:
 *    summary: adding a new tweet
 * tags: [Status]
 * responses:
 *       200:
 *         description: hello world
 */
router.post('/update', isPassportvalid, statusController.create)
// get users status timeline
router.get('/user_timeline', publicStatus, statusController.viewUserTL)
// get status
router.get('/show/:statusid', publicStatus, statusController.viewbyStatusID)
// delete status
router.delete('/delete/:statusid', isPassportvalid, statusController.deletebyStatusID)
//  retweet a status
router.post('/retweet/:statusid', isPassportvalid, statusOptionController.retweet)
//  delete retweet a status
router.post('/unretweet/:statusid', isPassportvalid, statusOptionController.unretweet)
//  fav a status
router.post('/favourite/create', isPassportvalid, favouriteController.create)
//  delete fav a status
router.post('/favourite/destroy', isPassportvalid, favouriteController.destroy)
//  get fav list of a user, authorized user get is_favourited
router.get('/favourite/list', publicStatus, favouriteController.list)

module.exports = router
