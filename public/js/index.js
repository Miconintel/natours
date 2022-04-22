import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

const loginForm = document.querySelector('.form--login');
const logoutButton = document.querySelector('.nav__el--logout');
const updateForm = document.querySelector('.form-user-data');
const passWordForm = document.querySelector('.form-user-password');
const bookButton = document.querySelector('#book-tour');
console.log(bookButton);

// console.log(updateForm);

//
//
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
    // updateSettings({ email, password }, 'password');
  });

if (logoutButton) logoutButton.addEventListener('click', logout);
if (updateForm) {
  updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // create a form object programatically
    // this is a wt to create a form with object key value
    const form = new FormData();
    form.append('name', document.querySelector('#name').value);
    form.append('email', document.querySelector('#email').value);
    form.append('photo', document.querySelector('#photo').files[0]);
    // const name = document.querySelector('#name').value;
    // const email = document.querySelector('#email').value;
    // updateSettings({ name, email }, 'data');
    // this is commented out because its  a manual way of collecting the form values there is a better way of sending form as object to API by creating form object

    updateSettings(form, 'data');
  });
}
if (passWordForm)
  passWordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent =
      'upating...';
    const currentPassword = document.querySelector(
      '#password-current'
    ).value;
    const newPassword = document.querySelector('#password').value;
    const confirmNewPassword = document.querySelector(
      '#password-confirm'
    ).value;

    await updateSettings(
      { currentPassword, newPassword, confirmNewPassword },
      'password'
    );
    document.querySelector('.btn--save-password').textContent =
      'save password';
    document.querySelector('#password-current').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#password-confirm').value = '';
  });
if (bookButton)
  bookButton.addEventListener('click', (e) => {
    const { tourId } = e.target.dataset;
    console.log(tourId);
    bookTour(tourId);
  });
