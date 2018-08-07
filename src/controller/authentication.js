const User = require('../models/user.model')
const httpstatus = require('http-status-codes')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

function jwtSignUser (user) {
  const TIME = config.expire
  return jwt.sign(user, config.secret, {
    expiresIn: TIME
  })
}

module.exports = {
  async login (req, res) {
    try {
      const {username, password} = req.body
      const user = await User
        .findOne({username: username})
        // .select('-followers -following -created_at -following_count -followers_count -__v -email')
        .exec()
      if (!user) throw new Error('User not found')
      const validUser = await user.comparePassword(password)
      console.log(user.comparePassword(password))
      if (validUser) {
        const token = jwtSignUser(user.toJWT())
        res.status(httpstatus.OK).send({user: user.toJSON(), JWTtoken: token})
      } else throw new Error('Incorrect passowrd or Username')
    } catch (err) {
      res.send({error: err.message}).status(httpstatus.UNAUTHORIZED)
    }
  }
}
