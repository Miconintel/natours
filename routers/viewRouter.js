const express = require('express');
const {
  base,
  getOverview,
  getTour,
  login,
  getAccount,
  updateUserData,
  getMyTours,
} = require('./../controller/viewsController');
const { protect, isLoggedIn } = require('./../controller/authController');
const {
  createBookingcheckout,
} = require('./../controller/bookingController');

const router = express.Router({ mergeParams: true });

// router.use(isLoggedIn);

router.get('/base', base);
// not useful
router.get('/', createBookingcheckout, isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, login);
router.get('/me', protect, getAccount);
router.post('/submit-user-data', protect, updateUserData);
router.get('/my-tours', protect, getMyTours);
module.exports = router;
