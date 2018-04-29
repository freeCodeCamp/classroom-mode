const mongoose = require('mongoose')

const { Schema } = mongoose
mongoose.Promise = global.Promise
const validator = require('validator')

const studentSchema = new Schema({
  name: { 
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.',
    },
    trim: true,
    required: [true, 'Name is required.'],
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [{ validator: value => validator.isEmail(value), msg: 'Invalid email.' }],
    required: [true, 'Please Supply an email address'],
  },
  notes: {
    type: String,
  },
  completedChallengesCount: {
    type: Number,
  },
  completedChallenges: {
    type: Array,
  },
})

module.exports = mongoose.model('Student', studentSchema)
