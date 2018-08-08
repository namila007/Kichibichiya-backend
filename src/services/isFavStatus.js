const Favourite = require('../models/favourite.model')

module.exports = {
  async isFavourited (statusid, userid, obj) {
    return Favourite
      .findOne({
        user_id: userid, status_id: statusid
      })
      .exec()
    //       async (err, fav) => {
    //       if (err) return Promise.reject(err)
    //       if (fav) {
    //         obj.is_favourited = true
    //         return Promise.resolve(obj)
    //       } else {
    //         obj.is_favourited = false
    //         console.log('kk')
    //         return Promise.resolve(obj)
    //       }
    //     })
    // )
  }
}
