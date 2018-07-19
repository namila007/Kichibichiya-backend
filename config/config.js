require('dotenv').config()

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongo: process.env.DBHOST,
  secret: process.env.SECRET,
  expire: process.env.TIMEOUT
}
