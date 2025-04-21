// const flatpickr = require('flatpickr');
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const selector = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

let userSelectedDate;

startBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      // window.alert('Please choose a date in the future');
      iziToast.show({
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = 'true';
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr(selector, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  const timeLeft = userSelectedDate - new Date();
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  if (timeLeft < 0) {
    iziToast.show({
      message: 'Please choose a date in the future',
    });
    return;
  }

  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);

  startBtn.disabled = 'true';
  selector.disabled = 'true';

  const timerId = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      startBtn.removeAttribute('disabled');
      selector.removeAttribute('disabled');
      clearInterval(timerId);
    }

    daysField.textContent = addLeadingZero(days);
    hoursField.textContent = addLeadingZero(hours);
    minutesField.textContent = addLeadingZero(minutes);
    secondsField.textContent = addLeadingZero(seconds);
  }, 1000);
}
