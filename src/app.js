const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('../config/config')
const router = require('./router/index')
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use('/api', router)
mongoose.connect(config.mongo, { useNewUrlParser: true })
app.listen(config.port)

console.log(`${config.app} is running on ${config.port}`)

module.exports = app
