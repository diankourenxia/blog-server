const mongoose = require('mongoose')
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  username: {
    unique: true,
    require: true,
    type: String
  },
  password: String,
  email: {
    unique: true,
    type: String,
    required: true
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  phone: Number,
  createTime: {
    type: Date,
    default: Date.now()
  },
  updateTime: {
    type: Date,
    default: Date.now()
  }
})
userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = Date.now()
  }
  next()
})
userSchema.virtual('isLocked').get(() => {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})
userSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified("password")) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      console.log(err)
      return next(err)
    } else {
      console.log('not error')
    }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)
      user.password = hash
      next()
    })
  })
})
userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((res, rej) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (err) rej(err)
        res(isMatch)
      })
    })
  },
  test: () => {
    console.log(10)
  },
  incLoginAttempts: user => {
    return new Promise((res, rej) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUntil: 1
          }
        }, err => {
          if (!err) resolve(true)
          else rej(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }
        this.update(updates, err => {
          if (!err) resolve(true)
          else rej(err)
        })
      }
    })

  }
}
const userModel = mongoose.model('User', userSchema)
module.exports = userModel
