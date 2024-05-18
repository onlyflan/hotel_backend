const News = require('../models/newsModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.getAllNews = async (req, res) => {
  try {
    const newss = await News.find();
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
    // News.findOne({ _id: req.params.id })
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
    // const newTour = new News({});
    // newTour.save();

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
  // News.findByIdAndUpdate(id, {});
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
