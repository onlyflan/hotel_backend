const News = require('../models/newsModel');

exports.getAllNews = async (req, res) => {
  try {
    let query = News.find();

    if (req.query.position && req.query.limit) {
      const position = parseInt(req.query.position, 10);
      const limit = parseInt(req.query.limit, 10);
      const skip = (position - 1) * limit;
      query = query.skip(skip).limit(limit);
    }

    const newss = await query;

    res.status(200).json({
      status: 'success',
      results: newss.length,
      data: { newss },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        news,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createNews = async (req, res) => {
  try {
    const newNews = await News.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        news: newNews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        news,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
