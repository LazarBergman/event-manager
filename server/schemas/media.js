const mongoose = require('mongoose')

var MediaSchema = new mongoose.Schema({
    type: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      required: true
    },
  });
  const model = mongoose.model('Media', MediaSchema);
  module.exports = model;
