const express = require('express')
const router = express.Router()
const statusRouter = require('./status.router')
const userRouter = require('./user.router')

router.get('/state', function (req, res) {
  console.log('got')
  res.status(200).send({status: 'OK'})
})

router.use('/status', statusRouter)
router.use('/user', userRouter)

module.exports = router
