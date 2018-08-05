const HttpStatus = require('http-status-codes')
const User = require('../models/user.model')
const ObjectId = require('mongoose').Types.ObjectId

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
      if (!ObjectId.isValid(req.params.id)) throw new Error('Invalid user id')
      const user = await User.findById(req.params.id).select('-password -email')
      if (user == null) res.status(HttpStatus.NOT_FOUND).send({'error': 'no user found'})
      res.status(HttpStatus.OK).send({'user': user})
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send({'error': error})
    }
  }
}
