// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// import iconError from './img/error.svg';
// import iconOk from './img/ok.svg';

const form = document.querySelector('.form');
const radioFulfilled = document.querySelector('.input-fulfilled');
const radioRejected = document.querySelector('.input-rejected');

form.addEventListener('submit', handleSubmit);

let delay;

function handleSubmit(event) {
  event.preventDefault();
  delay = Number(event.target.elements.delay.value);

  const promise = new Promise((resolve, reject) => {
    if (radioFulfilled.checked) {
      setTimeout(() => {
        resolve();
      }, delay);
    }
    if (radioRejected.checked) {
      setTimeout(() => {
        reject();
      }, delay);
    }
  });

  const success = {
    title: 'OK',
    message: `Fulfilled promise in ${delay}ms`,
    messageColor: '#ffffff',
    backgroundColor: '#59a10d',
    position: 'bottomCenter',
    iconUrl: './img/ok.svg',
  };
  const error = {
    title: 'Error',
    message: `Rejected promise in ${delay}ms`,
    messageColor: '#ffffff',
    backgroundColor: '#ef4040',
    position: 'bottomCenter',
    iconUrl: './img/error.svg',
    // iconError
  };

  promise
    .then(() => {
      iziToast.show(success);
    })
    .catch(() => {
      iziToast.show(error);
    });

  form.reset();
}
