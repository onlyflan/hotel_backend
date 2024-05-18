const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: [true, 'News must be associated with a hotel'],
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
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
