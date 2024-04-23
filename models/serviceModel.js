const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A service must have a name'],
    unique: true,
    trim: true,
  },
  unity: {
    type: String,
    required: [true, 'A service must have a unity'],
  },
  price: {
    type: Number,
    required: [true, 'A service must have a price'],
  },
  description: {
    type: String,
    trim: true,
  },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
