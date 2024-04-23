const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingDate: {
    type: Date,
    required: [true, 'A booking must have a booking date'],
  },
  selloff: {
    type: Number,
    required: [true, 'A booking must have a selloff'],
  },
  note: {
    type: String,
    trim: true,
  },
  clientID: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: [true, 'A booking must have a client'],
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
