// const Status = require('../models/status.model')
const HttpStatus = require('http-status-codes')
// const User = require('../models/user.model')
// const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  async retweet (req, res) {
    try {

    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  },
  async unretweet (req, res) {
    try {

    } catch (err) {
      console.log(err)
      res.send({error: err.message}).status(HttpStatus.BAD_REQUEST)
    }
  },
  async favourite (req, res) {
    try {

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
