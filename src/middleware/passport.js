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
      const user = await User
        .findById(jwtPayload._id).exec()
      // console.log(user)
      if (!user) return cb(new Error(), false)
      return cb(null, user)
    } catch (err) {
      return cb(err, false)
    }
  }
  )
)

// passport.serializeUser(function (user, done) {
//   console.log(user)
//   done(null, user._id)
// })

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     console.log(user)
//     done(err, user)
//   })
// })
