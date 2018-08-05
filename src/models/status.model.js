const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusSchema = new Schema({
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  in_reply_to_user_id: { type: Number, default: null },
  in_reply_to_tweet_id: { type: Number, default: null },
  restatus_count: {type: Number, default: 0},
  restated: {type: Boolean, default: false},
  restated_status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
    default: null
  },
  created_at: { type: Date, default: Date.now }
})

const Status = mongoose.model('Status', statusSchema, 'status')
module.exports = Status
