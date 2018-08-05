const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

// signup user
router.post('/signup', userController.createUser)

// view user
router.get('/:id', userController.viewUser)
module.exports = router
