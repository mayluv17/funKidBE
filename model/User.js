const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  // roles: {
  //   User: {
  //     type: Number,
  //     default: 2001,
  //   },
  //   Editor: Number,
  //   Admin: Number,
  // },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ['User'],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: String,
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', userSchema);
