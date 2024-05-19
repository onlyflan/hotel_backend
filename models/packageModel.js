const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A package must have a name'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'A package must have a price'],
  },
  description: {
    type: String,
    required: [true, 'A package must have a description'],
    trim: true,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
