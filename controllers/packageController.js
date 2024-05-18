const Package = require('../models/packageModel');

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json({
      status: 'success',
      results: packages.length,
      data: { packages },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getPackage = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    // Package.findOne({ _id: req.params.id })
    res.status(200).json({
      status: 'success',
      data: {
        package,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createPackage = async (req, res) => {
  try {
    // const newTour = new Package({});
    // newTour.save();

    const newPackage = await Package.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        package: newPackage,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updatePackage = async (req, res) => {
  // Package.findByIdAndUpdate(id, {});
  try {
    const package = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        package,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
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
