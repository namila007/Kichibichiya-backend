const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favouriteSchema = new Schema({
  status_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Favourite = mongoose.model('Favourite', favouriteSchema, 'favourite')
module.exports = Favourite
