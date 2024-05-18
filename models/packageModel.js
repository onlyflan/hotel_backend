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
    trim: true,
    require: [true, 'A package must have a description'],
  },
  content: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    require: [true, 'A package must have a cover image'],
  },
  note: {
    type: String,
    trim: true,
    require: [true, 'A package must have a note'],
  },
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
