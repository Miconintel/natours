const stripe = require('stripe');
const Tour = require('../models/tourModel.js');
const Booking = require('../models/bookingModel');
const AppError = require('../utilities/appError.js');
const APIfeatures = require('./../utilities/APIfeatures');
const catchAsync = require('./../utilities/catchAsync');
const handlerFactory = require('./handlerFactory');

const useStripe = stripe(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(
  async (request, response, next) => {
    // get currently booke tour
    const tour = await Tour.findById(request.params.tourId);
    // create checkout
    const session = await useStripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${request.protocol}://${request.get(
        'host'
      )}/?parentTour=${request.params.tourId}&parentUser=${
        request.user.id
      }&price=${tour.price}`,
      cancel_url: `${request.protocol}://${request.get('host')}/tour/${
        tour.slug
      }`,
      customer_email: request.user.email,
      client_reference_id: request.params.tourId,
      line_items: [
        {
          name: `${tour.name} Tour`,
          description: tour.summary,
          images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          amount: tour.price * 100,
          // amount is usually in cents
          currency: 'usd',
          quantity: 1,
        },
      ],
    });

    response.status(200).json({
      status: 'success',
      session,
    });
  }
);

// we are literally creating a booking object when someone hits the route
exports.createBookingcheckout = catchAsync(
  async (request, response, next) => {
    const { parentTour, parentUser, price } = request.query;
    // we can populate user and get all the bookings under a user and then the tours
    if (!parentTour && !parentUser && !price) return next();
    await Booking.create({ parentTour, parentUser, price });

    response.redirect(request.originalUrl.split('?')[0]);
  }
);

exports.createBooking = handlerFactory.createOne(Booking);
exports.getOneBooking = handlerFactory.getOne(Booking);
exports.getAllBookings = handlerFactory.getAll(Booking);
exports.updateBooking = handlerFactory.updateOne(Booking);
exports.deleteBooking = handlerFactory.deleteOne(Booking);
