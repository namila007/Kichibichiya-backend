const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusSchema = new Schema({
  text: String,
  userid: Number,
  in_reply_to_user_id: { type: Number, default: null },
  in_reply_to_tweet_id: { type: Number, default: null },
  restatus_count: {type: Number, default: 0},
  restated: {type: Boolean, default: false},
  created_at: { type: Date, default: Date.now }
})

const Status = mongoose.model('Status', statusSchema)
module.exports = Status
