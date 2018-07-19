const Status = require('../models/status.model')
const HttpStatus = require('http-status-codes')

module.exports = {
  async create (req, res, next) {
    try {
      const newStatus = req.body
      // const user = req.params.username
      const status = new Status(newStatus)
      res.send(status).status(HttpStatus.CREATED)
    } catch (err) {
      res.send({error: err}).status(HttpStatus.BAD_REQUEST)
    }
  }

}
