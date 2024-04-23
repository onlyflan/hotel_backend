const Bill = require('../models/billModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json({
      status: 'success',
      results: bills.length,
      data: { bills },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    // Bill.findOne({ _id: req.params.id })
    res.status(200).json({
      status: 'success',
      data: {
        bill,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createBill = async (req, res) => {
  try {
    // const newTour = new Bill({});
    // newTour.save();

    const newBill = await Bill.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        bill: newBill,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateBill = async (req, res) => {
  // Bill.findByIdAndUpdate(id, {});
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        bill,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
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
