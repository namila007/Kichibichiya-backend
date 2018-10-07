const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: 'not authorized'
      })
    } else {
      req.user = user.toJSON()
      next()
    }
  })(req, res, next)
}
