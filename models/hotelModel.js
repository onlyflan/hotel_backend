const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A hotel must have a name'],
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'A hotel must have an address'],
    trim: true,
  },
  starLevel: {
    type: Number,
    required: [true, 'A hotel must have a star level'],
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    // required: [true, 'A hotel must have a cover image'],
  },
  images: [String],
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
