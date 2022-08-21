// импорт
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

// Доступ к элементам
const elements = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  divTimer: document.querySelector('.timer'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};

// переменные
let timerId = null;
let userTime = null;
elements.btn.disabled = true;

// Старт таймера
function startTimer(onBtn) {
  if (onBtn.disabled) {
    return;
  }
  timerId = setInterval(() => {
    const saveTime = Date.now();
    const totalSaveTime = userTime - saveTime;
    const resoltTime = newTimer(totalSaveTime);
    updateTime(resoltTime);
    if (totalSaveTime <= 0) {
      clearInterval(timerId);
      updateTime({
        days: '00',
        hours: '00',
        minute: '00',
        seconds: '00',
      });
    }
  }, 1000);
}
// определение дедлайна
function newTimer(totalTime) {
  const seconds = pad(Math.floor((totalTime / 1000) % 60));
  const minute = pad(Math.floor(totalTime / 1000 / 60) % 60);
  const hours = pad(Math.floor(totalTime / 1000 / 60 / 60) % 24);
  const days = pad(Math.floor(totalTime / 1000 / 60 / 60 / 24));
  return { seconds, minute, hours, days };
}
function pad(value) {
  return String(value).padStart(2, '0');
}
// передача данных
function updateTime({ days, hours, minute, seconds }) {
  elements.spanSeconds.textContent = seconds;
  elements.spanMinutes.textContent = minute;
  elements.spanHours.textContent = hours;
  elements.spanDays.textContent = days;
  elements.btn.disabled = true;
}

// Всплывающее окно
const options = {
  // Включает выбор времени
  enableTime: true,
  // Отображает средство выбора времени в 24-часовом режиме без
  // выбора AM/ PM, если включено.
  time_24hr: true,
  // Устанавливает начальную выбранную дату (даты).
  // Если вы используете режим: «множественный» или календарь диапазона,
  // поставьте объекты «Массив дат» или «Массив строк дат», которые следуют
  // за вашим форматом даты.
  // В противном случае вы можете указать один объект Date или строку даты.
  defaultDate: new Date(),
  // Регулирует шаг ввода минут (включая прокрутку)
  minuteIncrement: 1,
  // Функция для запуска при каждом закрытии календаря.
  onClose(selectedDates) {
    const userTimeNow = Date.now();
    userTime = selectedDates[0];
    if (userTime <= userTimeNow) {
      Notify.failure(`You have not made a choice. Do it!`);
      return;
    }
    Notify.success(`Thanks for your choosing!`);
    elements.btn.disabled = false;
  },
};

flatpickr(elements.input, options);
elements.btn.addEventListener('click', startTimer);

function onStart() {
  (btnStart.disabled = true),
    (btnStop.disabled = false),
    (timerId = setInterval(() => {
      body.style.background = getRandomHexColor();
    }, 1000));
}
