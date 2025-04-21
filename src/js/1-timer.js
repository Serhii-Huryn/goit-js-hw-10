import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const inputCalendar = document.querySelector('#datetime-picker');

startBtn.disabled = true;

let date;
let deltaTime;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      date = selectedDates[0];
      startBtn.disabled = false;
      startBtn.classList.add('start-active');
    } else {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: '#B51B1B',
        iconUrl: './img/error.svg',
        timeout: '3000',
      });
      startBtn.disabled = true;
      startBtn.classList.remove('start-active');
    }

    if (date) {
      deltaTime = date.getTime() - Date.now();
    }
  },
});

startBtn.addEventListener('click', handleCountdown);

function handleCountdown() {
  inputCalendar.style.cursor = 'default';
  startBtn.classList.remove('start-active');

  const days = document.querySelector('.value[data-days]');
  const hours = document.querySelector('.value[data-hours]');
  const minutes = document.querySelector('.value[data-minutes]');
  const seconds = document.querySelector('.value[data-seconds]');

  const countdownInterval = setInterval(() => {
    if (deltaTime > 997) {
      startBtn.disabled = true;
      inputCalendar.disabled = true;

      deltaTime = date.getTime() - Date.now();
      const currentValue = convertMs(deltaTime);

      days.innerHTML = `${String(currentValue.days).padStart(2, '0')}`;
      hours.innerHTML = `${String(currentValue.hours).padStart(2, '0')}`;
      minutes.innerHTML = `${String(currentValue.minutes).padStart(2, '0')}`;
      seconds.innerHTML = `${String(currentValue.seconds).padStart(2, '0')}`;
    } else {
      inputCalendar.disabled = false;
      inputCalendar.style.cursor = 'pointer';

      clearInterval(countdownInterval);
      return;
    }
  }, 1000);
}

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
