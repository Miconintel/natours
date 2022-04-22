const Review = require('../models/reviewModel');
const AppError = require('../utilities/appError');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/userModel');
const { set } = require('../app');

exports.base = async (request, response, next) => {
  response.status(200).render('base', {
    tour: 'Camper',
    user: 'Naza',
  });
};
// base not useful
exports.getOverview = catchAsync(async (requsest, response, next) => {
  // get tours=

  const tours = await Tour.find();
  response.status(200).render('mainOverview', {
    title: 'All tours',
    tours,
  });
});
exports.getTour = catchAsync(async (request, response, next) => {
  // get the dta for the requested tour

  const tour = await Tour.findOne({ slug: request.params.slug }).populate({
    path: 'reviews',
  });
  if (!tour) {
    return next(
      new AppError('sorry this tour doesnt not exist at all', 404)
    );
  }

  response.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
  // response.status(200).json({
  //   title: tour,
  // });
});

exports.login = (request, response, next) => {
  response.status(200).render('login', {
    title: 'login',
  });
};
exports.getAccount = (request, response) => {
  response.status(200).render('account', {
    title: 'your Account',
  });
};
exports.updateUserData = async (request, response) => {
  const updatedUser = await User.findByIdAndUpdate(
    request.user.id,
    {
      name: request.body.name,
      email: request.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  response.status(200).render('account', {
    title: 'your Account',
    user: updatedUser,
  });
};

exports.getMyTours = catchAsync(async (request, response, next) => {
  // TEACHER LOGIC
  // get booking based on tour
  // const bookings = await Booking.find({
  //   parentUser: request.user.id,
  // });
  // // find tours with the returned IDs
  // const tourIds = bookings.map((el) => el.parentTour.id);
  // const tours = await Tour.find({ _id: { $in: tourIds } });
  // response.status(200).render('mainOverview', {
  //   title: 'My tours',
  //   tours,
  // });
  // MY LOGIC
  const user = await User.findById(request.user.id).populate('bookings');
  const tours = user.bookings.map((book) => book.parentTour);
  // remove duplicatetours
  const setTours = [...new Set(tours)];
  // console.log(setTours);
  response.status(200).render('mainOverview', {
    title: 'My tours',
    tours: setTours,
  });
});
