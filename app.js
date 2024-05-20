const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const hotelRouter = require('./routes/hotelRoutes');
const roomRouter = require('./routes/roomRoutes');
const clientRouter = require('./routes/clientRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const billRouter = require('./routes/billRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const packageRouter = require('./routes/packageRoutes');
const newsRouter = require('./routes/newsRoutes');
const staffRouter = require('./routes/staffRoutes');
const home = require('./routes/home');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views/pages/Login'));

// 1) GLOBAL MIDDLEWARES
app.use(
  cors({
    origin: 'https://hotel-web-app-six.vercel.app',
    credentials: true,
  }),
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Set security HTTP headers
app.use(helmet());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // logs HTTP requests details to the console in a nice and readable format
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
app.post(
  '/webhook-checkout',
  bodyParser.raw({ type: 'application/json' }),
  // bookingController.webhookCheckout,
);
// Check phan nay

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use(compression());

// app.use((req, res, next) => {
//   console.log('Hello from the middleware');
//   next();
// });

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
// app.use('/', (req, res) =>{
//   res.status(200).render('index');
// });
// app.use('/overview', (req, res) => {
//   res.status(200).render('overview');
// });
app.use('/', home);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/bills', billRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/packages', packageRouter);
app.use('/api/v1/staffs', staffRouter);
app.use('/api/v1/news', newsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
