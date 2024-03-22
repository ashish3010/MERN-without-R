const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  contact_number: {
    type: String,
    required: true
  },
  cart: {
    type: Object,
  },
  orders: {
    type: Object,
  },
  saved_address: {
    type: Object,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  },
})

module.exports = mongoose.model('User', User)