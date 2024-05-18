const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Hotel = require('../../models/hotelModel');
const Package = require('../../models/packageModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  // .connect(DB.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8'),
);
const users = JSON.parse(
  fs.readFileSync('./dev-data/data/users.json', 'utf-8'),
);
const hotels = JSON.parse(
  fs.readFileSync('./dev-data/data/hotels.json', 'utf-8'),
);
const packages = JSON.parse(
  fs.readFileSync('./dev-data/data/packages.json', 'utf-8'),
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await Hotel.create(hotels);
    await Package.create(packages);
    await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION(DB)
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Hotel.deleteMany();
    await Package.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
// importData();
