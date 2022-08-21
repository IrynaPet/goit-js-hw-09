// 1. Імпорт бібліотеки вспливаючого вікна
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// 2. Відкриття доступу до елементів
const form = document.querySelector(".form");
const delayInput = form.querySelector("input[name = delay]");
const stepInput = form.querySelector("input[name = step]");
const amountInput = form.querySelector("input[name = amount]");

// 3. Прослуховування подій на кнопці
form.addEventListener("submit", onSubmitForm);

// 4. Створення помісу функції
function createPromise(position, delay) {
  const myPromis = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if(shouldResolve) {
        resolve({position,delay});
      } 
        reject({position,delay});
    },delay);
  })
  return myPromis;
};
// 5. Запобігання пеезавантаженню вікна
function onSubmitForm(event) {
  event.preventDefault();

// 6. Оголошення змінних
  let delayValue = + delayInput.value;
  let stepValue = + stepInput.value;
  let amountValue = + amountInput.value + 1;

  for (let i = 1 ; i < amountValue; i++){
    createPromise(i,delayValue)
    .then(({position,delay}) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    })
    .catch(({position,delay}) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    })
   delayValue += stepValue
  }
};