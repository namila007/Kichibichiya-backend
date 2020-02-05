require('dotenv').config()

module.exports = {
  port: process.env.PORT,
  redis_port: process.env.REDIS_PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  mongo: process.env.DBHOST,
  secret: process.env.SECRET,
  expire: process.env.TIMEOUT
}
