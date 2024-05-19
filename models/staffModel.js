const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'A staff must have a name'],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, 'A staff must have a gender'],
    trim: true,
  },
  birthDate: {
    type: Date,
    required: [true, 'A staff must have a birth date'],
    trim: true,
  },
  staffCode: {
    type: String,
    required: [true, 'A staff must have a staff code'],
    trim: true,
  },
  position: {
    type: String,
    required: [true, 'A staff must have a position'],
    trim: true,
  },
  image: {
    type: String,
    // required: [true, 'A staff must have an image'],
    trim: true,
  },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
