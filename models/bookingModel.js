const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// const Service = require('./serviceModel');
const Hotel = require('./hotelModel');
const Room = require('./roomModel');
const Package = require('./packageModel');

const bookingSchema = new mongoose.Schema({
  bookingDate: {
    type: Date,
    // required: [true, 'A booking must have a booking date'],
  },
  selloff: {
    type: Number,
    // required: [true, 'A booking must have a selloff'],
  },
  note: {
    type: String,
    trim: true,
  },
  clientID: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    // required: [true, 'A booking must have a client'],
  },
  bookingCode: {
    type: String,
    required: [true, 'A booking must have a booking code'],
  },
  adult: {
    type: Number,
    required: [true, 'A booking must specify number of adults'],
  },
  child: {
    type: Number,
    required: [true, 'A booking must specify number of children'],
  },
  checkIn: {
    type: Date,
    required: [true, 'A booking must have a check-in date'],
  },
  checkOut: {
    type: Date,
    required: [true, 'A booking must have a check-out date'],
  },
  hotel: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hotel',
    required: [true, 'A booking must have a hotel'],
  },
  packageId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Package',
    required: [true, 'A booking must have a package ID'],
  },
  price: {
    type: Number,
    required: [true, 'A booking must have a price'],
  },
  room: {
    type: Number,
    required: [true, 'A booking must have a room'],
  },
  roomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'A booking must have a room ID'],
  },
  services: [
    {
      name: String,
      _id: mongoose.Schema.ObjectId,
      price: Number,
      unity: String,
      description: String,
    },
  ],
  totalPrice: {
    type: Number,
    required: [true, 'A booking must have a total price'],
  },
});

bookingSchema.pre('validate', function (next) {
  if (!this.bookingCode) {
    this.bookingCode = uuidv4().slice(0, 6).toUpperCase();
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
