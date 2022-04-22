import axios from 'axios';
import { showAlert } from './showAlert.js';

// type iseither password or email data
export const updateSettings = async (data, type) => {
  try {
    const url = `${
      type === 'password'
        ? '/api/v1/users/update-password'
        : '/api/v1/users/updateme'
    }`;
    const response = await axios({
      method: 'PATCH',
      url: url,
      data,
    });

    if (response.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated succesfully`);
      window.setTimeout(() => {
        // location.assign('/me');
        location.reload(true);
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
