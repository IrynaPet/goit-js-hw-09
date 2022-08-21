import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name = delay]');
const stepInput = form.querySelector('input[name = step]');
const amountInput = form.querySelector('input[name = amount]');

form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  const myPromis = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
  return myPromis;
}

function onSubmitForm(event) {
  event.preventDefault();

  let delayValue = +delayInput.value;
  let stepValue = +stepInput.value;
  let amountValue = +amountInput.value + 1;

  for (let i = 1; i < amountValue; i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += stepValue;
  }
}
