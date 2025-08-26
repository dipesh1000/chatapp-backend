const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    // match: /^[a-zA-Z0-9_]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: { type: String },
  phoneOtp: { type: String },
  phone_verified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
  otp: {
    type: String,
    max: 6,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['free', 'premium', 'admin'],
    default: 'free',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
