const passport = require('passport')

// this is for view status, authorize user can see his fav or
// public user can view just the status
module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err) throw new Error(err)
    if (!user) {
      next()
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}
