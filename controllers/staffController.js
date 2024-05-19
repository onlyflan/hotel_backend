const Staff = require('../models/staffModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.getAllStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.status(200).json({
      status: 'success',
      results: staffs.length,
      data: { staffs },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    // Staff.findOne({ _id: req.params.id })
    res.status(200).json({
      status: 'success',
      data: {
        staff,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createStaff = async (req, res) => {
  try {
    // const newTour = new Staff({});
    // newTour.save();

    const newStaff = await Staff.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        staff: newStaff,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateStaff = async (req, res) => {
  // Staff.findByIdAndUpdate(id, {});
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        staff,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
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
