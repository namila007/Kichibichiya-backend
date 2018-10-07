const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const SALT_FACTOR = 10
const _ = require('lodash')

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
    lowercase: true,
    unique: true
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
  },
  name: {
    type: String,
    lowercase: true
  },
  avatar: {
    type: String,
    default: 'https://png.icons8.com/color/100/user.png'
  }

})

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

// parsing withour password
userSchema.method({
  toJSON () {
    if (!this) throw new Error()
    var user = this.toObject()
    delete user.followers
    delete user.following
    delete user.password
    return user
  },
  comparePassword (password) {
    return bcrypt.compareSync(password, this.password)
  },
  toJWT () {
    return _.omit(this.toObject(), ['password', 'followers', 'following', 'email', 'created_at', '__v', 'following_count', 'followers_count'])
  }
})

const User = mongoose.model('User', userSchema, 'user')
module.exports = User
