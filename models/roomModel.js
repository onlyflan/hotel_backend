const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A room must have a name'],
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'A room must have a type'],
  },
  price: {
    type: Number,
    required: [true, 'A room must have a price'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    // required: [true, 'A room must have a cover image'],
  },
  images: [String],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
