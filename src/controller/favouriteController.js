const Status = require('../models/status.model')
const HttpStatus = require('http-status-codes')
// const User = require('../models/user.model')
const ObjectId = require('mongoose').Types.ObjectId
const Favourite = require('../models/favourite.model')

module.exports = {
  async create (req, res) {
    try {
      const statusid = req.body.statusid
      if (!ObjectId.isValid(statusid)) {
        throw new Error('Status not found')
      }
      const userid = req.user._id
      var isFav = await Favourite
        .findOne({
          user_id: userid, status_id: statusid
        })
        .exec()
      console.log(isFav)
      if (!isFav) {
        Status
          .findByIdAndUpdate(statusid)
          .populate({path: 'user', select: '-email -password -followers -following'})
          .exec(function (err, status) {
            if (err) throw new Error()
            status.favourite_count = 1 + status.favourite_count
            new Favourite({
              user_id: userid, status_id: statusid
            }).save()
            status.save()
            status.is_favourited = true
            res.send({status: status})
          })
      }
    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  },
  async unfavourite (req, res) {
    try {

    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  }
}
