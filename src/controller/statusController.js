const Status = require('../models/status.model')
const HttpStatus = require('http-status-codes')
// const _ = require('lodash')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  async create (req, res) {
    try {
      const userid = req.body.userID
      const text = req.body.text
      // const user = req.params.username
      if (!ObjectId.isValid(userid)) throw new Error('Not a valid User')
      const status = await new Status({
        text: text,
        user: userid
      }).save()
      Status
        .findById(status._id)
        .populate('user')
        .exec(function (err, status) {
          if (err) throw new Error(err)
          console.log('sss ' + status)
          res.status(HttpStatus.CREATED).send({status: status})
        })
    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  },
  async view (req, res) {

  }

}
