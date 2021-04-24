const mongoose = require('mongoose')

var EventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true
    },
    state: {
        type: Number,
        required: true
    },
    subevents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }]
  });
  const model = mongoose.model('Event', EventSchema);
  module.exports = model;
