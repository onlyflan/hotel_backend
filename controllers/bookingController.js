const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const Hotel = require('../models/hotelModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.hotelId);
  if (!hotel) {
    return next(new AppError('No hotel found with that ID', 404));
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/my-bookings?alert=booking`,
    cancel_url: `${req.protocol}://${req.get('host')}/hotel/${hotel.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.hotelId,
    line_items: [
      {
        name: `${hotel.name} Room`,
        description: `Room ${req.body.roomID} at ${hotel.name}`,
        images: [
          `${req.protocol}://${req.get('host')}/img/hotels/${hotel.imageCover}`,
        ],
        amount: req.body.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
    metadata: {
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      room: req.body.room,
      adult: req.body.adult,
      child: req.body.child,
    },
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

const createBookingCheckout = async (session) => {
  const hotel = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.amount_total / 100;
  await Booking.create({
    hotel,
    user,
    price,
    bookingCode: uuidv4().slice(0, 6).toUpperCase(),
    checkIn: session.metadata.checkIn,
    checkOut: session.metadata.checkOut,
    room: session.metadata.room,
    adult: session.metadata.adult,
    child: session.metadata.child,
    totalPrice: session.amount_total / 100,
  });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.createBooking = catchAsync(async (req, res, next) => {
  if (!req.body.bookingCode) {
    req.body.bookingCode = uuidv4().slice(0, 6).toUpperCase();
  }

  const newBooking = await Booking.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      booking: newBooking,
    },
  });
});

exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

exports.getBookingByCode = catchAsync(async (req, res, next) => {
  const booking = await Booking.findOne({ bookingCode: req.params.code });

  if (!booking) {
    return next(new AppError('No booking found with that code', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});
