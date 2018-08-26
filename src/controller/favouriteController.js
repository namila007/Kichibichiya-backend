const Status = require('../models/status.model')
const HttpStatus = require('http-status-codes')
const User = require('../models/user.model')
const ObjectId = require('mongoose').Types.ObjectId
const _ = require('lodash')
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
      console.log(isFav)
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
    var user = {}
    var authorizedUser = req.user // only for autho user
    try {
      if (req.query.userid) {
        user._id = req.query.userid
        if (!ObjectId.isValid(user._id)) {
          throw new Error('Invalid user id')
        }
      } else if (req.query.username) {
        user = await User
          .findOne({username: req.query.username})
          .select('_id')
          .exec()
      } else {
        res.status(HttpStatus.BAD_REQUEST).send({'error': 'must add username or userid'})
        res.end()
        return
      }
      Favourite
        .find({user_id: user._id})
        .populate(
          {
            path: 'status_id',
            model: 'Status',
            populate: (
              { path: 'user',
                model: 'User',
                select: '-email -password -followers -following'
              }
            )
          })
        .lean()
        .exec(
          function (err, statuses) {
            if (err) throw new Error(err)
            statuses = _.map(statuses,
              function (status) {
                var obj = status.status_id
                status = _.omit(status, 'user_id', 'status_id')
                status = _.assign(status, obj)
                if (authorizedUser && String(authorizedUser._id) === String(user._id)) status.is_favourited = true
                else status.is_favourited = false
                return status
              }
            )
            res.status(HttpStatus.OK).send({statuses: statuses})
          }
        )
    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  }
}
