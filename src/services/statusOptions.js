const promisify = require('bluebird')
require('mongoose').Promise = promisify
const Favourite = require('../models/favourite.model')

module.exports = {
  async isFavourited (userid, status) {
    return Favourite
      .findOne({
        user_id: userid, status_id: status._id
      })
      .lean()
      .exec()
      .then((res) => {
        if (res) status.is_favourited = true
        else status.is_favourited = false
        return Promise.resolve(status)
      })
      .catch((err) => { return err })
  }
}
