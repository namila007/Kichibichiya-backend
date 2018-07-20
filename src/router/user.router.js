const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.post('/signup', userController.createUser)
router.get('/:id', userController.viewUser)

module.exports = router
