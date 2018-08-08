const Status = require('../models/status.model')
const HttpStatus = require('http-status-codes')
const User = require('../models/user.model')
const ObjectId = require('mongoose').Types.ObjectId
const _ = require('lodash')
const isFav = require('../services/isFavStatus')

module.exports = {
  async create (req, res) {
    try {
      const userid = req.user._id
      const text = req.body.text

      if (!ObjectId.isValid(userid)) throw new Error('Not a valid User')
      const status = await new Status({
        text: text,
        user: userid
      }).save()
      Status
        .findById(status._id)
        .populate('user', '-email -password -followers -following')
        .exec(function (err, status) {
          if (err) throw new Error(err)
          res.status(HttpStatus.CREATED).send({status: status})
        })
    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  },
  async viewbyStatusID (req, res) {
    console.log(req.params.statusid)
    try {
      var statusid = req.params.statusid
      if (!ObjectId.isValid(statusid)) throw new Error('Invalid user id')
      Status
        .findOne({_id: statusid})
        .populate({path: 'user', select: '-email -password -followers -following'})
        .exec(function (err, status) {
          if (err) throw new Error(err)
          res.status(HttpStatus.OK).send({status: status})
        })
    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  },
  async deletebyStatusID (req, res) {
    try {
      var statusid = req.params.statusid
      const user = req.user
      if (!ObjectId.isValid(statusid)) throw new Error('Invalid user id')
      Status
        .findByIdAndRemove({_id: statusid, userid: user._id})
        .exec(function (err, status) {
          if (err) throw new Error(err)
          if (!status) {
            res.status(HttpStatus.NOT_FOUND).send({'error': 'status not found'})
          } else res.status(HttpStatus.OK).send({status: status})
        })
    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  },
  async viewUserTL (req, res) {
    var userid
    try {
      if (req.query.userid) {
        userid = req.query.userid
        if (!ObjectId.isValid(userid)) {
          throw new Error('Invalid user id')
        }
      } else if (req.query.username) {
        userid = await User
          .findOne({username: req.query.username})
          .select('_id')
          .exec()
      } else {
        res.status(HttpStatus.BAD_REQUEST).send({'error': 'must add username or userid'})
      }

      Status
        .find({user: userid})
        .populate({path: 'user', select: '-email -password -followers -following', options: { lean: true }})
        .sort({created_at: -1})
        .lean()
        .exec(async function (err, statuses) {
          if (err) throw new Error(err)
          statuses = await Promise.all(
            _.map(statuses, async function (status) {
              var val = await isFav.isFavourited(status._id, userid)
              if (val) status.is_favourited = true
              else status.is_favourited = false
              return status
            //   return isFav.isFavourited(status._id, userid, status)
            //     .then(function (res) {
            //       console.log('ffff')
            //       return Promise.resolve(res)
            //     }).catch((err) => { console.error(err) })
            })
          )
          res.status(HttpStatus.OK).send({status: statuses})
        })
    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  }
}
