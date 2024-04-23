const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'A client must have a name'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'A client must have an address'],
    trim: true,
  },
  note: {
    type: String,
    trim: true,
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
