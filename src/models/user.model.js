const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const SALT_FACTOR = 10

// creating schema for user
const userSchema = new Schema({
  email: {
    type: String,
    required: 'Email address is required',
    unique: true,
    lowercase: true
  },
  username: {
    type: String,
    required: 'username is required',
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  following_count: {
    type: Number,
    default: null
  },
  followers_count: {
    type: Number,
    default: null
  }

})

// userSchema.path('email').validate(function (email) {
//   var emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/
//   return emailRegex.test(email.text) // Assuming email has a text attribute
// }, 'The e-mail field cannot be empty.')

// check email
userSchema.pre('validate', function (next) {
  const user = this
  const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/
  if (!emailRegex.test(user.email)) {
    const err = new Error('Not an Email address')
    next(err)
    return
  }
  next()
})

// before saving bcrypt the password
userSchema.pre('save', function (next) {
  const user = this
  //  hashing modified password
  try {
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  } catch (err) {
    return next(err)
  }
})

// checking passwords
userSchema.method({
  comparePassword (password, callback) {
    bcrypt.compare(password, this.password, function (err, isTrue) {
      if (err) return callback(err)
      callback(null, isTrue)
    })
  },
  toJSON () {
    var user = this.toObject()
    delete user.password
    return user
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
