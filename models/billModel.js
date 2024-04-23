const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A bill must have a name'],
  },
  paymentDate: {
    type: Date,
    required: [true, 'A bill must have a payment date'],
  },
  amount: {
    type: Number,
    required: [true, 'A bill must have an amount'],
  },
  paymentType: {
    type: String,
    required: [true, 'A bill must have a payment type'],
  },
  note: {
    type: String,
    trim: true,
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  bookingID: {
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
  },
  description: {
    type: String,
  },
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
