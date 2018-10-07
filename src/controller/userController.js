const HttpStatus = require('http-status-codes')
const User = require('../models/user.model')

module.exports = {
  async createUser (req, res) {
    try {
      const user = new User(req.body)
      const saveUser = await user.save()

      res.status(HttpStatus.CREATED).send({
        User: saveUser.toJSON() }
      )
    } catch (error) {
      res.send({'error': error.message}).status(HttpStatus.NOT_ACCEPTABLE)
    }
  },
  async viewUser (req, res) {
    try {
      if (!req.params.username) throw new Error('No username')
      const user = await User.findOne({username: req.params.username}).select('-password -email')
      if (user == null) throw new Error('no user found')
      res.status(HttpStatus.OK).send({'user': user})
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send({'error': error})
    }
  },
  async logout (req, res) {
    req.logout()
    res.status(HttpStatus.OK).send({message: 'user logout'})
  }
}
