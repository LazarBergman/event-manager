const mongoose = require('mongoose')

var SubscriberSchema = new mongoose.Schema({
    telegram: {
      type: String
    },
    chatId: {
      type: String,
    },
    email: {
      type: String,
    },
    notifyOn: {
      type: Date,
    }
  });
  const model = mongoose.model('Subscriber', SubscriberSchema);
  module.exports = model;
