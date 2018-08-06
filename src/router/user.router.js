const express = require('express')
const router = express.Router()
const authenticationController = require('../controller/authentication')
const userController = require('../controller/userController')

// signup user
router.post('/signup', userController.createUser)
// login
router.post('/login', authenticationController.login)
// view user
router.get('/:id', userController.viewUser)
// logout
router.get('/logout', userController.logout)
module.exports = router
