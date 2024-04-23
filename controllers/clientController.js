const Client = require('../models/clientModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({
      status: 'success',
      results: clients.length,
      data: { clients },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    // Client.findOne({ _id: req.params.id })
    res.status(200).json({
      status: 'success',
      data: {
        client,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createClient = async (req, res) => {
  try {
    // const newTour = new Client({});
    // newTour.save();

    const newClient = await Client.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        client: newClient,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateClient = async (req, res) => {
  // Client.findByIdAndUpdate(id, {});
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        client,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
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
