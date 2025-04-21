// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const delayField = document.querySelector('#delay');
const fulfilledField = document.querySelector('#fulfilled');
const rejectedField = document.querySelector('#rejected');
const submit = document.querySelector('#submit');
const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();
  let delay = delayField.value;
  let shouldResolve = fulfilledField.checked;

  makePromise({ value: delay, delay: delay, shouldResolve: shouldResolve })
    .then(value =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${value}ms`,
        backgroundColor: 'green',
      })
    )
    .catch(error =>
      iziToast.show({
        message: `❌ Rejected promise in ${error}ms`,
        backgroundColor: 'red',
      })
    );
});

const makePromise = ({ value, delay, shouldResolve }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
};
