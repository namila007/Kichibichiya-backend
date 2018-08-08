const Status = require('../models/status.model')
const HttpStatus = require('http-status-codes')
const ObjectId = require('mongoose').Types.ObjectId
const Favourite = require('../models/favourite.model')

module.exports = {
  // creating a fav
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

      if (!isFav) {
        Status
          .findByIdAndUpdate(statusid)
          .populate({path: 'user', select: '-email -password -followers -following'})
          .exec(function (err, status) {
            if (err) throw new Error()
            status.favourite_count = 1 + status.favourite_count
            status.save()
            new Favourite({
              user_id: userid, status_id: statusid
            }).save()
            // cant lean() and save() . so save doc and then turn to toObject()
            status = status.toObject()
            status.is_favourited = true
            res.send({status: status})
          })
      } else {
        Status
          .findById(statusid)
          .populate({path: 'user', select: '-email -password -followers -following'})
          .lean()
          .exec(function (err, status) {
            if (err) throw new Error()
            status.is_favourited = true
            res.send({status: status})
          })
          .save()
      }
    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  },
  async destroy (req, res) {
    try {
      const statusid = req.body.statusid
      if (!ObjectId.isValid(statusid)) {
        throw new Error('Status not found')
      }
      const userid = req.user._id
      var isFav = await Favourite
        .findOneAndRemove({
          user_id: userid, status_id: statusid
        })
        .exec()
      if (isFav) {
        Status
          .findByIdAndUpdate(statusid)
          .populate({path: 'user', select: '-email -password -followers -following'})
          .exec(function (err, status) {
            if (err) throw new Error()
            status.favourite_count = status.favourite_count - 1
            status.save()
            status = status.toObject()
            status.is_favourited = false
            res.send({status: status})
          })
      } else {
        Status
          .findById(statusid)
          .populate({path: 'user', select: '-email -password -followers -following'})
          .lean()
          .exec(function (err, status) {
            if (err) throw new Error()
            status.is_favourited = false
            res.send({status: status})
          })
      }
    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  },
  async list (req, res) {
    try {

    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  }
}
