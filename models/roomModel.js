const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: [true, 'A room must be linked to a hotel'],
  },
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
  },
  images: [String],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
