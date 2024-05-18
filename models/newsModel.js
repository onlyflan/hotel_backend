const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  hotel: {
    type: String,
    required: [true, 'A news article must be linked to a hotel'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'A news article must have a title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'A news article must have content'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'A news article must have a date'],
    trim: true,
  },
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
