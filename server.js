const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = require('./app');

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

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
