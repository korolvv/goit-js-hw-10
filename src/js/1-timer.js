// Описаний в документації
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import 'flatpickr/dist/flatpickr.min.css';

const myInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const fields = { days, hours, minutes, seconds };
const currentDate = Date.now();

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    falseTime(userSelectedDate, currentDate);
  },
};

let userSelectedDate = 0;
const fp = flatpickr(myInput, options);

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

function falseTime(selected, current) {
  if (selected < current) {
    btnStart.setAttribute('disabled', 'disabled');
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
  } else {
    btnStart.removeAttribute('disabled');
  }
}

btnStart.addEventListener('click', e => {
  e.target.setAttribute('disabled', 'disabled');
  myInput.setAttribute('disabled', 'disabled');
  const diff = userSelectedDate - currentDate;
  const datesArr = convertMs(diff);
  for (const field in fields) {
    for (const key in datesArr) {
      console.log(field, key);
      if (field === key) {
        const value = addLeadingZero(datesArr[key]);
        fields[field].innerHTML = `${value}`;
        continue;
      }
    }
  }
});

function addLeadingZero(value) {
  value = String(value).padStart(2, '0');
  return value;
}
