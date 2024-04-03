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

function falseTime(selected, current) {
  if (selected < current) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Please choose a date in the future',
    });
  } else {
    btnStart.removeAttribute('disabled');
  }
}

let userSelectedDate = 0;
const fp = flatpickr(myInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStart.addEventListener('click', e => {
  e.target.setAttribute('disabled', 'disabled');
  myInput.setAttribute('disabled', 'disabled');
  updateTimer();
});

function addLeadingZero(value) {
  value = String(value).padStart(2, '0');
  return value;
}

function updateTimer() {
  setInterval(() => {
    let diff = userSelectedDate - Date.now();
    if (diff >= 0) {
      let datesArr = convertMs(diff);
      for (const field in fields) {
        for (const key in datesArr) {
          if (field === key) {
            const value = addLeadingZero(datesArr[key]);
            fields[field].innerHTML = `${value}`;
            break;
          }
        }
      }
    } else {
      btnStart.removeAttribute('disabled');
      myInput.removeAttribute('disabled');
    }
  }, 1000);
}
