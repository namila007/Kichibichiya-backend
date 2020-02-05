const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('../config/config')
const router = require('./router/index')
const passport = require('passport')
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// passport
app.use(passport.initialize())
app.use(passport.session())
require('./middleware/passport')

app.use('/api', router)
mongoose.connect(config.mongo, { useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true})

app.listen(config.port)

console.log(`${config.app} is running on ${config.port}`)

module.exports = app
