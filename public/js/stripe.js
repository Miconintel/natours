import axios from 'axios';
import { showAlert } from './showAlert';

const stripe = Stripe(
  `pk_test_51Kqu9NHVqQpkAuMelrOd8IPdiiFI80yCyJj0GQ6Z9XUng3SlyhrGbljFjKUwfyTRx5s8wXxeMqANZXMV3CChjzw500svbt4gYc`
);
export const bookTour = async (tourId) => {
  try {
    // get checkout ession
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // use stripe to
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', 'sorry try again there was an error');
  }
};
