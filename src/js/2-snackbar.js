import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const fullfilledRadio = document.querySelector('[value="fulfilled"]');

// const rejectedRadio = document.querySelector('[value="rejected"]');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = delayInput.value;
  const promise = new Promise((resolve, reject) => {
    if (fullfilledRadio.checked) {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  promise.then(onFullfilled);

  function onFullfilled(delay) {
    iziToast.success({
      position: 'topRight',
      title: '✅',
      message: `Fulfilled promise in ${delay}ms`,
    });
  }

  promise.catch(onRejected);

  function onRejected(delay) {
    iziToast.error({
      position: 'topRight',
      title: '❌',
      message: `Rejected promise in ${delay}ms`,
    });
  }
});
