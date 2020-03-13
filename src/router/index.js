const express = require('express')
const router = express.Router()
const statusRouter = require('./status.router')
const userRouter = require('./user.router')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const path = require('path')
const swaggerDoc = YAML.load(path.join(__dirname, '../swagger.yaml'))

router.get('/state', function (req, res) {
  console.log('got')
  res.status(200).send({status: 'OK'})
})

router.use('/status', statusRouter)
router.use('/user', userRouter)

// swagger api doc
router.use('/docs', swaggerUi.serve)
router.get('/docs', swaggerUi.setup(swaggerDoc, {
  explorer: true
}))

module.exports = router
