function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;

btnStop.disabled = true;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

function onStart() {
  (btnStart.disabled = true),
    (btnStop.disabled = false),
    (timerId = setInterval(() => {
      body.style.background = getRandomHexColor();
    }, 1000));
}

function onStop() {
  if (timerId) {
    clearInterval(timerId);
    btnStart.disabled = false;
    btnStop.disabled = true;
  }
  return;
}
