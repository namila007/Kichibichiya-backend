const passport = require('passport')
const User = require('../models/user.model')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../../config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
  },
  async function (jwtPayload, cb) {
    try {
      const user = await User.findOne({email: jwtPayload.email}).exec()
      if (!user) return cb(new Error(), false)
      return cb(null, user)
    } catch (err) {
      return cb(err, false)
    }
  }
  )
)
