// импорт
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
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
  // Функция(и) для запуска при каждом закрытии календаря.
  onClose(selectedDates) {
    const userTimeNow = Date.now();
    userTime = selectedDates[0];
    if (userTime <= userTimeNow) {
      Notify.failure(`You haven't made a choice. Do this!`);
      return;
    }
    Notify.success(`Thanks for choosing!`);
    elements.btn.disabled = false;
  },
};

flatpickr(elements.input, options);
elements.btn.addEventListener('click', startTimer);
