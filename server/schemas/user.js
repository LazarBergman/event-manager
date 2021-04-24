const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    username: {
      type: String,
    },
    salutation: {
      type: String,
      required: true
    },
    password: {
      type: String,
    },
    state: {
        type: Number,
        required: true
    },
  });
  const model = mongoose.model('User', UserSchema);
  module.exports = model;
